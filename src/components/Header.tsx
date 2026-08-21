import React from "react";
import { textos } from "../textos";

interface HeaderProps {
  currentVersion: "v1" | "v2";
  onSelectVersion: (version: "v1" | "v2") => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentVersion,
  onSelectVersion,
}) => {
  return (
    <header className="topbar">
      <div className="brand">
        <span className="mark">P</span>
        <div>
          <b>{textos.marca.nome}</b>
          <small>{textos.marca.assinatura}</small>
        </div>
      </div>
      <div className="version-switch-container">
        <span className="version-switch-label">Versão:</span>
        <div className="version-toggle" role="group" aria-label="Alternar versão">
          <button
            type="button"
            className={currentVersion === "v2" ? "active" : ""}
            onClick={() => onSelectVersion("v2")}
          >
            Versão 2.0
          </button>
          <button
            type="button"
            className={currentVersion === "v1" ? "active" : ""}
            onClick={() => onSelectVersion("v1")}
          >
            Versão 1.0
          </button>
        </div>
      </div>
    </header>
  );
};
