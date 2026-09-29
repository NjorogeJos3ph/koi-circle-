/* =========================================================
   KOI CIRCLE
   Restaurant Experience
========================================================= */


/* =========================================================
   MENU DATA
========================================================= */

const products = [
  {
    id: 1,
    name: "Koi Signature Bowl",
    category: "Bowls",
    price: 650,
    description:
      "A satisfying bowl built around Koi's signature flavors."
  },

  {
    id: 2,
    name: "Spiced Chicken Bowl",
    category: "Bowls",
    price: 700,
    description:
      "Tender chicken, fresh ingredients and bold seasoning."
  },

  {
    id: 3,
    name: "Crispy Chicken",
    category: "Mains",
    price: 750,
    description:
      "Golden crispy chicken with a flavorful Koi finish."
  },

  {
    id: 4,
    name: "Koi Loaded Fries",
    category: "Sides",
    price: 450,
    description:
      "Crispy fries with rich toppings and house flavors."
  },

  {
    id: 5,
    name: "Fresh Koi Salad",
    category: "Fresh",
    price: 550,
    description:
      "Fresh ingredients with a light and balanced finish."
  },

  {
    id: 6,
    name: "Signature Wrap",
    category: "Wraps",
    price: 600,
    description:
      "A warm wrap packed with satisfying flavor."
  },

  {
    id: 7,
    name: "Koi Burger",
    category: "Mains",
    price: 800,
    description:
      "A generous burger with a signature Koi taste."
  },

  {
    id: 8,
    name: "Golden Wings",
    category: "Mains",
    price: 680,
    description:
      "Juicy wings coated in a bold house glaze."
  },

  {
    id: 9,
    name: "Fresh Juice",
    category: "Drinks",
    price: 300,
    description:
      "A refreshing fruit drink for a hot Juja afternoon."
  }
];


/* =========================================================
   STATE
========================================================= */

let cart = [];

let activeCategory = "All";


/* =========================================================
   LOAD SAVED CART
========================================================= */

try {

  const savedCart =
    localStorage.getItem("koiCart");

  cart = savedCart
    ? JSON.parse(savedCart)
    : [];

  if (!Array.isArray(cart)) {
    cart = [];
  }

} catch (error) {

  console.warn(
    "Could not load saved cart.",
    error
  );

  cart = [];
}


/* =========================================================
   DOM REFERENCES
========================================================= */

const foodGrid =
  document.querySelector("#foodGrid");

const categoryList =
  document.querySelector("#categoryList");

const cartButton =
  document.querySelector("#cartButton");

const cartOverlay =
  document.querySelector("#cartOverlay");

const cartPanel =
  document.querySelector("#cartPanel");

const closeCartButton =
  document.querySelector("#closeCartButton");

const cartItems =
  document.querySelector("#cartItems");

const cartCount =
  document.querySelector("#cartCount");

const cartTotal =
  document.querySelector("#cartTotal");

const finalOrderButton =
  document.querySelector("#finalOrderButton");

const whatsappOrderButton =
  document.querySelector("#whatsappOrderButton");

const directionsButton =
  document.querySelector("#directionsButton");


/* =========================================================
   PRICE FORMAT
========================================================= */

function formatPrice(price) {

  return `KSh ${price.toLocaleString()}`;

}


/* =========================================================
   SAVE CART
========================================================= */

function saveCart() {

  localStorage.setItem(
    "koiCart",
    JSON.stringify(cart)
  );

}


/* =========================================================
   CATEGORY RENDERING
========================================================= */

function renderCategories() {

  if (!categoryList) return;

  const categories = [
    "All",
    ...new Set(
      products.map(
        product => product.category
      )
    )
  ];

  categoryList.innerHTML =
    categories
      .map(category => {

        const active =
          category === activeCategory
            ? "active"
            : "";

        return `
          <button
            type="button"
            class="category-button ${active}"
            data-category="${category}"
          >
            ${category}
          </button>
        `;

      })
      .join("");


  document
    .querySelectorAll(
      ".category-button"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          activeCategory =
            button.dataset.category;

          renderCategories();

          renderProducts();

        }
      );

    });

}


