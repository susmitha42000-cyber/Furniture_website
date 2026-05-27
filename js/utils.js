const APP = {
  siteName: 'Stackly',
  root: window.location.pathname.includes('/pages/') ? '..' : '.',
  logo: `${window.location.pathname.includes('/pages/') ? '..' : '.'}/assets/images/logo%20stackly.webp`,
  storage: {
    cart: 'lunera-cart',
    wishlist: 'lunera-wishlist',
    auth: 'lunera-auth',
  },
  shop: {
    perPage: 6,
  },
};

const IMAGE_ROOT = window.location.pathname.includes('/pages/') ? '../assets/images' : 'assets/images';

const CATEGORY_DATA = [
  {
    name: 'Living Room',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
    description: 'Sofas, coffee tables, and layered comfort pieces.',
  },
  {
    name: 'Bedroom',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
    description: 'Quiet silhouettes for restful, beautifully styled rooms.',
  },
  {
    name: 'Dining',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=900&q=80',
    description: 'Gathering spaces shaped by natural materials and warmth.',
  },
  {
    name: 'Office Furniture',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80&sat=-30',
    description: 'Focused work zones with softer lines and tactile finishes.',
  },
  {
    name: 'Decor',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=900&q=80',
    description: 'Objects and accents that complete the interior story.',
  },
  {
    name: 'Lighting',
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=900&q=80',
    description: 'Soft glows, sculptural lamps, and warm layered ambiance.',
  },
];

const PRODUCTS = [
  {
    id: 1,
    name: 'Soren Oak Sideboard',
    category: 'Living Room',
    material: 'Solid Oak',
    price: 1890,
    rating: 4.9,
    badge: 'Best seller',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1100&q=80',
    colors: ['#c9ab84', '#f0e3d3', '#8f643e'],
    shortDescription: 'A warm oak statement with balanced storage and timeless proportions.',
    description: 'The Soren Oak Sideboard brings sculptural calm into the room with natural grain, soft joinery, and elegant brass-touch hardware.',
  },
  {
    id: 2,
    name: 'Elio Lounge Chair',
    category: 'Living Room',
    material: 'Boucle',
    price: 1240,
    rating: 4.8,
    badge: 'Featured',
    image: 'https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&w=1100&q=80',
    colors: ['#efe4d6', '#9c6b3f', '#6e5a48'],
    shortDescription: 'Textured seating with soft curves and a refined wood frame.',
    description: 'Elio offers a serene presence with plush boucle upholstery, generous comfort, and warm wood details inspired by Scandinavian reading rooms.',
  },
  {
    id: 3,
    name: 'Mira Dining Table',
    category: 'Dining',
    material: 'Walnut',
    price: 2160,
    rating: 4.8,
    badge: 'New arrival',
    image: 'https://images.unsplash.com/photo-1472220625704-91e1462799b2?auto=format&fit=crop&w=1100&q=80',
    colors: ['#6d4c35', '#c8aa87', '#f5efe8'],
    shortDescription: 'A modern dining table grounded by warm timber and gentle edges.',
    description: 'Mira Dining Table is designed for everyday gatherings, with a sculpted silhouette and durable walnut finish that grows richer over time.',
  },
  {
    id: 4,
    name: 'Alden Bed Frame',
    category: 'Bedroom',
    material: 'Ash Wood',
    price: 2380,
    rating: 4.9,
    badge: 'Signature',
    image: `${IMAGE_ROOT}/about_hero_section_img.webp`,
    colors: ['#d9c7b4', '#8e6846', '#f8f3ed'],
    shortDescription: 'Low-profile simplicity with warm wood texture and quiet elegance.',
    description: 'Alden turns the bedroom into a softer retreat through calm geometry, tactile grain, and a beautifully understated Scandinavian profile.',
  },
  {
    id: 5,
    name: 'Kora Writing Desk',
    category: 'Office Furniture',
    material: 'Oak Veneer',
    price: 1420,
    rating: 4.7,
    badge: 'Workspace favorite',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1100&q=80',
    colors: ['#b98a5e', '#f0dfcb', '#70523d'],
    shortDescription: 'A slim Scandinavian desk for calm, light-filled work corners.',
    description: 'Kora pairs airy proportions with useful storage, giving home offices a premium look without visual heaviness.',
  },
  {
    id: 6,
    name: 'Lina Floor Lamp',
    category: 'Lighting',
    material: 'Linen Shade',
    price: 460,
    rating: 4.6,
    badge: 'Soft glow',
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1100&q=80',
    colors: ['#dcc7a2', '#f7f2eb', '#9b734d'],
    shortDescription: 'Warm ambient lighting with a woven shade and sculptural base.',
    description: 'Lina Floor Lamp creates soft evening atmosphere with textured linen, gentle diffusion, and a silhouette that complements wood-forward interiors.',
  },
  {
    id: 7,
    name: 'Neri Accent Mirror',
    category: 'Decor',
    material: 'Oak Frame',
    price: 390,
    rating: 4.5,
    badge: 'Decor pick',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1100&q=80',
    colors: ['#dac4aa', '#8c6542', '#f7f3ee'],
    shortDescription: 'A minimalist mirror that brightens walls with a softer edge.',
    description: 'Neri adds light, height, and balance to bedrooms, hallways, or living rooms through an understated frame and warm natural finish.',
  },
  {
    id: 8,
    name: 'Rove Dining Chair',
    category: 'Dining',
    material: 'Leather',
    price: 540,
    rating: 4.7,
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1578898887932-dce23a595ad4?auto=format&fit=crop&w=1100&q=80',
    colors: ['#b47a53', '#f3e4d3', '#654632'],
    shortDescription: 'Supportive dining seating with warm leather and tapered wood legs.',
    description: 'Rove Dining Chair combines clean lines and tactile materials for a comfortable seat that stays visually light around the table.',
  },
  {
    id: 9,
    name: 'Isla Modular Sofa',
    category: 'Living Room',
    material: 'Linen Blend',
    price: 2640,
    rating: 4.9,
    badge: 'Trending',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1100&q=80',
    colors: ['#e7dacd', '#8d6b52', '#f9f6f1'],
    shortDescription: 'Relaxed Scandinavian lounging with a soft, cloud-like seat.',
    description: 'Isla modular sections make it easy to style generous seating in open-plan spaces while maintaining a clean, elevated interior rhythm.',
  },
];

