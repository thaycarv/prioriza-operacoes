import React from "react";
import { textos } from "../textos";
import { Layers, Activity } from "lucide-react";

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
        <span className="system-pill">
          <Activity className="system-icon" aria-hidden="true" />
          Ecossistema RadarSocial
        </span>
        <div className="topbar-tag">
          <span>{textos.marca.modulo}</span>
        </div>
      </div>
    </header>
  );
};
