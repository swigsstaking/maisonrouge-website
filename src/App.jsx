import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import Home from './pages/Home';

// Lazy-loaded pages
const Vignoble = lazy(() => import('./pages/Vignoble'));
const Vins = lazy(() => import('./pages/Vins'));
const Apprentis = lazy(() => import('./pages/Apprentis'));
const Oenotourisme = lazy(() => import('./pages/Oenotourisme'));
const Partenaires = lazy(() => import('./pages/Partenaires'));
const Sponsoring = lazy(() => import('./pages/Sponsoring'));
const Contact = lazy(() => import('./pages/Contact'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Auth = lazy(() => import('./pages/Auth'));
const Account = lazy(() => import('./pages/Account'));
const NotFound = lazy(() => import('./pages/NotFound'));
const CheckoutRedirect = lazy(() => import('./pages/CheckoutRedirect'));
const ConditionsGenerales = lazy(() => import('./pages/ConditionsGenerales'));
const APropos = lazy(() => import('./pages/APropos'));
const Actualites = lazy(() => import('./pages/Actualites'));
const ArticleDetail = lazy(() => import('./pages/ArticleDetail'));
const MillesimesAnciens = lazy(() => import('./pages/MillesimesAnciens'));

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <CartProvider>
            <AuthProvider>
              <Layout>
                <Suspense fallback={null}>
                  <Routes>
                    {/* French routes (default, no prefix) */}
                    <Route path="/" element={<Home />} />
                    <Route path="/vignoble" element={<Vignoble />} />
                    <Route path="/vins" element={<Vins />} />
                    <Route path="/vins/:slug" element={<ProductDetail />} />
                    <Route path="/cuvee-des-apprentis" element={<Apprentis />} />
                    <Route path="/oenotourisme" element={<Oenotourisme />} />
                    <Route path="/partenaires" element={<Partenaires />} />
                    <Route path="/sponsoring" element={<Sponsoring />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/panier" element={<Cart />} />
                    <Route path="/connexion" element={<Auth />} />
                    <Route path="/mon-compte" element={<Account />} />
                    <Route path="/conditions-generales" element={<ConditionsGenerales />} />
                    <Route path="/a-propos" element={<APropos />} />
                    <Route path="/actualites" element={<Actualites />} />
                    <Route path="/actualites/:slug" element={<ArticleDetail />} />
                    <Route path="/millesimes-anciens" element={<MillesimesAnciens />} />

                    {/* English routes */}
                    <Route path="/en" element={<Home />} />
                    <Route path="/en/vineyard" element={<Vignoble />} />
                    <Route path="/en/wines" element={<Vins />} />
                    <Route path="/en/wines/:slug" element={<ProductDetail />} />
                    <Route path="/en/apprentice-wines" element={<Apprentis />} />
                    <Route path="/en/wine-tourism" element={<Oenotourisme />} />
                    <Route path="/en/partners" element={<Partenaires />} />
                    <Route path="/en/sponsorship" element={<Sponsoring />} />
                    <Route path="/en/contact" element={<Contact />} />
                    <Route path="/en/cart" element={<Cart />} />
                    <Route path="/en/login" element={<Auth />} />
                    <Route path="/en/my-account" element={<Account />} />
                    <Route path="/en/terms" element={<ConditionsGenerales />} />
                    <Route path="/en/about" element={<APropos />} />
                    <Route path="/en/news" element={<Actualites />} />
                    <Route path="/en/news/:slug" element={<ArticleDetail />} />
                    <Route path="/en/birth-year-wines" element={<MillesimesAnciens />} />

                    {/* German routes */}
                    <Route path="/de" element={<Home />} />
                    <Route path="/de/weinberg" element={<Vignoble />} />
                    <Route path="/de/weine" element={<Vins />} />
                    <Route path="/de/weine/:slug" element={<ProductDetail />} />
                    <Route path="/de/lehrlingsweine" element={<Apprentis />} />
                    <Route path="/de/weintourismus" element={<Oenotourisme />} />
                    <Route path="/de/partner" element={<Partenaires />} />
                    <Route path="/de/sponsoring" element={<Sponsoring />} />
                    <Route path="/de/kontakt" element={<Contact />} />
                    <Route path="/de/warenkorb" element={<Cart />} />
                    <Route path="/de/anmelden" element={<Auth />} />
                    <Route path="/de/mein-konto" element={<Account />} />
                    <Route path="/de/agb" element={<ConditionsGenerales />} />
                    <Route path="/de/ueber-uns" element={<APropos />} />
                    <Route path="/de/aktuelles" element={<Actualites />} />
                    <Route path="/de/aktuelles/:slug" element={<ArticleDetail />} />
                    <Route path="/de/geburtsjahrgang-weine" element={<MillesimesAnciens />} />

                    {/* Checkout redirect (Stripe success/cancel) */}
                    <Route path="/checkout" element={<CheckoutRedirect />} />
                    <Route path="/success" element={<CheckoutRedirect />} />
                    <Route path="/en/checkout" element={<CheckoutRedirect />} />
                    <Route path="/de/checkout" element={<CheckoutRedirect />} />

                    {/* 404 catch-all */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </Layout>
            </AuthProvider>
          </CartProvider>
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