const BLOG_POSTS = [
  {
    title: 'How to create a softer Scandinavian living room',
    date: 'May 18, 2026',
    category: 'Living Room',
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Learn how layered neutrals, natural wood, and textural seating make a living room feel timeless rather than stark.',
  },
  {
    title: 'The furniture finishes that age beautifully',
    date: 'April 29, 2026',
    category: 'Furniture Care',
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'A guide to selecting oak, walnut, boucle, and leather pieces that settle gracefully into your home over time.',
  },
  {
    title: 'Warm beige palettes for calmer interiors',
    date: 'April 11, 2026',
    category: 'Color Stories',
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'Explore how beige, cream, wood brown, and muted grays can build depth without losing softness or light.',
  },
  {
    title: 'Layered lighting for cozy evenings',
    date: 'May 27, 2026',
    category: 'Lighting',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80',
    excerpt: 'How to use layered lamps, dimmers, and warm tones to create intimate, inviting rooms.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'The furniture feels incredibly premium without overwhelming the room. Everything arrived beautifully finished and exactly as pictured.',
    name: 'Clara Jensen',
    role: 'Interior Stylist, Brooklyn',
  },
  {
    quote: 'Lunera made furnishing our apartment feel calm and effortless. The warm wood tones and textures transformed the whole atmosphere.',
    name: 'Evan Morrison',
    role: 'Homeowner, Chicago',
  },
  {
    quote: 'From the consultation to delivery, the experience felt polished and thoughtful. The pieces look even better in person.',
    name: 'Naomi Ellis',
    role: 'Creative Director, Seattle',
  },
];

const FAQS = [
  {
    question: 'Do you offer interior consultations before purchase?',
    answer: 'Yes. Our team can help with layout planning, scale recommendations, and furniture pairings before you place your order.',
  },
  {
    question: 'Can I customize finishes or dimensions?',
    answer: 'Select products are available for custom dimensions, wood finishes, or upholstery choices through our design team.',
  },
  {
    question: 'How does delivery work?',
    answer: 'We offer standard and white-glove delivery options depending on your location and the size of the items in your order.',
  },
  {
    question: 'Do you provide aftercare guidance?',
    answer: 'Absolutely. We share care notes for wood, upholstery, leather, and lighting so your furniture stays beautiful for years.',
  },
];

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function clearStorage(key) {
  localStorage.removeItem(key);
}

function formatPrice(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function getProductById(id) {
  return PRODUCTS.find((product) => product.id === Number(id));
}

function getQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

function getCategories() {
  return [...new Set(PRODUCTS.map((product) => product.category))];
}

function getMaterials() {
  return [...new Set(PRODUCTS.map((product) => product.material))];
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderStars(rating) {
  const fullStars = Math.round(rating);
  return `${'★'.repeat(fullStars)}${'☆'.repeat(5 - fullStars)}`;
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validatePhone(value) {
  return /^[+\d\s()-]{8,20}$/.test(value);
}

function validatePassword(value) {
  return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value);
}

function getAuthUser() {
  return readStorage(APP.storage.auth, null);
}

function setAuthUser(user) {
  writeStorage(APP.storage.auth, user);
}

function clearAuthUser() {
  clearStorage(APP.storage.auth);
}
