import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/footer.jsx";
import Home from "./components/pages/Home.jsx";
import ProductDetail from "./components/pages/ProductDetail.jsx";
import MenuPage from "./components/pages/Menu.jsx";
import ScrollToTop from "./components/common/ScrollToTop";

// Admin pages
import AdminLogin from "./components/pages/AdminLogin.jsx";
import AdminDashboard from "./components/pages/AdminDashboard.jsx";
import DishesManagement from "./components/pages/admin/DishesManagement.jsx";
import CategoriesManagement from "./components/pages/admin/CategoriesManagement.jsx";
import UsersManagement from "./components/pages/admin/UsersManagement.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";


function App() {
    return (
        <Router>
            <ScrollToTop />
            
            <Routes>
                {/* Admin routes - Sin Header/Footer */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={
                    <ProtectedRoute>
                        <AdminDashboard />
                    </ProtectedRoute>
                } />
                <Route path="/admin/dashboard/dishes" element={
                    <ProtectedRoute>
                        <DishesManagement />
                    </ProtectedRoute>
                } />
                <Route path="/admin/dashboard/categories" element={
                    <ProtectedRoute>
                        <CategoriesManagement />
                    </ProtectedRoute>
                } />
                <Route path="/admin/dashboard/users" element={
                    <ProtectedRoute>
                        <UsersManagement />
                    </ProtectedRoute>
                } />

                {/* Main site routes - Con Header/Footer */}
                <Route path="*" element={
                    <>
                        <Header />
                        <main className="flex flex-col items-center bg-background">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/platos" element={<MenuPage />} />
                                <Route path="/plato/:id" element={<ProductDetail />} />
                            </Routes>
                        </main>
                        <Footer />
                    </>
                } />
            </Routes>
        </Router>
    );
}

export default App;