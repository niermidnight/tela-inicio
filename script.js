const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler")

let userMessage;

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  if (className === "incoming") {
    chatLi.innerHTML = `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
  } else {
    chatLi.innerHTML = `<p>${message}</p>`;
  }
  return chatLi;
}

const generateThinkingMessage = () => {
  const thinkingLi = createChatLi("Pensando...", "incoming");
  chatbox.appendChild(thinkingLi);
  chatbox.scrollTo(0, chatbox.scrollHeight);
  return thinkingLi;
}

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;

  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);
  

  const thinkingLi = generateThinkingMessage();

  setTimeout(() => {
    const botResponse = getBotResponse(userMessage);
    thinkingLi.innerHTML = `<span class="material-symbols-outlined">smart_toy</span><p>${botResponse}</p>`;
  }, 1200);

  chatInput.value = "";
}

const getBotResponse = (userMessage) => {
  switch (userMessage) {
    case "0":
      return " Escolha uma das opções: <br><br>1 - Catalogar Sistemas "
    case "1":
      return "Você escolheu Catalogar Sistemas.<br><br>5 - Como Catalogar um novo Sistema.<br><br>";
    case "2":
      return "Você escolheu Consultar Sistemas.<br><br><br><br>";
    case "3":
      return "Você escolheu Exportar para o Excel.<br><br><br>";
    default:
      return "Desculpe, não entendi. Por favor, escolha uma das opções citadas." ;
      chatbox.scrollTo(0, chatbox.scrollHeight);
    
  }

}



chatbotToggler.addEventListener("click", () =>document.body.classList.toggle("show-chatbot"));
sendChatBtn.addEventListener("click", handleChat);
chatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleChat();
  }
});
