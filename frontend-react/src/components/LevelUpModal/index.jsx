import { useContext } from "react";
import { ChallengesContext } from "../../hooks/challenges";
import { ModalContainer } from "./styles";
import { FiTrash } from "react-icons/fi";

const LevelUpModal = () => {
  const { level, closeLevelUpModal } = useContext(ChallengesContext);

  return (
    <ModalContainer>
      <div>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Você alcançou um novo level</p>

        <button type="button" onClick={closeLevelUpModal}>
          <FiTrash />
        </button>
      </div>
    </ModalContainer>
  )
}

export default LevelUpModal;