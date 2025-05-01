import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header.jsx";
import Footer from "./components/common/Footer.jsx";
import Home from "./components/pages/Home.jsx";
import ProductDetail from "./components/pages/ProductDetail.jsx";

function App() {
    return (
        <Router>
            <Header />
            <main className="flex flex-col justify-start min-h-screen bg-background">
                <Routes>
                    {/* Ruta principal */}
                    <Route path="/" element={<Home />} />

                    {/* Ruta para el detalle del plato */}
                    <Route path="/plato/:id" element={<ProductDetail />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;