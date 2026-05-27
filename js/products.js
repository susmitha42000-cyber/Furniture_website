let shopState = {
  page: 1,
};

function renderCategoryCards() {
  const container = document.getElementById('homeCategories');
  if (!container) return;

  container.innerHTML = CATEGORY_DATA.map((category) => `
    <a class="category-card scroll-reveal" href="${APP.root}/pages/shop.html?category=${encodeURIComponent(category.name)}">
      <img src="${category.image}" alt="${escapeHtml(category.name)}" loading="lazy">
      <div class="category-caption">
        <h3>${escapeHtml(category.name)}</h3>
        <span>${escapeHtml(category.description)}</span>
      </div>
    </a>
  `).join('');
  refreshAOS(container);
}

function renderProductCard(product) {
  const wished = isWishlisted(product.id);
  return `
    <article class="product-card scroll-reveal">
      <div class="product-figure-wrap" style="position:relative;">
        <a class="product-figure" href="${APP.root}/pages/product-details.html?id=${product.id}">
          <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="lazy">
          <span class="product-badge">${escapeHtml(product.badge)}</span>
        </a>
        <button class="icon-button wishlist-toggle ${wished ? 'is-active' : ''}" type="button" onclick="toggleWishlist(${product.id})" aria-label="Toggle wishlist">
          <i class="${wished ? 'ri-heart-3-fill' : 'ri-heart-3-line'}"></i>
        </button>
      </div>
      <div class="product-meta">
        <span>${escapeHtml(product.category)}</span>
        <span class="product-rating">${renderStars(product.rating)} ${product.rating.toFixed(1)}</span>
      </div>
      <h3 class="product-name">${escapeHtml(product.name)}</h3>
      <p class="product-description">${escapeHtml(product.shortDescription)}</p>
      <div class="product-footer">
        <div class="product-price">
          <strong>${formatPrice(product.price)}</strong>
          <span>${escapeHtml(product.material)}</span>
        </div>
        <div class="product-actions">
          <button class="button button-primary product-action-button product-action-primary" type="button" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
      </div>
    </article>
  `;
}

function renderFeaturedProducts() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  // Show two additional feature cards after the Lina Floor Lamp
  const items = PRODUCTS.slice(0, 8);
  grid.innerHTML = items.map(renderProductCard).join('');
  refreshAOS(grid);
}

function getShopFilteredProducts() {
  const searchValue = document.getElementById('shopSearch')?.value.trim().toLowerCase() || '';
  const materialValue = document.getElementById('materialFilter')?.value || '';
  const priceValue = Number(document.getElementById('priceFilter')?.value || 3200);
  const sortValue = document.getElementById('shopSort')?.value || 'featured';
  const activeChip = document.querySelector('#shopCategories .chip-button.is-active');
  const activeCategory = activeChip?.dataset.category || getQueryParam('category') || '';

  let results = PRODUCTS.filter((product) => {
    const matchesSearch =
      !searchValue ||
      product.name.toLowerCase().includes(searchValue) ||
      product.category.toLowerCase().includes(searchValue) ||
      product.material.toLowerCase().includes(searchValue);
    const matchesMaterial = !materialValue || product.material === materialValue;
    const matchesPrice = product.price <= priceValue;
    const matchesCategory = !activeCategory || product.category === activeCategory;
    return matchesSearch && matchesMaterial && matchesPrice && matchesCategory;
  });

  if (sortValue === 'price-asc') results.sort((a, b) => a.price - b.price);
  if (sortValue === 'price-desc') results.sort((a, b) => b.price - a.price);
  if (sortValue === 'rating') results.sort((a, b) => b.rating - a.rating);
  if (sortValue === 'featured') results.sort((a, b) => b.rating - a.rating || a.price - b.price);

  return results;
}

function renderShopPagination(totalItems) {
  const container = document.getElementById('shopPagination');
  if (!container) return;

  const totalPages = Math.max(1, Math.ceil(totalItems / APP.shop.perPage));
  if (shopState.page > totalPages) shopState.page = totalPages;

  container.innerHTML = Array.from({ length: totalPages }, (_, index) => `
    <button class="page-button ${shopState.page === index + 1 ? 'is-active' : ''}" type="button" onclick="goToShopPage(${index + 1})">
      ${index + 1}
    </button>
  `).join('');
}

