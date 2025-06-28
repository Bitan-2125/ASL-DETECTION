const video = document.getElementById('video');
const videoBox = document.getElementById('video-box');
const loadingMsg = document.getElementById('loading-msg');
const predLetter = document.getElementById('pred-letter');
const predSentence = document.getElementById('pred-sentence');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const clearBtn = document.getElementById('clearBtn');
const imgUpload = document.getElementById('imgUpload');
const uploadedImg = document.getElementById('uploaded-img');
const uploadPrediction = document.getElementById('upload-prediction');

let running = false;
let sentence = '';
let lastPrediction = '';
let stream = null;
let intervalId = null;

async function startWebcam() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    video.style.display = 'block';
    loadingMsg.style.display = 'none';
  } catch (e) {
    loadingMsg.innerHTML = '<span style="color:#ff4d4f">Camera access denied</span>';
  }
}

function stopWebcam() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    video.srcObject = null;
    video.style.display = 'none';
    loadingMsg.style.display = 'flex';
  }
}

function captureAndSend() {
  if (!running) return;
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL('image/jpeg');

  fetch('/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image: dataUrl })
  })
  .then(res => res.json())
  .then(data => {
    if (data.prediction) {
      predLetter.textContent = data.prediction;
      if (sentence.length === 0 || sentence[sentence.length-1] !== data.prediction) {
        sentence += data.prediction;
        predSentence.textContent = sentence;
      }
      lastPrediction = data.prediction;
    }
  })
  .catch(() => {
    predLetter.textContent = '-';
  });
}

startBtn.onclick = async () => {
  if (!running) {
    await startWebcam();
    running = true;
    intervalId = setInterval(captureAndSend, 500); // 2 FPS
  }
};

stopBtn.onclick = () => {
  running = false;
  clearInterval(intervalId);
  stopWebcam();
};

clearBtn.onclick = () => {
  sentence = '';
  predSentence.textContent = '';
};

// Image upload logic
imgUpload.onchange = function(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    uploadedImg.src = e.target.result;
    uploadedImg.style.display = 'block';
    uploadPrediction.textContent = 'Predicting...';
    // Send as form-data
    const formData = new FormData();
    formData.append('image', file);
    fetch('/predict', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if (data.prediction) {
        uploadPrediction.textContent = 'Prediction: ' + data.prediction;
      } else {
        uploadPrediction.textContent = 'No prediction.';
      }
    })
    .catch(() => {
      uploadPrediction.textContent = 'Prediction error.';
    });
  };
  reader.readAsDataURL(file);
}; 