/* =========================================================
   FILTER PRODUCTS
========================================================= */

function getVisibleProducts() {

  if (
    activeCategory === "All"
  ) {

    return products;

  }

  return products.filter(
    product =>
      product.category ===
      activeCategory
  );

}


/* =========================================================
   PRODUCT RENDERING
========================================================= */

function renderProducts() {

  if (!foodGrid) return;

  const visibleProducts =
    getVisibleProducts();


  foodGrid.innerHTML =
    visibleProducts
      .map(product => {

        return `
          <article class="food-card">

            <div class="food-image">

              <div class="image-placeholder">

                <span>
                  ${product.name}
                </span>

                <small>
                  Food photography
                </small>

              </div>

            </div>


            <div class="food-content">

              <span class="food-category">
                ${product.category}
              </span>

              <h3>
                ${product.name}
              </h3>

              <p class="food-description">
                ${product.description}
              </p>


              <div class="food-bottom">

                <span class="food-price">
                  ${formatPrice(product.price)}
                </span>

                <button
                  type="button"
                  class="add-button"
                  data-product-id="${product.id}"
                >
                  Add
                </button>

              </div>

            </div>

          </article>
        `;

      })
      .join("");


  document
    .querySelectorAll(
      ".add-button"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const productId =
            Number(
              button.dataset.productId
            );

          addToCart(productId);

        }
      );

    });

}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(productId) {

  const product =
    products.find(
      item => item.id === productId
    );

  if (!product) return;


  const existingItem =
    cart.find(
      item => item.id === productId
    );


  if (existingItem) {

    existingItem.quantity += 1;

  } else {

    cart.push({

      id: product.id,

      name: product.name,

      price: product.price,

      quantity: 1

    });

  }


  saveCart();

  renderCart();

  updateCartCount();

  openCart();

}


/* =========================================================
   CHANGE QUANTITY
========================================================= */

function changeQuantity(
  productId,
  change
) {

  const item =
    cart.find(
      product =>
        product.id === productId
    );

  if (!item) return;


  item.quantity += change;


  if (item.quantity <= 0) {

    cart =
      cart.filter(
        product =>
          product.id !== productId
      );

  }


  saveCart();

  renderCart();

  updateCartCount();

}


/* =========================================================
   REMOVE ITEM
========================================================= */

function removeFromCart(productId) {

  cart =
    cart.filter(
      product =>
        product.id !== productId
    );


  saveCart();

  renderCart();

  updateCartCount();

}


/* =========================================================
   CART COUNT
========================================================= */

function updateCartCount() {

  if (!cartCount) return;


  const count =
    cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );


  cartCount.textContent =
    count;

}


/* =========================================================
   CART TOTAL
========================================================= */

function calculateTotal() {

  return cart.reduce(
    (total, item) =>
      total +
      item.price *
      item.quantity,
    0
  );

}


/* =========================================================
   CART RENDERING
========================================================= */

function renderCart() {

  if (
    !cartItems ||
    !cartTotal
  ) {
    return;
  }


  if (cart.length === 0) {

    cartItems.innerHTML = `

      <div class="empty-cart">

        <p>
          Your order is empty.
        </p>

        <small>
          Explore the menu and choose something
          from Koi.
        </small>

      </div>

    `;


    cartTotal.textContent =
      "KSh 0";

    return;

  }


  cartItems.innerHTML =
    cart
      .map(item => {

        return `

          <div class="cart-item">

            <div>

              <div class="cart-item-name">
                ${item.name}
              </div>

              <div class="cart-item-price">
                ${formatPrice(item.price)}
              </div>

              <button
                type="button"
                class="remove-cart-item"
                data-remove-id="${item.id}"
              >
                Remove
              </button>

            </div>


            <div class="quantity-controls">

              <button
                type="button"
                data-minus-id="${item.id}"
                aria-label="Decrease quantity"
              >
                −
              </button>

              <strong>
                ${item.quantity}
              </strong>

              <button
                type="button"
                data-plus-id="${item.id}"
                aria-label="Increase quantity"
              >
                +
              </button>

            </div>

          </div>

        `;

      })
      .join("");


  cartTotal.textContent =
    formatPrice(
      calculateTotal()
    );


  document
    .querySelectorAll(
      "[data-minus-id]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          changeQuantity(
            Number(
              button.dataset.minusId
            ),
            -1
          );

        }
      );

    });


  document
    .querySelectorAll(
      "[data-plus-id]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          changeQuantity(
            Number(
              button.dataset.plusId
            ),
            1
          );

        }
      );

    });


  document
    .querySelectorAll(
      "[data-remove-id]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          removeFromCart(
            Number(
              button.dataset.removeId
            )
          );

        }
      );

    });

}


