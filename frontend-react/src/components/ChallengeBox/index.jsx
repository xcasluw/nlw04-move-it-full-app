import React, { useContext } from "react";
import { ChallengesContext } from "../../hooks/challenges";
import { CountdownContext } from "../../hooks/countdown";
import { ChallengeBoxContainer } from "./styles";
import levelUpImg from "../../assets/icons/level-up.svg";

const ChallengeBox = () => {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
  const { resetCountdown } = useContext(CountdownContext);

  function handleChallengeSucceeded() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFailed() {
    resetChallenge();
    resetCountdown();
  }

  return (
    <ChallengeBoxContainer>
      {activeChallenge ? (
        <div className="challengeActive">
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="Tipo Desafio" />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              onClick={handleChallengeFailed}
              className="challengeFailButton"
            >
              Falhei
            </button>

            <button
              type="button"
              className="challengeSucceededButton"
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
          <div className="challengeNotActive">
            <strong>Finalize um ciclo para receber um desafio</strong>
            <p>
              <img src={levelUpImg} alt="Level Up" />
              Avance de level completando desafios
            </p>
          </div>
        )}
    </ChallengeBoxContainer>
  )
}

export default ChallengeBox;