function goToShopPage(page) {
  shopState.page = page;
  renderShopProducts();
  window.scrollTo({ top: 260, behavior: 'smooth' });
}

function renderShopProducts() {
  const grid = document.getElementById('shopGrid');
  const meta = document.getElementById('shopResultsMeta');
  if (!grid || !meta) return;

  const results = getShopFilteredProducts();
  const start = (shopState.page - 1) * APP.shop.perPage;
  const pageItems = results.slice(start, start + APP.shop.perPage);
  meta.textContent = `${results.length} products found`;

  if (!results.length) {
    grid.innerHTML = '<div class="page-card" style="padding:30px; text-align:center;"><h3>No matching products</h3><p>Try adjusting your search, category, or material filters.</p></div>';
    renderShopPagination(0);
    refreshAOS(grid);
    return;
  }

  grid.innerHTML = pageItems.map(renderProductCard).join('');
  renderShopPagination(results.length);
  refreshAOS(grid);
}

function initShopPage() {
  const categoryWrap = document.getElementById('shopCategories');
  const materialSelect = document.getElementById('materialFilter');
  const priceFilter = document.getElementById('priceFilter');
  const priceValue = document.getElementById('priceValue');
  const queryCategory = getQueryParam('category');
  renderShopProducts();

  if (categoryWrap) {
    categoryWrap.innerHTML = `
      <button class="chip-button ${queryCategory ? '' : 'is-active'}" type="button" data-category="">All</button>
      ${getCategories().map((category) => `
        <button class="chip-button ${queryCategory === category ? 'is-active' : ''}" type="button" data-category="${escapeHtml(category)}">
          ${escapeHtml(category)}
        </button>
      `).join('')}
    `;

    categoryWrap.addEventListener('click', (event) => {
      const chip = event.target.closest('.chip-button');
      if (!chip) return;
      shopState.page = 1;
      categoryWrap.querySelectorAll('.chip-button').forEach((item) => item.classList.remove('is-active'));
      chip.classList.add('is-active');
      renderShopProducts();
    });
  }

  if (materialSelect) {
    materialSelect.innerHTML = `<option value="">All materials</option>${getMaterials()
      .map((material) => `<option value="${escapeHtml(material)}">${escapeHtml(material)}</option>`)
      .join('')}`;
  }

  if (priceFilter && priceValue) {
    const updatePrice = () => {
      priceValue.textContent = formatPrice(Number(priceFilter.value));
    };

    updatePrice();

    priceFilter.addEventListener('input', () => {
      shopState.page = 1;
      updatePrice();
      renderShopProducts();
    });
  }

  ['shopSearch', 'shopSort', 'materialFilter'].forEach((id) => {
    const element = document.getElementById(id);
    if (!element) return;
    element.addEventListener('input', () => {
      shopState.page = 1;
      renderShopProducts();
    });
    element.addEventListener('change', () => {
      shopState.page = 1;
      renderShopProducts();
    });
  });

  document.getElementById('resetFilters')?.addEventListener('click', () => {
    shopState.page = 1;
    const shopSearch = document.getElementById('shopSearch');
    const shopSort = document.getElementById('shopSort');
    if (shopSearch) shopSearch.value = '';
    if (shopSort) shopSort.value = 'featured';
    if (materialSelect) materialSelect.value = '';
    if (priceFilter) priceFilter.value = 3200;
    if (priceFilter && priceValue) {
      priceValue.textContent = formatPrice(Number(priceFilter.value));
    }
    categoryWrap?.querySelectorAll('.chip-button').forEach((item) => item.classList.remove('is-active'));
    categoryWrap?.querySelector('[data-category=""]')?.classList.add('is-active');
    renderShopProducts();
  });
}

