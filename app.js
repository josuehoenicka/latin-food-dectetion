// Acceder a la cámara y al micrófono
async function start() {
  const videoElement = document.getElementById("video");

  // Accede a la cámara y el micrófono
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  videoElement.srcObject = stream;

  // Configurar el reconocimiento de voz
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.lang = "es-ES"; // Configuración inicial
  recognition.interimResults = true;
  recognition.continuous = true;

  recognition.onresult = function (event) {
    let transcript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }

    detectFood(transcript);
  };

  recognition.onend = function () {
    recognition.start(); // Reiniciar el reconocimiento automáticamente
  };

  recognition.start();
}

// Función para detectar comidas típicas latinas
function detectFood(text) {
  const foods = {
    arepa: ["Venezuela", "Colombia"],
    mate: ["Argentina", "Uruguay"],
    tacos: ["México"],
    ceviche: ["Perú"],
    pupusa: ["El Salvador"],
    feijoada: ["Brasil"],
    empanada: ["Argentina", "Chile"],
    tamal: ["México", "Colombia"],
    asado: ["Argentina", "Uruguay", "Chile"],
    mofongo: ["Puerto Rico"],
  };

  const lowerText = text.toLowerCase();
  let detectedCountry = "";

  for (const [food, countries] of Object.entries(foods)) {
    if (lowerText.includes(food)) {
      detectedCountry = `${
        food.charAt(0).toUpperCase() + food.slice(1)
      } (${countries.join(", ")})`;
      break;
    }
  }

  // Mostrar el resultado
  const resultElement = document.getElementById("result");
  if (detectedCountry) {
    resultElement.innerText = `${detectedCountry}`;
  }
}

// Iniciar el reconocimiento de voz y la cámara
start();
