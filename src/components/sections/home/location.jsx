import React from "react";

const Location = () => {
  return (
    <section class="bg-[#EDE7D4]  py-20 text-center ">
    <h2 className="text-4xl px-6 py-12.5 lg:text-6xl text-[#191514]font-display font-medium text-left  tracking-tighter ">
        Donde encontrarnos
    </h2>
    <div class="relative w-full h-[550px]">
        <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1979.5181637511723!2d-58.41772496110055!3d-34.5897385234562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca808ca14705%3A0x37a2387cef52740c!2sGral.%20Lucio%20Norberto%20Mansilla%203748%2C%20C1425BPZ%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1744052097625!5m2!1ses!2sar"
        class="w-full h-full border-0"
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade">
        </iframe>
        <div class="absolute bottom-105  right-5 bg-[#EDE7D4] border-2 border-[#E3870E] text-left p-5 mx-6 shadow-lg rounded-xl max-w-xs z-10">
        <h3 class="font-semibold text-lg mb-1">Dirección</h3>
        <p class="mb-4">Norberto Mansilla 3748, Palermo.</p>

        <h3 class="font-semibold text-lg mb-1">Email</h3>
        <p class="mb-4">reservas@restoargentino.com</p>

        <h3 class="font-semibold text-lg mb-1">Teléfono</h3>
        <p>+5411063456</p>
        </div>
    </div>
</section>

  );
};

export default Location;
