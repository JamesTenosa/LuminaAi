let lastScrollTop = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop === 0) {
    nav.style.top = '0';
  } else if (scrollTop > lastScrollTop) {
    // Downscroll
    nav.style.top = '-80px'; // Adjust this value based on nav height
  } else {
    // Upscroll
    nav.style.top = '0';
  }
  lastScrollTop = scrollTop;
});

function toggleChat() {
  const chatbox = document.getElementById('chatbox');
  if (chatbox.style.right === '20px') {
      chatbox.style.right = '-450px';
  } else {
      chatbox.style.right = '20px';
  }
}

function sendMessage() {
  const chatInput = document.getElementById('chat-input');
  const message = chatInput.value.trim();
  if (message) {
      appendMessage('user', message);
      chatInput.value = '';
      getBotReply();
  }
}

function appendMessage(sender, message) {
  const chatboxBody = document.getElementById('chatbox-body');
  const chatMessage = document.createElement('div');
  chatMessage.classList.add('chat-message', sender);
  chatMessage.textContent = message;
  chatboxBody.appendChild(chatMessage);
  chatboxBody.scrollTop = chatboxBody.scrollHeight; // Scroll to the bottom
}

function getBotReply() {
  setTimeout(() => {
      appendMessage('bot', 'Thank you for your message! We will try to reply to you as soon as possible.');
  }, 1000); // Simulate a delay for the bot response
}

// Event listener for the Enter key
document.getElementById('chat-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
      sendMessage();
  }
});


function showSideBar(){
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'flex'
}
function hideSideBar(){
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'none';
}

document.addEventListener("DOMContentLoaded", function() {
  var input = document.getElementById("messageInput");
  
  input.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
          sendMessage();
      }
  });
});
//