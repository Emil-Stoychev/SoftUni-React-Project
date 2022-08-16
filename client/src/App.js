import "./App.css";
import { Routes, Route } from 'react-router-dom'

import { Navigation } from "./components/navigation/Navigation";
import { WelcomeSection } from './components/welcome/Welcome'

import { CatalogSection } from './components/catalog/Catalog'
import { DetailsSection } from './components/catalog/details/Details'
import { EditSection } from './components/catalog/edit/Edit'
import { CreateSection } from './components/catalog/create/Create'

import { LoginSection } from './components/user/login/Login'
import { RegisterSection } from './components/user/register/Register'
import { ProfileSection } from './components/user/profile/Profile'
import { OwnProducts } from "./components/catalog/own-products/OwnProducts";
import { LikedProducts } from "./components/catalog/liked-products/LikedProducts";
import { Messages } from "./components/catalog/messages/Messages";

import { ErrorSection } from './components/error/Error'
import { Footer } from "./components/footer/Footer";
import PrivateRoutes from "./routerGuard/PrivateRoutes";
import GuestRoutes from "./routerGuard/GuestRoutes";
import { AuthContextProvider } from "./contexts/AuthContext";
import { DailyWheel } from "./components/wheel/Wheel";

function App() {
  return (
    <div className="App">
        <AuthContextProvider>  

          <Navigation/>

          <Routes>

            <Route path="/catalog" element={<CatalogSection />} />

            <Route path="/catalog/details/:productId" element={<DetailsSection/>} />

            {/* PRIVATE ROUTES */}
            <Route element={<PrivateRoutes />}>

              <Route path="/catalog/create" element={<CreateSection />} />

              <Route path="/catalog/edit/:productId" element={<EditSection />} />

              <Route path="/ownProducts" element={<OwnProducts />} />

              <Route path="/likedProducts" element={<LikedProducts />} />

              <Route path="/messages" element={<Messages />} />

              <Route path="/profile" element={<ProfileSection />} />

              <Route path="/dailyWheel" element={<DailyWheel />} />

            </Route>

            {/* GUEST ROUTES */}
            <Route element={<GuestRoutes />}>

              <Route path="/" element={<WelcomeSection />} />

              <Route path="/user/login" element={<LoginSection/>} />

              <Route path="/user/register" element={<RegisterSection />} />

            </Route>

            <Route path="*" element={<ErrorSection />} />

          </Routes>

          <Footer />

        </AuthContextProvider>
    </div>
  );
}

export default App;
