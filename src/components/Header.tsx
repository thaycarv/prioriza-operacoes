import React from "react";
import { textos } from "../textos";
import { Layers, ShieldCheck } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-mark-wrapper">
          <Layers className="brand-icon" aria-hidden="true" />
        </div>
        <div>
          <b>{textos.marca.nome}</b>
          <small>{textos.marca.assinatura}</small>
        </div>
      </div>

      <div className="topbar-right">
        <span className="author-tag">
          <ShieldCheck className="author-icon" aria-hidden="true" />
          Thayâne Carvalho
        </span>
        <div className="topbar-tag">
          <span>{textos.marca.modulo}</span>
        </div>
      </div>
    </header>
  );
};
