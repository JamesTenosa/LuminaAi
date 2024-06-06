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
  var chatSupport = document.getElementById("chatSupport");
  if (chatSupport.style.right === "0" || chatSupport.style.right === "-900px") {
      
      chatSupport.style.right = "0";
  } else {
      
      chatSupport.style.right = "-900px";
  }
}

function sendMessage() {
  let messageInput = document.getElementById("messageInput");
  let message = messageInput.value.trim();
  if (message !== "") {
      let chatBox = document.getElementById("chatBox");

      let messageDiv = document.createElement("div");
      messageDiv.classList.add("chat-message");
      messageDiv.innerText = message;

      chatBox.appendChild(messageDiv);

      chatBox.scrollTop = chatBox.scrollHeight;

      messageInput.value = "";
  }
}

function showSideBar(){
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'flex'
}
function hideSideBar(){
  const sidebar = document.querySelector('.sidebar')
  sidebar.style.display = 'none';
}