const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");

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
};

const generateThinkingMessage = () => {
  const thinkingLi = createChatLi("Pensando...", "incoming");
  chatbox.appendChild(thinkingLi);
  chatbox.scrollTo(0, chatbox.scrollHeight);
  return thinkingLi;
};

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
};

const getBotResponse = (userMessage) => {
  const userMessageNormalized = normalizeString(userMessage).toLowerCase();

  if (userMessageNormalized.includes("catalogar")) {
    return "Para catalogar um novo sistema, você deve clicar em <b>Cadastro de Sistemas</b> no menu lateral. Após isso, preencha todos os campos no formulário e clique no botão ao final para registrá-lo.";
  } else if (userMessageNormalized.includes("editar")) {
    return "Para editar um sistema já catalogado, clique em <b>Consulta</b> no menu lateral. Você terá acesso aos sistemas e um botão de edição estará à direita deles. Clique nesse botão para editar as informações.";
  } else if (userMessageNormalized.includes("consultar,")) {
    return "Para consultar os sistemas catalogados, clique em <b>Consulta</b> no menu lateral. Lá você terá acesso a todos os sistemas e uma barra de pesquisa para usar como desejar.";
  } else if (userMessageNormalized.includes("exportar") || userMessageNormalized.includes("excel")) {
    return "Para exportar os sistemas para o Excel, clique em <b>Consulta</b> no menu lateral. Lá você terá acesso a todos os sistemas. No canto superior direito, você encontrará um botão para exportar todos os dados. Clique nele para iniciar o download de sua planilha Excel.";
  } else {
    switch (userMessageNormalized) {
      case "0":
        return "1 - Como Catalogar Um Novo Sistema; <br><br>2 - Como Editar os Sistemas Catalogados; <br><br>  3 - Como Consultar os Sistemas; <br><br> 4 - Como Exportar os Sistemas para o Excel.<br>";
        case "1":
        return "Para registrar um novo sistema no catálogo, você deverá clicar em <b>Cadastro de Sistemas</b> no menu lateral. Após isso, será aberto um formulário, você deverá preencher todos os campos e clicar no botão ao final, e pronto, estará registrado.<br>";
    case "2":
        return "Para editar um sistema já catalogado, você deverá clicar em <b>Consulta</b> no menu lateral. Lá você terá acesso aos sistemas, e à direita deles terá um botão de edição. Ao clicar nesse botão, você voltará para a parte de formulário, onde você poderá editar as informações do jeito que preferir.<br>";
    case "3":
        return "Para consultar os sistemas catálogados, você deverá clicar em <b>Consulta</b> no menu lateral. Lá você terá acesso a todos os sistemas catálogados, e ainda contará com uma barra de pesquisa para usar da maneira que desejar.<br>";
    case "4":
      return "Para exportar os sistemas para o Excel, você deverá clicar em <b>Consulta</b> no menu lateral. Lá você terá acesso a todos os sistemas. No canto superior direito terá um botão para exportar todos os dados. Basta clicar lá que será iniciado o download de sua planilha Excel.";
      case "obrigado":
        return "De nada! Estou aqui para ajudar. Se tiver mais alguma dúvida ou precisar de assistência adicional, não hesite em perguntar. Estou à disposição!";
      default:
        return "Desculpe, não entendi. Por favor, escolha uma das opções citadas:<br><br>1 - Como Catalogar Um Novo Sistema;<br><br>2 - Como Editar os Sistemas Catalogados;<br><br>3 - Como Consultar os Sistemas;<br><br>4 - Como Exportar os Sistemas para o Excel.<br>";
    }
  }
};

function normalizeString(str) {
  return str.normalize("NFD")  .replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g, "") 
  .replace(/\s{2,}/g, " ") 
  .trim(); 
}

sendChatBtn.addEventListener("click", handleChat);
chatbotToggler.addEventListener("click", () =>
  document.body.classList.toggle("show-chatbot")
);
chatInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleChat();
  }
});