/* =========================================================
   OPEN CART
========================================================= */

function openCart() {

  if (
    !cartOverlay ||
    !cartPanel
  ) {
    return;
  }


  cartOverlay.hidden = false;

  cartPanel.hidden = false;

  cartPanel.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "cart-open"
  );

}


/* =========================================================
   CLOSE CART
========================================================= */

function closeCart() {

  if (
    !cartOverlay ||
    !cartPanel
  ) {
    return;
  }


  cartOverlay.hidden = true;

  cartPanel.hidden = true;

  cartPanel.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "cart-open"
  );

}


/* =========================================================
   CART EVENTS
========================================================= */

if (cartButton) {

  cartButton.addEventListener(
    "click",
    openCart
  );

}


if (closeCartButton) {

  closeCartButton.addEventListener(
    "click",
    closeCart
  );

}


if (cartOverlay) {

  cartOverlay.addEventListener(
    "click",
    closeCart
  );

}


/* =========================================================
   ESCAPE TO CLOSE
========================================================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      closeCart();

    }

  }
);


/* =========================================================
   FINAL ORDER BUTTON
========================================================= */

if (finalOrderButton) {

  finalOrderButton.addEventListener(
    "click",
    () => {

      document
        .querySelector("#menu")
        ?.scrollIntoView({
          behavior: "smooth"
        });

    }
  );

}


/* =========================================================
   WHATSAPP ORDER
========================================================= */

if (whatsappOrderButton) {

  whatsappOrderButton.addEventListener(
    "click",
    () => {

      if (cart.length === 0) {

        alert(
          "Your order is empty. Please choose something from the menu first."
        );

        return;

      }


      const orderLines =
        cart.map(item => {

          return `${item.name} x${item.quantity}`;

        });


      const message =
        [
          "Hello Koi Circle,",
          "",
          "I would like to order:",
          "",
          ...orderLines,
          "",
          `Total: ${formatPrice(
            calculateTotal()
          )}`,
          "",
          "Please confirm availability and ordering details."
        ].join("\n");


      const phone =
        "+254702050665"

      const url =
        `https://wa.me/${phone}?text=${encodeURIComponent(
          message
        )}`;
      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );

    }
  );

}


/* =========================================================
   DIRECTIONS
========================================================= */

if (directionsButton) {

  directionsButton.addEventListener(
    "click",
    event => {

      event.preventDefault();


      const destination =
        encodeURIComponent(
          "Koi Circle, Kenyatta Road, Juja, Kenya"
        );


      const url =
        `https://www.google.com/maps/search/?api=1&query=${destination}`;


      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );

    }
  );

}


/* =========================================================
   NAVIGATION
========================================================= */

document
  .querySelectorAll(
    'a[href^="#"]'
  )
  .forEach(link => {

    link.addEventListener(
      "click",
      event => {

        const targetId =
          link.getAttribute("href");


        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(
            targetId
          );


        if (!target) return;


        event.preventDefault();


        target.scrollIntoView({
          behavior: "smooth"
        });

      }
    );

  });


/* =========================================================
   INITIALIZE
========================================================= */

function initializeKoi() {

  renderCategories();

  renderProducts();

  renderCart();

  updateCartCount();

  closeCart();

}


initializeKoi();


/* =========================================================
   READY
========================================================= */

console.log(
  "Koi Circle restaurant experience initialized."
);
