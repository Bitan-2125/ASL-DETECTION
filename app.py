from flask import Flask, render_template, request, jsonify
import numpy as np
import base64
from PIL import Image
import io
import os
import tensorflow as tf

app = Flask(__name__)

# Load the Keras model
model = tf.keras.models.load_model("sign_language_detection_model.h5")

# Map class indices to ASL letters (A-Z, 'del', 'nothing', 'space')
class_labels = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'del', 'nothing', 'space'
]

def preprocess_frame(img):
    img = img.resize((64, 64))
    img = img.convert('RGB')
    img_array = np.array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)  # (1, 64, 64, 3)
    return img_array

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files and 'image' not in request.json:
        return jsonify({'error': 'No image provided'}), 400

    # Support both form-data (file) and JSON (base64)
    if 'image' in request.files:
        file = request.files['image']
        img = Image.open(file.stream).convert('RGB')
    else:
        data = request.json['image']
        header, encoded = data.split(',', 1) if ',' in data else ('', data)
        img_bytes = base64.b64decode(encoded)
        img = Image.open(io.BytesIO(img_bytes)).convert('RGB')

    processed = preprocess_frame(img)
    prediction = model.predict(processed)
    predicted_class_index = np.argmax(prediction)
    predicted_class_label = class_labels[predicted_class_index]
    return jsonify({'prediction': predicted_class_label})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
