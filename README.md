# 🚀 SWIGS Site Template

**Template officiel pour la création de nouveaux sites SWIGS**

⚠️ **NE PAS MODIFIER CE TEMPLATE DIRECTEMENT** - Clonez-le pour créer un nouveau site.

---

## 📋 Utilisation

### 1. Cloner le template

```bash
cd /Users/corentinflaction/CascadeProjects/sites
cp -r ../swigs-repos/swigs-site-template nouveau-site-website
cd nouveau-site-website
rm -rf .git
git init
```

### 2. Configurer le site

#### a) `package.json`
```json
{
  "name": "nouveau-site-website",
  ...
}
```

#### b) `src/data/seo.json`
```json
{
  "site": {
    "name": "Nom du Site",
    "slug": "SLUG_ADMIN",  // ⚠️ DOIT correspondre au slug dans l'Admin
    "domain": "nouveau-site.swigs.online",
    ...
  }
}
```

#### c) `tailwind.config.js`
Personnaliser les couleurs et fonts pour un design unique.

#### d) `index.html`
Modifier les Google Fonts selon le design.

### 3. Personnaliser les pages

- **`src/pages/Home.jsx`** : Page d'accueil
- **`src/pages/Contact.jsx`** : Page contact (déjà fonctionnelle)
- **`src/components/Layout.jsx`** : Header/Footer + navigation

### 4. Ajouter des pages

```jsx
// src/pages/NouveauPage.jsx
import SEOHead from '../components/SEOHead';

const NouveauPage = () => {
  return (
    <>
      <SEOHead page="nouveau-page" />
      {/* Contenu */}
    </>
  );
};

export default NouveauPage;
```

Puis dans `src/App.jsx` :
```jsx
import NouveauPage from './pages/NouveauPage';
// ...
<Route path="/nouveau-page" element={<NouveauPage />} />
```

Et dans `src/data/seo.json`, ajouter la page :
```json
"nouveau-page": {
  "title": "Titre | Nom du Site",
  "description": "Description SEO",
  ...
}
```

### 5. Tester en local

```bash
npm install
npm run dev
# Ouvrir http://localhost:5173
```

### 6. Créer le site dans l'Admin

1. Aller sur https://admin.swigs.online
2. Sites → Ajouter un site
3. Slug = même valeur que dans `seo.json`

### 7. Git & Push

```bash
git add -A
git commit -m "feat: Initial commit nouveau site"
git remote add origin git@github.com:swigsstaking/nouveau-site-website.git
git push -u origin main
```

### 8. Déploiement (après confirmation)

Voir `swigs-infrastructure/docs/SERVER_DEPLOYMENT_GUIDE.md`

---

## 📁 Structure

```
swigs-site-template/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Layout.jsx          # Header + Footer
│   │   └── SEOHead.jsx         # SEO avec Helmet
│   ├── hooks/
│   │   ├── useSEO.js           # Hook SEO
│   │   ├── useSiteInfo.js      # Hook infos site (API)
│   │   └── useContact.js       # Hook formulaire contact
│   ├── pages/
│   │   ├── Home.jsx            # Page d'accueil
│   │   └── Contact.jsx         # Page contact
│   ├── data/
│   │   └── seo.json            # Configuration SEO
│   ├── App.jsx                 # Routes
│   ├── main.jsx                # Point d'entrée
│   └── index.css               # Styles Tailwind
├── .env.example                # Variables dev
├── .env.production             # Variables prod
├── tailwind.config.js          # Config Tailwind
├── vite.config.js              # Config Vite
└── package.json
```

---

## 🎨 Personnalisation

### Couleurs (tailwind.config.js)

```js
colors: {
  primary: { ... },    // Couleur principale
  secondary: { ... },  // Couleur secondaire
  accent: { ... },     // Couleur d'accent
}
```

### Fonts (tailwind.config.js + index.html)

```js
fontFamily: {
  display: ['Playfair Display', 'serif'],
  sans: ['Lato', 'system-ui', 'sans-serif'],
}
```

---

## ✅ Checklist Nouveau Site

- [ ] Cloner le template
- [ ] Modifier `package.json` (name)
- [ ] Modifier `src/data/seo.json` (slug, infos)
- [ ] Personnaliser `tailwind.config.js` (couleurs, fonts)
- [ ] Personnaliser `index.html` (fonts)
- [ ] Créer les pages spécifiques
- [ ] Modifier `Layout.jsx` (navigation)
- [ ] Tester en local (`npm run dev`)
- [ ] Créer le site dans l'Admin (même slug)
- [ ] Git init + push
- [ ] Déployer (après confirmation)

---

## 🔗 Connexion API

Le template est pré-configuré pour se connecter à l'API SWIGS :

- **Dev** : `http://localhost:3000/api`
- **Prod** : `https://swigs.online/api`

Les hooks `useSiteInfo` et `useContact` gèrent automatiquement les appels API.

---

**📝 Version : 1.0 - Janvier 2026**
