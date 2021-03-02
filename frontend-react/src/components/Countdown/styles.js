import styled from "styled-components";

export const CountdownContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: Rajdhani;
  font-weight: 600;
  color: #2e384d;

  > div {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background: #fff;
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
    border-radius: 5px;
    font-size: 8.5rem;
    text-align: center;

    span {
      flex: 1;

      &:first-child {
        border-right: 1px solid #f0f1f3;
      }

      &:last-child {
        border-right: 1px solid #f0f1f3;
      }
    }
  }

  > span {
    font-size: 6.25rem;
    margin: 0 0.5rem;
  }
`;

export const DivButtons = styled.div`

  .countdownButton {
    width: 100%;
    height: 5rem;
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    border-radius: 5px;
    background: #5965e0;
    color: #fff;
    font-size: 1.25rem;
    font-weight: 600;
    transition: background-color 0.2s;
  }

  .countdownButton:not(:disabled):hover {
    background: #4953b8;
  }

  .countdownButtonActive {
    background: #fff;
    color: #2e384d;
  }

  .countdownButtonActive:not(:disabled):hover {
    background: #e83f5b;
    color: #fff;
  }

  .countdownButton:disabled {
    background: #fff;
    color: #666666;
    cursor: not-allowed;
  }
`;