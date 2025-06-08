import React from "react";

const Menu = (props) => {
  const { onSectionChange, menuOpen, setMenuOpen } = props;
  return (
    <>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="z-20 fixed top-12 right-12 p-3 bg-[#cea51ec3] w-11 h-11 rounded-md"
      >
        <div
          className={`bg-white h-0.5 rounded-md w-full transition-all 
                ${menuOpen ? " rotate-45 translate-y-0.5 " : ""} `}
        />
        <div
          className={` bg-white h-0.5 rounded-md w-full my-1 ${
            menuOpen ? "hidden" : ""
          }`}
        />
        <div
          className={` bg-white h-0.5 rounded-md w-full transition-all ${
            menuOpen ? "-rotate-45" : ""
          }`}
        />
      </button>
      <div
        className={`z-10 fixed top-0 right-0 bottom-0 bg-white transition-all overflow-hidden flex flex-col ${
          menuOpen ? "w-80" : "w-0"
        }`}
      >
        <div
          className={`flex-1 flex items-start justify-center flex-col gap-6 p-8`}
        >
          <MenuButton label="About" onClick={() => onSectionChange(0)} />
          <MenuButton label="Skills" onClick={() => onSectionChange(1)} />
          <MenuButton label="Projects" onClick={() => onSectionChange(2)} />
          <MenuButton label="Contacts" onClick={() => onSectionChange(3)} />
        </div>
      </div>
    </>
  );
};

const MenuButton = (props) => {
  const { label, onClick } = props;
  return (
    <button
      onClick={onClick}
      className="text-2xl font-semibold cursor-pointer text-gray-800 hover:text-[#cea51ec3] transition-colors"
    >
      {label}
    </button>
  );
};

export default Menu;
