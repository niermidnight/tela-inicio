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

    // Mova o scrollTo para o final do chatbox após adicionar a resposta do bot.
    chatbox.scrollTo(0, chatbox.scrollHeight);
  }, 1200);

  chatInput.value = "";
}

const getBotResponse = (userMessage) => {
  switch (userMessage) {
    case "0":
      return "1 - Catalogar Sistemas <br><br> 2 - Consultar Sistemas <br><br>  3 - Exportar para o Excel <br>"
    case "1":
      return "Você escolheu Catalogar Sistemas:<br><br>4 - Para saber como adicionar um novo sistema ao catálogo. <br><br>0 - Para retornar as opções iniciais.<br>";
    case "2":
      return "Você escolheu Consultar Sistemas.<br><br><br><br>";
    case "3":
      return "Você escolheu Exportar para o Excel.<br><br><br>";
      case "4":
        return "Sistema em atualização..."
        case "5":
        return "Sistema em atualização..."
        case "6":
        return "Sistema em atualização..."
        case "7":
        return "Sistema em atualização..."
        case "8":
        return "Sistema em atualização..."
        case "9":
        return "Sistema em atualização..."
        case "10":
        return "Sistema em atualização..."
        case "11":
          return "Sistema em atualizaçasdasdasdasdasfasfasfas<br>fasfasfs<br>afasfasfasfasfasfasfasfasf<br>asfasfasfasfasfasfasão..."
    default:
      return "Desculpe, não entendi. Por favor, escolha uma das opções citadas." ;
     
    
  }
  
}




sendChatBtn.addEventListener("click", handleChat);
chatbotToggler.addEventListener("click", () =>document.body.classList.toggle("show-chatbot"));
chatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleChat();
  }
});
