import React, { useState } from "react";

function Navbar2() {
  // Etat pour gerer la visibilité de la barre de navigation
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  // Tableau contenant les éléments de navigation
  const navItems = [
    { id: 1, text: "Home" },
    { id: 2, text: "Company" },
    { id: 3, text: "Resources" },
  ];

  return (
    <div className="bg-black flex justify-center items-center j-24 max-w-[1240px] mx-auto px-4 text-white">
      {/* Logo */}
      <h1 className="w-full text-3xl font-bold text[#00d9a">OPENCARE</h1>

      {/* Navigation */}
      <ul className="hidden md:flex">
        {navItems.map((item) => (
          <li key={item.id} className="p-4 hover:bg-[#00df9a] m-4">
            {item.text}
          </li>
        ))}
      </ul>

      {/* Menu de navigation mobile */}
      <ul>
        {/* Mobile Logo */}
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">
          OPENCARE
        </h1>
      </ul>
    </div>
  );
}

export default Navbar2;
