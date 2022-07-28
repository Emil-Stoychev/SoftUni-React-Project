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
import { Messages } from "./components/catalog/purchased-products/PurchasedProducts";

import { ErrorSection } from './components/error/Error'
import getCookie from "./components/cookies/getCookie";
import { useEffect, useState } from "react";

// TODO: To make check for edit and other pages whether have permission to do this request and if not just redirect!!! 

function App() {
  const [cookies, setCookies] = useState('')

  useEffect(() => {
    let cookie = getCookie('sessionStorage')

    if (cookie._id) {
      setCookies(cookie)
    }

  }, [])

  return (
    <div className="App">
      <Navigation cookies={cookies} setCookies={setCookies} />

      <Routes>

        <Route path="/catalog" element={<CatalogSection />} />

        <Route path="/catalog/details/:productId" element={<DetailsSection setCookies={setCookies} />} />

        {cookies._id
          ?
          <>
            <Route path="/catalog/create" element={<CreateSection />} />

            <Route path="/catalog/edit/:productId" element={<EditSection />} />

            <Route path="/ownProducts" element={<OwnProducts />} />

            <Route path="/likedProducts" element={<LikedProducts />} />

            <Route path="/messages" element={<Messages />} />

            <Route path="/profile" element={<ProfileSection />} />
          </>
          :
          <>
            <Route path="/" element={<WelcomeSection />} />

            <Route path="/user/login" element={<LoginSection setCookies={setCookies} />} />

            <Route path="/user/register" element={<RegisterSection />} />
          </>
        }

        <Route path="*" element={<ErrorSection />} />

      </Routes>

    </div>
  );
}

export default App;
