// QUIZ SECTION
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris"],
    answer: "Paris"
  },
  {
    question: "Which language is used for web apps?",
    options: ["Python", "JavaScript", "C++"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"],
    answer: "Cascading Style Sheets"
  }
];

let score = 0;
let currentQuestion = 0;

function showQuestion() {
  const container = document.getElementById("quiz-container");
  container.innerHTML = "";

  if (currentQuestion < questions.length) {
    const q = questions[currentQuestion];
    const questionEl = document.createElement("h3");
    questionEl.textContent = q.question;
    container.appendChild(questionEl);

    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => checkAnswer(option);
      container.appendChild(btn);
    });
  } else {
    document.getElementById("score").textContent = `You scored ${score}/${questions.length}`;
  }
}

function checkAnswer(selected) {
  if (selected === questions[currentQuestion].answer) {
    score++;
  }
  currentQuestion++;
  showQuestion();
}

showQuestion();

// WEATHER SECTION
async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const apiKey = "de5c41318501a19ab57a53b9dcefc8d7";  
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await res.json();
    
    if (data.cod === "404") {
      document.getElementById("weather-info").innerHTML = `<p>City not found!</p>`;
      return;
    }

    const weather = `
      <p><strong>City:</strong> ${data.name}</p>
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    `;
    document.getElementById("weather-info").innerHTML = weather;
  } catch (err) {
    document.getElementById("weather-info").innerHTML = `<p>Error fetching weather data.</p>`;
  }
}
