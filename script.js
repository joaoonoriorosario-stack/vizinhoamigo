const state = {
  role: null,
  activeTab: "ajuda",
  items: [],
  orderSent: false,
  messages: [
    { text: "Olá! Este chat é apenas uma simulação educativa para combinar uma lista da comunidade.", type: "received" },
    { text: "Combine somente informações fictícias. Em uma versão real, a ajuda dependeria de confiança e validação comunitária.", type: "received" }
  ]
};

const pedidosSimulados = [
  {
    nome: "Dona Maria",
    comunidade: "Comunidade Jardim Esperança",
    distancia: "450 m",
    itens: ["arroz", "leite", "remédio de pressão", "sabonete"],
    contribuicao: 10
  },
  {
    nome: "Seu Antonio",
    comunidade: "Vila das Flores",
    distancia: "1,2 km",
    itens: ["parafusos", "cimento", "lâmpada", "fita isolante"],
    contribuicao: 0
  },
  {
    nome: "Família Souza",
    comunidade: "Linha São Pedro",
    distancia: "2 km",
    itens: ["fraldas", "água", "pomada", "alimentos básicos"],
    contribuicao: 15
  }
];

const elements = {
  telaInicial: document.querySelector("#tela-inicial"),
  aplicativo: document.querySelector("#aplicativo"),
  homeTriggers: document.querySelectorAll("[data-go-home]"),
  tabOpeners: document.querySelectorAll("[data-open-tab]"),
  roleButtons: document.querySelectorAll("[data-role]"),
  btnSair: document.querySelector("#btn-sair"),
  modoAtual: document.querySelector("#modo-atual"),
  perfilTipo: document.querySelector("#perfil-tipo"),
  navButtons: document.querySelectorAll(".nav-button"),
  panels: document.querySelectorAll(".tab-panel"),
  formItem: document.querySelector("#form-item"),
  itemInput: document.querySelector("#item-input"),
  listaCompras: document.querySelector("#lista-compras"),
  listaVazia: document.querySelector("#lista-vazia"),
  btnEnviarPedido: document.querySelector("#btn-enviar-pedido"),
  pedidoFormulario: document.querySelector("#pedido-formulario"),
  pedidoConfirmado: document.querySelector("#pedido-confirmado"),
  btnNovoPedido: document.querySelector("#btn-novo-pedido"),
  contribuicaoToggle: document.querySelector("#contribuicao-toggle"),
  campoContribuicao: document.querySelector("#campo-contribuicao"),
  contribuicaoValor: document.querySelector("#contribuicao-valor"),
  pedidosVoluntario: document.querySelector("#pedidos-voluntario"),
  chatLista: document.querySelector("#chat-lista"),
  formMensagem: document.querySelector("#form-mensagem"),
  mensagemInput: document.querySelector("#mensagem-input")
};

function saveItems() {
  localStorage.setItem("vizinhoAmigoLista", JSON.stringify(state.items));
}

function loadItems() {
  const savedItems = localStorage.getItem("vizinhoAmigoLista");
  if (!savedItems) {
    return;
  }

  try {
    const parsedItems = JSON.parse(savedItems);
    if (Array.isArray(parsedItems)) {
      state.items = parsedItems.filter((item) => typeof item === "string");
    }
  } catch {
    state.items = [];
  }
}

function chooseRole(role) {
  state.role = role;
  state.activeTab = role === "voluntario" ? "voluntario" : "ajuda";

  elements.telaInicial.classList.remove("active");
  elements.aplicativo.classList.add("active");
  elements.modoAtual.textContent = role === "voluntario" ? "Modo vizinho voluntário" : "Modo lista";
  elements.perfilTipo.textContent = role === "voluntario" ? "Vizinho voluntário" : "Moradora que cria listas";

  updateNavigation();
}

function goHome() {
  elements.aplicativo.classList.remove("active");
  elements.telaInicial.classList.add("active");
  document.querySelector("#inicio").scrollIntoView({ block: "start" });
}

function setActiveTab(tabName) {
  state.activeTab = tabName;
  updateNavigation();
}

function openAppTab(tabName) {
  chooseRole(state.role || "ajuda");
  setActiveTab(tabName);
  elements.aplicativo.scrollIntoView({ block: "start" });
}

function updateNavigation() {
  elements.panels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === `aba-${state.activeTab}`);
  });

  elements.navButtons.forEach((button) => {
    const isActive = button.dataset.tab === state.activeTab;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-current", isActive ? "page" : "false");
  });
}

