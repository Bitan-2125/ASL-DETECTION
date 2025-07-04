# 🖐️ ASL Hand Gesture Detection

A real-time American Sign Language (ASL) hand gesture detection website built with Python, Flask, and a Keras/TensorFlow deep learning model. The application uses a webcam or file upload to recognize and translate hand signs into text.

![{534EBD96-D374-4B66-BFF4-C518B55A5050}](https://github.com/user-attachments/assets/53fe185e-051c-409b-a30a-b44b72af33c4)
![{84466532-3552-485C-A29E-B093F1DE0462}](https://github.com/user-attachments/assets/95e5da61-0c0e-48a4-b94b-9441d13b9bfd)



---

## ✨ Features

- **Real-Time Detection**: Recognizes ASL gestures instantly via webcam.
- **Image Upload**: Predicts the sign from an uploaded image.
- **Modern UI**: Clean, responsive, and user-friendly interface.
- **Sentence Building**: Concatenates recognized letters to form words and sentences.
- **Dockerized**: Easy to deploy with a provided `Dockerfile`.

---

## 🛠️ Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Deep Learning**: TensorFlow, Keras
- **Image Processing**: OpenCV, Pillow
- **Containerization**: Docker

---

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- pip
- Git

### Installation & Running Locally

1. **Clone the repository:**
   ```sh
   git clone https://github.com/bitan-2125/ASL-DETECTION.git
   cd your-repo-name
   ```

2. **Create a virtual environment and activate it:**
   ```sh
   # For Windows
   python -m venv venv
   venv\Scripts\activate

   # For macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```

4. **Download the Model**
   Place your `sign_language_detection_model.h5` file in the root of the project directory.

5. **Run the Flask app:**
   ```sh
   python app.py
   ```

6. Open your browser and navigate to `http://127.0.0.1:5000`.

---

## 🐳 Running with Docker

1. **Build the Docker image:**
   ```sh
   docker build -t asl-detect-app .
   ```

2. **Run the Docker container:**
   ```sh
   docker run -p 5000:5000 asl-detect-app
   ```

3. Open your browser and navigate to `http://localhost:5000`.

---

## 🧠 Model Information

The deep learning model is a Convolutional Neural Network (CNN) trained on the ASL Alphabet dataset. The training process and architecture details can be found in the `asl_detection.ipynb` notebook. 
