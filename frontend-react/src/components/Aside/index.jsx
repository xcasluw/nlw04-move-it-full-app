import React from "react";
import { AsideContainer } from "./styles";
import logoImg from "../../assets/logo.svg";
import { FiHome, FiAward, FiLogOut } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";

const Aside = ({ props, ...rest }) => {

  const { signOut } = useAuth();

  return (
    <AsideContainer {...rest}>
      <img src={logoImg} alt="Logo" />

      <div>
        <FiHome />
        <FiAward />
      </div>

      <button title="Sair" onClick={signOut}>
        <FiLogOut />
      </button>
    </AsideContainer>
  )
}

export default Aside;