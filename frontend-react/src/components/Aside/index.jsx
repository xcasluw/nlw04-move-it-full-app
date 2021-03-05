import React from "react";
import { AsideContainer } from "./styles";
import logoImg from "../../assets/logo.svg";
import { FiHome, FiAward, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";
import { Link } from "react-router-dom";

const Aside = ({ props, ...rest }) => {

  const { signOut } = useAuth();

  return (
    <AsideContainer {...rest}>
      <img src={logoImg} alt="Logo" />

      <div>
        <Link to="/dashboard">
          <FiHome />
        </Link>
        <Link to="/leaderboard">
          <FiAward />
        </Link>
      </div>

      <button title="Sair" onClick={signOut}>
        <FiLogOut />
      </button>
    </AsideContainer>
  )
}

export default Aside;