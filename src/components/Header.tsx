import React from "react";
import { textos } from "../textos";

export const Header: React.FC = () => {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="mark">P</span>
        <div>
          <b>{textos.marca.nome}</b>
          <small>{textos.marca.assinatura}</small>
        </div>
      </div>
    </header>
  );
};
