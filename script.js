 const responses = {

    "hello": "Hi! Nice to hear from you.",
    "hi": "Hello there, I'm QueryBot.",
    "hey": "Hey! What can I look up for you?",
    "good morning": "Good morning! Hope your day is off to a good start.",
    "good afternoon": "Good afternoon! What's on your mind?",
    "good evening": "Good evening! How can I help?",

    "how are you": "Running fine and ready to reply. Thanks for asking!",
    "how are you doing": "All good on my end, just waiting for a message.",
    "what are you doing": "Standing by for your next question.",
    "are you human": "No, I'm a rule-based chat program, not a person.",
    "can you help me": "Sure thing. Type 'help' to see what I can respond to.",

    "what is your name": "I go by QueryBot.",
    "who are you": "I'm QueryBot, a small dictionary-lookup chat demo.",
    "who made you": "I was put together as a sample rule-based chat project.",
    "what can you do": "I match your text against a fixed list of phrases and return a preset reply for each one.",

    "what is programming": "Programming means writing step-by-step instructions for a computer to follow.",
    "what is javascript": "JavaScript is a language used to add interactivity to web pages.",
    "what is html": "HTML is the markup language used to structure content on a web page.",
    "what is css": "CSS controls the look and layout of a web page.",
    "what is python": "Python is a widely used, easy-to-read programming language.",

    "space": "Space is the vast, mostly empty region beyond Earth's atmosphere.",
    "what is space": "Space refers to the near-infinite expanse that exists beyond our planet, containing stars, planets, and galaxies.",
    "moon": "The Moon is Earth's only natural satellite.",
    "sun": "The Sun is the star at the center of our solar system.",

    "what is this project": "This is a demo build of a simple rule-based chat program.",
    "what is this": "This is a small dictionary-lookup chat demo built with HTML, CSS, and JavaScript.",

    "joke": "Here's one: why did the developer go broke? Because they used up all their cache.",
    "help": "Try asking about programming, space, this project, or say hello.",

    "bye": "Goodbye, take care!",
    "exit": "Goodbye, take care!",
    "quit": "Goodbye, take care!"
};

  const exitCommands = ["bye", "exit", "quit"];
  const fallback = "I don't have a rule for that yet. Type 'help' to see the commands I know.";

  function sanitizeInput(rawInput) {
    return rawInput.toLowerCase().trim().replace(/\s+/g, " ");
  }

  function getResponse(userInput) {
    if (Object.prototype.hasOwnProperty.call(responses, userInput)) {
      return [responses[userInput], true];
    }
    return [fallback, false];
  }

  const landing = document.getElementById('landing');
  const chatscreen = document.getElementById('chatscreen');
  const startBtn = document.getElementById('start-btn');
  const log = document.getElementById('log');
  const form = document.getElementById('chat-form');
  const input = document.getElementById('input');
  const chips = document.querySelectorAll('.chip');
  const matchCountEl = document.getElementById('match-count');
  let matchCount = 0;

  startBtn.addEventListener('click', function () {
    landing.style.display = 'none';
    chatscreen.classList.add('active');
    input.focus();
  });

  function addBubble(who, text) {
    const row = document.createElement('div');
    row.className = 'row ' + (who === 'bot' ? 'bot' : 'user');
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;
    row.appendChild(bubble);
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
  }

  function showTyping() {
    const row = document.createElement('div');
    row.className = 'row bot';
    row.id = 'typing-row';
    row.innerHTML = '<div class="bubble typing"><i></i><i></i><i></i></div>';
    log.appendChild(row);
    log.scrollTop = log.scrollHeight;
  }

  function removeTyping() {
    const t = document.getElementById('typing-row');
    if (t) t.remove();
  }

  function sendMessage(raw) {
    if (!raw.trim()) return;
    const clean = sanitizeInput(raw);
    addBubble('user', raw);
    input.value = '';
    showTyping();

    setTimeout(function () {
      removeTyping();
      const [reply, matched] = getResponse(clean);
      addBubble('bot', reply);

      if (matched) {
        matchCount++;
        matchCountEl.textContent = matchCount;
      }

      if (exitCommands.includes(clean)) {
        input.disabled = true;
        input.placeholder = 'chat ended';
        document.getElementById('sendbtn').disabled = true;
      }
    }, 450);
  }

  addBubble('bot', "Hi, I'm QueryBot. Type 'help' to see what I can reply to, or tap a chip below.");

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    sendMessage(input.value);
  });

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      sendMessage(chip.dataset.msg);
    });
  });
