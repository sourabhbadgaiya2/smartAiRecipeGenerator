import { Route, Routes } from "react-router-dom";
import Home from "../pages/public/Home";
import Header from "../pages/private/Header";
import ProtectedRoute from "../components/ProtectedRoute";
import Hero from "../pages/private/Hero";
import Navbar from "../components/Navbar";
import Landing from "../pages/public/Landing";
import Product from "../pages/public/Product";
import Features from "../pages/public/Features";
import GenerateRecipe from "../pages/private/recipe/GenerateRecipe";

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
              <Hero />
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
      </Routes>
    </div>
  );
};

export default AppRoutes;
