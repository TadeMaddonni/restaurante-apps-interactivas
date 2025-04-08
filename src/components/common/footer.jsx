import React from "react";
import { Instagram, Facebook } from 'lucide-react';

const Footer = () => {
	return (
<footer className="w-full bg-[#010101] text-[#E0E0E0] py-15 px-4 md:px-12 lg:px-16 flex flex-col items-center justify-center space-y-8">

  {/* Logo */}
  <div className="w-full max-w-[1200px] flex items-center justify-center md:justify-start">
    <div className="flex items-center gap-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="lucide lucide-utensils-crossed h-10 w-10">
        <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"></path>
        <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"></path>
        <path d="m2.1 21.8 6.4-6.3"></path>
        <path d="m19 5-7 7"></path>
      </svg>
      <span className="font-bold font-display text-4xl">Restaurante</span>
    </div>
  </div>

  {/* Links y Redes Sociales */}
  <div className="flex flex-col md:flex-row w-full max-w-[1200px] items-center md:items-start justify-between gap-6 border-b border-[#E0E0E0] pb-6">
    
    {/* Navegación */}
    <ul className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm md:text-base">
      <li><a href="/menu">Menu</a></li>
      <li><a href="/reseñas">Reseñas</a></li>
      <li><a href="/testimonios">Testimonios</a></li>
      <li><a href="/contacto">Contacto</a></li>
    </ul>

    {/* Redes Sociales */}
    <ul className="flex gap-4">
      <li>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <Instagram className="w-6 h-6 text-[#acacac] hover:opacity-80" />
        </a>
      </li>
      <li>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <Facebook className="w-6 h-6 text-[#acacac] hover:opacity-80" />
        </a>
      </li>
    </ul>
  </div>

  {/* Copyright */}
  <div className="w-full max-w-[1200px]">
    <p className="text-sm text-center md:text-left text-[#acacac]">
      © 2023 Restaurante Argentino. Todos los derechos reservados.
    </p>
  </div>

</footer>
	);
};
export default Footer;