function initProductDetailsPage() {
  const target = document.getElementById('productDetailsView');
  const related = document.getElementById('relatedProducts');
  if (!target || !related) return;

  const product = getProductById(getQueryParam('id') || 1) || PRODUCTS[0];

  target.innerHTML = `
    <div class="detail-layout">
      <figure class="detail-gallery scroll-reveal">
        <img src="${product.image}" alt="${escapeHtml(product.name)}" loading="eager">
      </figure>
      <div class="detail-panel scroll-reveal">
        <span class="eyebrow">${escapeHtml(product.category)}</span>
        <h1>${escapeHtml(product.name)}</h1>
        <div class="price-line">
          <strong>${formatPrice(product.price)}</strong>
          <span class="price-tag">${renderStars(product.rating)} ${product.rating.toFixed(1)}</span>
        </div>
        <p>${escapeHtml(product.description)}</p>
        <div class="detail-meta-grid">
          <div class="detail-meta-item"><strong>${escapeHtml(product.material)}</strong><span>Material</span></div>
          <div class="detail-meta-item"><strong>${escapeHtml(product.badge)}</strong><span>Collection note</span></div>
        </div>
        <div>
          <h3>Color options</h3>
          <div class="swatch-row" style="margin-top:12px;">
            ${product.colors.map((color) => `<span class="swatch" style="background:${color}"></span>`).join('')}
          </div>
        </div>
        <div style="margin-top:22px;">
          <h3>Quantity</h3>
          <div class="qty-control" style="margin-top:12px;">
            <button type="button" onclick="changeDetailQty(-1)"><i class="ri-subtract-line"></i></button>
            <span id="detailQty" class="qty-value">1</span>
            <button type="button" onclick="changeDetailQty(1)"><i class="ri-add-line"></i></button>
          </div>
        </div>
        <div class="detail-actions" style="margin-top:26px; flex-wrap:wrap;">
          <button class="button button-primary" type="button" onclick="addDetailToCart(${product.id})">Add to Cart</button>
          <button class="button button-secondary" type="button" onclick="toggleWishlist(${product.id})">Save to Wishlist</button>
        </div>
      </div>
    </div>
  `;

  related.innerHTML = PRODUCTS.filter((item) => item.id !== product.id).slice(0, 3).map(renderProductCard).join('');
  refreshAOS(target.parentElement || target);
}

function changeDetailQty(step) {
  const qty = document.getElementById('detailQty');
  if (!qty) return;
  const next = Math.max(1, Number(qty.textContent) + step);
  qty.textContent = String(next);
}

function addDetailToCart(productId) {
  const quantity = Number(document.getElementById('detailQty')?.textContent || 1);
  addToCart(productId, quantity);
}

function renderBlogCards(posts, targetId = 'blogGrid') {
  const grid = document.getElementById(targetId);
  if (!grid) return;
  grid.innerHTML = posts.map((post) => `
    <article class="blog-card scroll-reveal">
      <img src="${post.image}" alt="${escapeHtml(post.title)}" loading="lazy">
      <div class="blog-card-meta">${escapeHtml(post.date)} · ${escapeHtml(post.category)}</div>
      <h3>${escapeHtml(post.title)}</h3>
      <p>${escapeHtml(post.excerpt)}</p>
      <div class="blog-card-footer">
        <a class="text-link" href="${APP.root}/pages/404.html">Read more</a>
      </div>
    </article>
  `).join('');
  refreshAOS(grid);
}

function renderBlogPreview() {
  renderBlogCards(BLOG_POSTS.slice(0, 3), 'blogPreviewGrid');
}

function initBlogPage() {
  const search = document.getElementById('blogSearch');
  const categoriesWrap = document.getElementById('blogCategories');
  if (!search || !categoriesWrap) return;

  const categories = ['All', ...new Set(BLOG_POSTS.map((post) => post.category))];
  categoriesWrap.innerHTML = categories.map((category, index) => `
    <button class="chip-button ${index === 0 ? 'is-active' : ''}" type="button" data-blog-category="${escapeHtml(category)}">${escapeHtml(category)}</button>
  `).join('');

  const render = () => {
    const active = document.querySelector('#blogCategories .chip-button.is-active')?.dataset.blogCategory || 'All';
    const query = search.value.trim().toLowerCase();
    const filtered = BLOG_POSTS.filter((post) => {
      const matchesCategory = active === 'All' || post.category === active;
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
    renderBlogCards(filtered);
  };

  categoriesWrap.addEventListener('click', (event) => {
    const button = event.target.closest('.chip-button');
    if (!button) return;
    categoriesWrap.querySelectorAll('.chip-button').forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    render();
  });

  search.addEventListener('input', render);
  render();
}
