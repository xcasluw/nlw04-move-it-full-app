import React, { useContext } from "react";
import { ChallengesContext } from "../../hooks/challenges";
import { ContainerSlideEnter } from "./styles";
import CloseButtonImg from "../../assets/icons/close.svg";

const LevelUpModal = () => {
  const { level, closeLevelUpModal } = useContext(ChallengesContext);

  return (
    <ContainerSlideEnter>
      <div className="container">
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Você alcançou um novo level</p>

        <button type="button" onClick={closeLevelUpModal}>
          <img src={CloseButtonImg} alt="Fechar modal" />
        </button>
      </div>
    </ContainerSlideEnter>
  )
}

export default LevelUpModal;