function renderItems() {
  elements.listaCompras.innerHTML = "";

  state.items.forEach((item, index) => {
    const listItem = document.createElement("li");
    const itemText = document.createElement("span");
    const removeButton = document.createElement("button");

    itemText.textContent = item;
    removeButton.type = "button";
    removeButton.className = "remove-item";
    removeButton.textContent = "X";
    removeButton.setAttribute("aria-label", `Remover ${item}`);
    removeButton.addEventListener("click", () => removeItem(index));

    listItem.append(itemText, removeButton);
    elements.listaCompras.appendChild(listItem);
  });

  const hasItems = state.items.length > 0;
  elements.listaVazia.classList.toggle("hidden", hasItems);
  elements.btnEnviarPedido.disabled = !hasItems;
}

function addItem(event) {
  event.preventDefault();
  const item = elements.itemInput.value.trim();

  if (!item) {
    return;
  }

  state.items.push(item);
  elements.itemInput.value = "";
  saveItems();
  renderItems();
}

function removeItem(index) {
  state.items.splice(index, 1);
  saveItems();
  renderItems();
}

function toggleContributionField() {
  elements.campoContribuicao.classList.toggle("hidden", !elements.contribuicaoToggle.checked);
}

function sendOrder() {
  if (state.items.length === 0) {
    return;
  }

  state.orderSent = true;
  elements.pedidoFormulario.classList.add("hidden");
  elements.pedidoConfirmado.classList.remove("hidden");
}

function resetOrder() {
  state.orderSent = false;
  state.items = [];
  saveItems();
  renderItems();
  elements.pedidoFormulario.classList.remove("hidden");
  elements.pedidoConfirmado.classList.add("hidden");
  elements.contribuicaoToggle.checked = false;
  toggleContributionField();
}

function renderVolunteerRequests() {
  elements.pedidosVoluntario.innerHTML = "";

  pedidosSimulados.forEach((pedido) => {
    const card = document.createElement("article");
    const title = document.createElement("h4");
    const community = document.createElement("p");
    const meta = document.createElement("div");
    const items = document.createElement("p");
    const button = document.createElement("button");

    card.className = "request-card";
    title.textContent = pedido.nome;
    community.textContent = pedido.comunidade;
    meta.className = "request-meta";
    meta.innerHTML = `
      <span>${pedido.distancia}</span>
      <span>${pedido.itens.length} itens</span>
      <span>${pedido.contribuicao > 0 ? `R$ ${pedido.contribuicao} simbólico` : "Sem contribuição"}</span>
    `;
    items.textContent = `Lista: ${pedido.itens.join(", ")}.`;
    button.type = "button";
    button.textContent = "Ajudar com esta lista";
    button.addEventListener("click", () => acceptRequest(pedido.nome));

    card.append(title, community, meta, items, button);
    elements.pedidosVoluntario.appendChild(card);
  });
}

function acceptRequest(name) {
  state.messages.push({
    text: `Você se ofereceu para ajudar com a lista de ${name}. Agora pode combinar os detalhes simulados pelo chat.`,
    type: "sent"
  });
  renderMessages();
  setActiveTab("mensagens");
}

function renderMessages() {
  elements.chatLista.innerHTML = "";

  state.messages.forEach((message) => {
    const bubble = document.createElement("p");
    bubble.className = `message ${message.type}`;
    bubble.textContent = message.text;
    elements.chatLista.appendChild(bubble);
  });

  elements.chatLista.scrollTop = elements.chatLista.scrollHeight;
}

function sendMessage(event) {
  event.preventDefault();
  const text = elements.mensagemInput.value.trim();

  if (!text) {
    return;
  }

  state.messages.push({ text, type: "sent" });
  elements.mensagemInput.value = "";
  renderMessages();
}

function bindEvents() {
  elements.homeTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      goHome();
    });
  });

  elements.tabOpeners.forEach((opener) => {
    opener.addEventListener("click", () => openAppTab(opener.dataset.openTab));
  });

  elements.roleButtons.forEach((button) => {
    button.addEventListener("click", () => chooseRole(button.dataset.role));
  });

  elements.btnSair.addEventListener("click", goHome);
  elements.formItem.addEventListener("submit", addItem);
  elements.btnEnviarPedido.addEventListener("click", sendOrder);
  elements.btnNovoPedido.addEventListener("click", resetOrder);
  elements.contribuicaoToggle.addEventListener("change", toggleContributionField);
  elements.formMensagem.addEventListener("submit", sendMessage);

  elements.navButtons.forEach((button) => {
    button.addEventListener("click", () => setActiveTab(button.dataset.tab));
  });
}

loadItems();
bindEvents();
renderItems();
renderVolunteerRequests();
renderMessages();
toggleContributionField();
