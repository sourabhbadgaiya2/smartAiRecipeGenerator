import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import Navbar from "../components/Navbar";
import Landing from "../pages/public/Landing";
import Product from "../pages/public/Product";
import Features from "../pages/public/Features";
import GenerateRecipe from "../pages/private/recipe/GenerateRecipe";
import Home from "../pages/private/Home";
import ProfileInformation from "../pages/private/user/ProfileInformation";

const AppRoutes = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/product' element={<Product />} />
        <Route path='/features' element={<Features />} />
        <Route
          path='/Home'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/create-recipe'
          element={
            <ProtectedRoute>
              <GenerateRecipe />
            </ProtectedRoute>
          }
        />
        <Route
          path='/Profile'
          element={
            <ProtectedRoute>
              <ProfileInformation />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;
