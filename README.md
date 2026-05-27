# Panto - Premium Furniture E-Commerce Website

A modern, fully functional furniture e-commerce website built with HTML, CSS, and JavaScript. Featuring a dark minimalist luxury theme with premium animations and responsive design.

## 🎨 Design Features

### Color Palette
- **Primary Dark**: #1a1a1a
- **Secondary Dark**: #2a2a2a
- **Accent Orange**: #ff8c42
- **Text Primary**: #ffffff
- **Text Secondary**: #b0b0b0

### Premium Aesthetics
- Dark luxury minimalist interior design theme
- Glassmorphism effects
- Soft shadows and glowing hover effects
- Elegant modern typography
- Spacious premium layout
- Smooth gradients
- Neon glow accents

## 📁 Project Structure

```
Furniture_website/
├── index.html                 # Home page
├── pages/
│   ├── shop.html             # Shop/Products page
│   ├── product-details.html  # Product details page
│   ├── cart.html             # Shopping cart page
│   ├── wishlist.html         # Wishlist page
│   ├── about.html            # About us page
│   ├── services.html         # Services page
│   ├── blog.html             # Blog page
│   ├── contact.html          # Contact us page
│   ├── login.html            # Login page
│   ├── signup.html           # Sign up page
│   └── 404.html              # 404 error page
├── css/
│   ├── styles.css            # Main styles and design system
│   ├── animations.css        # Animations and effects
│   └── responsive.css        # Responsive breakpoints
├── js/
│   ├── main.js               # Core functionality
│   ├── utils.js              # Utility functions and data
│   ├── products.js           # Product display functionality
│   ├── cart.js               # Shopping cart logic
│   └── wishlist.js           # Wishlist logic
└── assets/
    ├── images/               # Product images
    └── icons/                # Custom icons
```

## 🎯 Features

### Home Page
- ✅ Sticky transparent navbar with smooth scroll effect
- ✅ Animated hero section with large modern typography
- ✅ Search bar with glowing effect
- ✅ Featured furniture categories
- ✅ Trending products section
- ✅ Best selling products showcase
- ✅ Why Choose Us section with icons
- ✅ Customer testimonials slider
- ✅ Latest blog previews
- ✅ Newsletter subscription
- ✅ Modern footer with social icons

### Shop Page
- ✅ Product grid with filter sidebar
- ✅ Filter by category, material, price range
- ✅ Product search functionality
- ✅ Sort options (price, rating, newest)
- ✅ Pagination/Load more button
- ✅ Add to cart functionality
- ✅ Wishlist button
- ✅ Hover animations on product cards

### Product Details Page
- ✅ Large product images with gallery
- ✅ Product specifications
- ✅ Price display with discounts
- ✅ Quantity selector
- ✅ Add to cart button
- ✅ Wishlist integration
- ✅ Customer reviews section
- ✅ Related products section
- ✅ Breadcrumb navigation

### Shopping Cart
- ✅ Display cart items with images
- ✅ Quantity adjustment
- ✅ Remove items
- ✅ Calculate subtotal, tax, shipping
- ✅ Order summary
- ✅ Checkout button
- ✅ Mini cart sidebar
- ✅ Empty cart state

### Wishlist
- ✅ Display wishlist items
- ✅ Remove from wishlist
- ✅ Move to cart
- ✅ Clear wishlist
- ✅ Wishlist count
- ✅ Mini wishlist sidebar
- ✅ Product statistics

### Authentication Pages
- ✅ Login page with form validation
- ✅ Sign up page with password confirmation
- ✅ Social login options
- ✅ Remember me option
- ✅ Forgot password link

### Information Pages
- ✅ About Us with company story, mission, vision
- ✅ Team section with member profiles
- ✅ Achievements section with counters
- ✅ Services page with 6+ services
- ✅ Blog page with articles
- ✅ Contact page with form
- ✅ FAQ section with accordion
- ✅ 404 error page

## 🎨 Animations & Effects

