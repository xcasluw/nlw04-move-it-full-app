import { useContext } from "react";
import { CountdownContext } from "../../hooks/countdown";
import { CountdownContainer, DivButtons } from "./styles";

const Countdown = () => {

  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <>
      <CountdownContainer>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </CountdownContainer>

      { hasFinished ? (
        <DivButtons>
          <button disabled className="countdownButton">
            Ciclo encerrado
          </button>
        </DivButtons>
      ) : (
          <DivButtons>
            { isActive ? (
              <button type="button" className="countdownButton countdownButtonActive" onClick={resetCountdown}>
                Abandonar ciclo
              </button>
            ) : (
                <button type="button" className="countdownButton" onClick={startCountdown}>
                  Iniciar um ciclo
                </button>
              )}
          </DivButtons>
        )}
    </>
  )
}

export default Countdown;