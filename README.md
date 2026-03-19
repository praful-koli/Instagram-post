
# 📸 Postify — Instagram-style Posting Platform

A dark-themed Instagram-like posting platform built with **React** and **SCSS**.

---

## ✨ Features

- ➕ Create a post with image, caption, location, and tags
- ✏️ Edit an existing post
- 🗑️ Delete a post
- ❤️ Like / save posts
- 📁 Upload image from PC (drag & drop supported)
- 🔗 Add image via URL
- 🖼️ Choose from sample images
- 📱 Responsive sidebar (collapses on smaller screens)

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| React 18   | UI components & state management |
| SCSS       | Styling with variables |
| Vite       | Build tool & dev server |

---

## 📁 Folder Structure
```
post/
├── public/
├── src/
│   ├── features/
│   │   └── post/
│   │       ├── components/
│   │       │   ├── PostCard.jsx       # Single post card
│   │       │   └── PostModal.jsx      # Create / edit modal
│   │       ├── pages/
│   │       │   └── Feed.jsx           # Main feed page
│   │       └── styles/
│   │           ├── PostCard.scss
│   │           ├── PostModal.scss
│   │           └── Feed.scss
│   ├── shared/
│   │   └── _variables.scss            # SCSS color variables
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/praful-koli/Instagram-post.git
cd post
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

### 4. Open in browser
```
http://localhost:5173
```

---

## 📦 Build for Production
```bash
npm run build
```

---

## 🖥️ Screenshots

> _Add your screenshots here_

---

## 🎨 Theme

All colors are defined in `src/shared/_variables.scss`:
```scss
$bg:             #0a0a0a;
$surface:        #121212;
$surface-2:      #1a1a1a;
$surface-3:      #222222;
$border:         #2a2a2a;
$text-primary:   #f5f5f5;
$text-secondary: #a0a0a0;
$text-muted:     #555555;
$accent:         #0095f6;
$accent-hover:   #1aa0fc;
```

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
