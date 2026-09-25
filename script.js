// ===============================
// CONFIGURAÇÕES DA MARMITARIA
// ===============================
// Edite os valores abaixo para personalizar o site.

const config = {
  businessName: "Marmitaria da Rê",

  // Troque pelo número de WhatsApp real, com código do país (55) + DDD, sem espaços ou símbolos.
  // Exemplo: "5511987654321"
  whatsappNumber: "YOUR_WHATSAPP_NUMBER",

  // Horário de atendimento (exibido na seção "Horário de Atendimento")
  hours: [
    { day: "Segunda a sexta", time: "10:30 às 14:00" },
    { day: "Sábado", time: "10:30 às 14:00" },
    { day: "Domingo", time: "Fechado" }
  ]
};

// ===============================
// CARDÁPIO — edite os itens abaixo
// ===============================
// Adicione, remova ou altere marmitas livremente.
// "price" deve ser um número (sem "R$").

const menu = [
  {
    name: "Marmita Tradicional",
    description: "Arroz, feijão, frango grelhado, macarrão e salada.",
    price: 18.00
  },
  {
    name: "Marmita Especial",
    description: "Arroz, feijão, bife acebolado, purê de batata e salada.",
    price: 22.00
  },
  {
    name: "Marmita Fit",
    description: "Arroz integral, frango grelhado, legumes e salada.",
    price: 20.00
  }
];

// ===============================
// A partir daqui: lógica do site
// (não é necessário editar)
// ===============================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Formata preço em R$ ---------- */
  const formatPrice = (value) =>
    value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  /* ---------- Monta link de WhatsApp com mensagem ---------- */
  const buildWhatsappUrl = (message) => {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${config.whatsappNumber}?text=${encoded}`;
  };

  /* ---------- Data do cardápio (automática) ---------- */
  const menuDateEl = document.getElementById('menuDate');
  if (menuDateEl) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    menuDateEl.textContent = `Cardápio atualizado em ${dd}/${mm}/${yyyy}`;
  }

  /* ---------- Gera os cards do cardápio ---------- */
  const menuGrid = document.getElementById('menuGrid');

  menu.forEach((meal, index) => {
    const card = document.createElement('div');
    card.className = 'meal-card';

    card.innerHTML = `
      <h3>${meal.name}</h3>
      <p class="meal-desc">${meal.description}</p>
      <span class="meal-price">R$ ${formatPrice(meal.price)}</span>

      <div class="qty-selector">
        <button type="button" class="qty-btn qty-minus" aria-label="Diminuir quantidade">&minus;</button>
        <span class="qty-value" data-qty-value>1</span>
        <button type="button" class="qty-btn qty-plus" aria-label="Aumentar quantidade">+</button>
      </div>

      <a href="#" class="btn btn-whatsapp btn-block order-btn">💬 Pedir pelo WhatsApp</a>
    `;

    menuGrid.appendChild(card);

    let quantity = 1;
    const qtyValueEl = card.querySelector('[data-qty-value]');
    const minusBtn = card.querySelector('.qty-minus');
    const plusBtn = card.querySelector('.qty-plus');
    const orderBtn = card.querySelector('.order-btn');

    const updateOrderLink = () => {
      qtyValueEl.textContent = quantity;

      const message = quantity === 1
        ? `Olá, Rê! Gostaria de pedir 1 ${meal.name} no valor de R$ ${formatPrice(meal.price)}.`
        : `Olá, Rê! Gostaria de pedir ${quantity}x ${meal.name} (R$ ${formatPrice(meal.price)} cada).`;

      orderBtn.setAttribute('href', buildWhatsappUrl(message));
    };

    minusBtn.addEventListener('click', () => {
      if (quantity > 1) {
        quantity -= 1;
        updateOrderLink();
      }
    });

    plusBtn.addEventListener('click', () => {
      quantity += 1;
      updateOrderLink();
    });

    updateOrderLink();
  });

  /* ---------- Horário de atendimento ---------- */
  const hoursList = document.getElementById('hoursList');
  if (hoursList) {
    config.hours.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="day">${item.day}</span><span>${item.time}</span>`;
      hoursList.appendChild(li);
    });
  }

  /* ---------- Botões gerais de WhatsApp (hero, entrega, footer, flutuante) ---------- */
  const genericMessage = `Olá, ${config.businessName.replace('Marmitaria ', '')}! Gostaria de saber mais sobre o cardápio de hoje.`;
  const genericUrl = buildWhatsappUrl(genericMessage);

  ['heroWhatsappBtn', 'deliveryWhatsappBtn', 'footerWhatsappBtn', 'floatingWhatsappBtn'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.setAttribute('href', genericUrl);
  });

  /* ---------- Ano no rodapé ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