### Scroll Animations
- ✅ Fade in
- ✅ Slide up
- ✅ Slide down
- ✅ Slide left/right
- ✅ Zoom in
- ✅ Stagger animation

### Hover Effects
- ✅ Glow effect
- ✅ Lift effect
- ✅ Scale effect
- ✅ Color shift
- ✅ 3D perspective
- ✅ Image zoom

### Page Effects
- ✅ Smooth scrolling
- ✅ Parallax background
- ✅ Floating elements
- ✅ Loading animations
- ✅ Smooth transitions
- ✅ Gradient animations
- ✅ Pulse animations
- ✅ Bounce animations

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1024px and above
- **Tablet**: 768px to 1024px
- **Mobile**: 480px to 768px
- **Small Mobile**: Below 480px

### Mobile Features
- ✅ Hamburger menu
- ✅ Responsive product grid
- ✅ Optimized spacing
- ✅ Touch-friendly buttons
- ✅ Mobile-friendly navigation
- ✅ Sticky bottom navigation
- ✅ Responsive forms

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, Animations
- **JavaScript (ES6+)**: Modern JavaScript features
- **Font Awesome**: Icon library

### Features
- ✅ Local storage for cart and wishlist
- ✅ Form validation with error messages
- ✅ Toast notifications
- ✅ Modal popups
- ✅ Debounce and throttle functions
- ✅ Intersection Observer for animations
- ✅ Lazy loading support
- ✅ Mobile menu toggle
- ✅ Smooth scroll to top

## 🚀 Getting Started

1. **Extract/Open the project**
   ```bash
   cd Furniture_website
   ```

2. **Open in browser**
   - Double-click `index.html` to open in default browser
   - Or right-click and select "Open with" → choose your browser
   - For best experience, use modern browsers (Chrome, Firefox, Safari, Edge)

3. **Development Server (Optional)**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js
   npx http-server
   ```

   Then navigate to `http://localhost:8000`

## 📦 Data Management

### Local Storage
- **cart**: Stores shopping cart items
- **wishlist**: Stores wishlist items
- **darkMode**: Stores dark mode preference

### Mock Data
The website includes mock product data with:
- 8 sample furniture products
- Categories (Sofas, Chairs, Tables, etc.)
- Materials (Wood, Fabric, Glass, etc.)
- Ratings and reviews
- Prices

## 🎛️ Customization

### Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
  --primary-dark: #1a1a1a;
  --accent-orange: #ff8c42;
  /* ... more colors */
}
```

### Typography
Modify font sizes and weights:
```css
:root {
  --fs-16: 1rem;
  --fw-700: 700;
  /* ... more typography */
}
```

### Spacing
Adjust padding and margins:
```css
:root {
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  /* ... more spacing */
}
```

## 📊 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🔐 Security Notes

This is a demo/prototype website. In production:
- Implement backend authentication
- Use HTTPS for all connections
- Validate and sanitize all inputs
- Use secure payment gateways
- Implement CSRF protection
- Use environment variables for sensitive data

## 📈 Performance Optimization

- Lightweight CSS with no external dependencies
- Optimized animations for 60fps
- Lazy loading support for images
- Minimal JavaScript for fast load times
- Accessible and SEO-friendly HTML structure

## 🎓 Learning Resources

### CSS Features Demonstrated
- CSS Custom Properties (Variables)
- CSS Grid and Flexbox
- CSS Animations and Transitions
- CSS Gradients
- Backdrop Filters
- Box Shadows

### JavaScript Features Demonstrated
- ES6 Classes
- Local Storage API
- Intersection Observer API
- Event Listeners and Delegation
- Array Methods
- DOM Manipulation

## 📝 License

This project is open-source and available for educational and commercial use.

## 🤝 Support

For issues or questions, please refer to the code comments or contact support.

---

**Created**: May 2024  
**Last Updated**: May 2024  
**Version**: 1.0.0

Enjoy your modern, premium furniture e-commerce website! 🎉
