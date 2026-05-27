function getCartItems() {
  return readStorage(APP.storage.cart, []);
}

function saveCartItems(items) {
  writeStorage(APP.storage.cart, items);
  updateBadgeCounts();
}

function addToCart(productId, quantity = 1) {
  const product = getProductById(productId);
  if (!product) return;

  const cart = getCartItems();
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  saveCartItems(cart);
  renderCartDrawer();
  showToast(`${product.name} added to cart`, 'success');
}

function updateCartQuantity(productId, quantity) {
  const cart = getCartItems();
  const target = cart.find((item) => item.id === productId);
  if (!target) return;

  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  target.quantity = quantity;
  saveCartItems(cart);
  renderCartPage();
  renderCartDrawer();
}

function removeFromCart(productId) {
  const cart = getCartItems().filter((item) => item.id !== productId);
  saveCartItems(cart);
  renderCartPage();
  renderCartDrawer();
}

function getCartCount() {
  return getCartItems().reduce((total, item) => total + item.quantity, 0);
}

function getCartSubtotal() {
  return getCartItems().reduce((total, item) => total + item.price * item.quantity, 0);
}

function renderCartDrawer() {
  const body = document.getElementById('cartDrawerBody');
  const total = document.getElementById('cartDrawerTotal');
  if (!body || !total) return;

  const cart = getCartItems();
  if (!cart.length) {
    body.innerHTML = '<div class="cart-empty"><p>Your cart is empty.</p></div>';
    total.textContent = formatPrice(0);
    return;
  }

  body.innerHTML = cart
    .map((item) => `
      <article class="drawer-item">
        <img src="${item.image}" alt="${escapeHtml(item.name)}" loading="lazy">
        <div>
          <strong>${escapeHtml(item.name)}</strong>
          <p>${escapeHtml(item.material)} | Qty ${item.quantity}</p>
          <small>${formatPrice(item.price * item.quantity)}</small>
        </div>
        <button class="icon-button" type="button" aria-label="Remove ${escapeHtml(item.name)}" onclick="removeFromCart(${item.id})">
          <i class="ri-close-line"></i>
        </button>
      </article>
    `)
    .join('');

  total.textContent = formatPrice(getCartSubtotal());
}

function renderCartPage() {
  const itemsContainer = document.getElementById('cartPageItems');
  const summaryContainer = document.getElementById('cartSummaryPanel');
  if (!itemsContainer || !summaryContainer) return;

  const cart = getCartItems();
  if (!cart.length) {
    itemsContainer.innerHTML = `
      <div class="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Start adding timeless pieces from the shop.</p>
        <a class="button button-primary" href="shop.html">Continue shopping</a>
      </div>
    `;
    summaryContainer.innerHTML = '';
    return;
  }

  itemsContainer.innerHTML = cart
    .map((item) => `
      <article class="cart-item-card scroll-reveal is-visible">
        <div class="cart-item-media">
          <img src="${item.image}" alt="${escapeHtml(item.name)}" loading="lazy">
        </div>
        <div>
          <div class="cart-item-row">
            <div>
              <h2>${escapeHtml(item.name)}</h2>
              <p>${escapeHtml(item.material)} | ${escapeHtml(item.category)}</p>
            </div>
            <button class="icon-button" type="button" onclick="removeFromCart(${item.id})" aria-label="Remove ${escapeHtml(item.name)}">
              <i class="ri-delete-bin-line"></i>
            </button>
          </div>
          <div class="price-line">
            <strong>${formatPrice(item.price)}</strong>
            <span class="price-tag">${renderStars(item.rating)}</span>
          </div>
          <div class="cart-item-row">
            <div class="qty-control">
              <button type="button" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})" aria-label="Decrease quantity">
                <i class="ri-subtract-line"></i>
              </button>
              <span class="qty-value">${item.quantity}</span>
              <button type="button" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})" aria-label="Increase quantity">
                <i class="ri-add-line"></i>
              </button>
            </div>
            <strong>${formatPrice(item.price * item.quantity)}</strong>
          </div>
        </div>
      </article>
    `)
    .join('');

  const subtotal = getCartSubtotal();
  const shipping = subtotal > 0 ? 120 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  summaryContainer.innerHTML = `
    <div class="summary-card">
      <h2>Order summary</h2>
      <div class="summary-row"><span>Subtotal</span><strong>${formatPrice(subtotal)}</strong></div>
      <div class="summary-row"><span>Delivery</span><strong>${formatPrice(shipping)}</strong></div>
      <div class="summary-row"><span>Estimated tax</span><strong>${formatPrice(tax)}</strong></div>
      <div class="summary-row summary-total"><span>Total</span><strong>${formatPrice(total)}</strong></div>
      <button class="button button-primary" style="width:100%; margin-top:18px;" type="button" onclick="checkoutCart()">Proceed to checkout</button>
    </div>
  `;
  refreshAOS(itemsContainer.parentElement || itemsContainer);
}

function checkoutCart() {
  if (!getCartItems().length) return;
  window.location.href = `${APP.root}/pages/404.html`;
}
