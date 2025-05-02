import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/footer.jsx";
import Home from "./components/pages/Home.jsx";
import ProductDetail from "./components/pages/ProductDetail.jsx";
import MenuPage from "./components/pages/Menu.jsx";

function App() {
    return (
        <Router>
            <Header />
            <main className="flex flex-col items-center bg-background">
                <Routes>
                    {/* Ruta principal */}
                    <Route path="/" element={<Home />} />

                    {/* Ruta para el menú  */}
                    <Route path="/platos" element={<MenuPage />} />

                    {/* Ruta para el detalle del plato */}
                    <Route path="/plato/:id" element={<ProductDetail />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;