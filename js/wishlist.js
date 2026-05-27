function getWishlistItems() {
  return readStorage(APP.storage.wishlist, []);
}

function saveWishlistItems(items) {
  writeStorage(APP.storage.wishlist, items);
  updateBadgeCounts();
}

function isWishlisted(productId) {
  return getWishlistItems().some((item) => item.id === productId);
}

function toggleWishlist(productId) {
  const product = getProductById(productId);
  if (!product) return;

  const wishlist = getWishlistItems();
  const exists = wishlist.some((item) => item.id === productId);
  const next = exists ? wishlist.filter((item) => item.id !== productId) : [...wishlist, product];
  saveWishlistItems(next);
  refreshProductCards();
  renderWishlistDrawer();
  renderWishlistPage();
  showToast(exists ? `${product.name} removed from wishlist` : `${product.name} saved to wishlist`, exists ? 'info' : 'success');
}

function renderWishlistDrawer() {
  const body = document.getElementById('wishlistDrawerBody');
  if (!body) return;

  const wishlist = getWishlistItems();
  if (!wishlist.length) {
    body.innerHTML = '<div class="wishlist-empty"><p>Your wishlist is empty.</p></div>';
    return;
  }

  body.innerHTML = wishlist.map((item) => `
    <article class="drawer-item">
      <img src="${item.image}" alt="${escapeHtml(item.name)}" loading="lazy">
      <div>
        <strong>${escapeHtml(item.name)}</strong>
        <p>${escapeHtml(item.category)}</p>
        <small>${formatPrice(item.price)}</small>
      </div>
      <button class="icon-button" type="button" onclick="toggleWishlist(${item.id})" aria-label="Remove ${escapeHtml(item.name)}">
        <i class="ri-close-line"></i>
      </button>
    </article>
  `).join('');
}

function renderWishlistPage() {
  const grid = document.getElementById('wishlistPageGrid');
  if (!grid) return;

  const wishlist = getWishlistItems();
  if (!wishlist.length) {
    grid.innerHTML = `
      <div class="wishlist-empty">
        <h2>No saved pieces yet</h2>
        <p>Tap the heart icon on any product to build your personal Lunera edit.</p>
        <a class="button button-primary" href="shop.html">Browse collection</a>
      </div>
    `;
    return;
  }

  grid.innerHTML = wishlist.map(renderProductCard).join('');
  refreshAOS(grid);
}
