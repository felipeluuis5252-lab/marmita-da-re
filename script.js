/* =====================================================
   MARMITA DA RÊ
   SCRIPT.JS
===================================================== */


/* =====================================================
   CONFIGURAÇÃO DO WHATSAPP
===================================================== */

/*
   COLOQUE SEU NÚMERO AQUI.

   Exemplo:
   5511999999999

   Não coloque:
   +55
   espaços
   parênteses
   traços
*/

const WHATSAPP_NUMBER = "5511999999999";


/* =====================================================
   PRODUTOS
===================================================== */

const products = [

    {
        id: 1,
        name: "Marmita Tradicional",
        description: "Arroz, feijão, frango, salada e farofa.",
        price: 16.90,
        category: "tradicional",
        badge: "MAIS PEDIDA",
        image: "   "
    },

    {
        id: 2,
        name: "Marmita Fitness",
        description: "Frango grelhado, legumes, arroz integral e salada.",
        price: 18.90,
        category: "fitness",
        badge: "FIT",
        image: "                             "
    },

    {
        id: 3,
        name: "Marmita Grande",
        description: "Mais quantidade para quem não abre mão de sabor.",
        price: 22.90,
        category: "grande",
        badge: "MAIOR PORÇÃO",
        image: "   "
    },

    {
        id: 4,
        name: "Combo 3 Marmitas",
        description: "Escolha suas refeições e economize no combo.",
        price: 49.90,
        category: "combo",
        badge: "ECONOMIZE",
        image: "  "
    },

    {
        id: 5,
        name: "Frango Grelhado",
        description: "Frango grelhado com arroz, feijão e legumes.",
        price: 19.90,
        category: "tradicional",
        badge: "",
        image: "  "
    },

    {
        id: 6,
        name: "Carne Acebolada",
        description: "Carne acebolada acompanhada de arroz e feijão.",
        price: 21.90,
        category: "tradicional",
        badge: "",
        image: "  "
    },

    {
        id: 7,
        name: "Marmita Low Carb",
        description: "Proteína, legumes e salada em uma refeição equilibrada.",
        price: 20.90,
        category: "fitness",
        badge: "LOW CARB",
        image: "  "
    },

    {
        id: 8,
        name: "Combo 5 Marmitas",
        description: "Cinco refeições para deixar sua semana mais prática.",
        price: 79.90,
        category: "combo",
        badge: "ECONOMIZE",
        image: "  "
    }

];


/* =====================================================
   ELEMENTOS
===================================================== */

const productsContainer = document.getElementById("products");

const filters = document.querySelectorAll(".filter");


/* =====================================================
   FORMATAÇÃO DE PREÇO
===================================================== */

function formatPrice(price) {

    return price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


/* =====================================================
   GERAR PRODUTOS
===================================================== */

function renderProducts(category = "todos") {

    productsContainer.innerHTML = "";

    const filteredProducts = category === "todos"
        ? products
        : products.filter(product => product.category === category);


    filteredProducts.forEach(product => {

        const card = document.createElement("article");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                ${
                    product.badge
                        ? `<span class="badge">${product.badge}</span>`
                        : ""
                }

            </div>


            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.description}
                </p>

                <span class="price">
                    ${formatPrice(product.price)}
                </span>

                <button
                    class="product-btn"
                    onclick="pedirProduto('${product.name}')"
                >

                    <i class="fa-brands fa-whatsapp"></i>

                    Pedir pelo WhatsApp

                </button>

            </div>

        `;


        productsContainer.appendChild(card);

    });

}


/* =====================================================
   FILTROS
===================================================== */

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(item => {
            item.classList.remove("active");
        });

        filter.classList.add("active");

        const category = filter.dataset.category;

        renderProducts(category);

    });

});


/* =====================================================
   WHATSAPP - PEDIDO GERAL
===================================================== */

function pedirWhatsApp() {

    const message =
        "Olá! Vim pelo site da Marmita da Rê e gostaria de conhecer o cardápio e fazer um pedido.";

    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

}


/* =====================================================
   WHATSAPP - PRODUTO
===================================================== */

function pedirProduto(productName) {

    const message =
        `Olá! Vim pelo site da Marmita da Rê e gostaria de pedir a seguinte marmita: ${productName}. Pode me informar a disponibilidade e como faço o pedido?`;

    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

}


/* =====================================================
   MENU MOBILE
===================================================== */

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const mobileMenu =
    document.getElementById("mobileMenu");


mobileMenuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("show");

});


/* =====================================================
   FECHAR MENU AO CLICAR
===================================================== */

const mobileLinks =
    mobileMenu.querySelectorAll("a");


mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("show");

    });

});


/* =====================================================
   INICIALIZAR
===================================================== */

renderProducts();


/* =====================================================
   ANIMAÇÃO SUAVE AO ENTRAR
===================================================== */

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.08
    }
);


document
    .querySelectorAll(
        ".product-card, .differential, .step, .testimonial"
    )
    .forEach(element => {

        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity .6s ease, transform .6s ease";

        observer.observe(element);

    });
