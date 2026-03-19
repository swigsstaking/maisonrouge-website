import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Vignoble from './pages/Vignoble';
import Vins from './pages/Vins';
import Apprentis from './pages/Apprentis';
import Oenotourisme from './pages/Oenotourisme';
import Partenaires from './pages/Partenaires';
import Sponsoring from './pages/Sponsoring';
import Contact from './pages/Contact';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Auth from './pages/Auth';
import Account from './pages/Account';
import NotFound from './pages/NotFound';
import ConditionsGenerales from './pages/ConditionsGenerales';
import APropos from './pages/APropos';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <LanguageProvider>
          <CartProvider>
            <AuthProvider>
              <Layout>
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

                  {/* 404 catch-all */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Layout>
            </AuthProvider>
          </CartProvider>
        </LanguageProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
