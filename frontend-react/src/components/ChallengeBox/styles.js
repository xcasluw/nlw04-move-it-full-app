import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }
  25% {
    opacity: 0.25;
    transform: scale(0.25);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.50); 
  }
  75% {
    opacity: 0.75;
    transform: scale(0.75); 
  }
  100% {
    opacity: 1;
    transform: scale(1); 
  }
`;

export const ChallengeBoxContainer = styled.div`
    height: 100%;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
    padding: 1.5rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    .challengeActive {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .challengeActive header {
      color: #5965e0;
      font-weight: 600;
      font-size: 1.25rem;
      padding: 0 2rem 1.5rem;
      border-bottom: 1px solid #dcdde0;
    }

    .challengeActive main {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .challengeActive main img {
      animation: ${fadeIn} .4s ease;
    }

    .challengeActive main strong {
      font-size: 2rem;
      font-weight: 600;
      color: #2e384d;
      margin: 1.5rem 0 1rem;
    }

    .challengeActive main p {
      line-height: 1.5;
    }

    .challengeActive footer {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .challengeActive footer button {
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 0;
      border-radius: 5px;
      color: #fff;
      font-size: 1rem;
      font-weight: 600;
      transition: filter 0.2s;
    }

    .challengeActive footer button.challengeFailButton {
      background: #e83f5b;
    }

    .challengeActive footer button.challengeSucceededButton {
      background: #4cd62b;
    }

    .challengeActive footer button:hover {
      filter: brightness(0.9);
    }


    .challengeNotActive {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .challengeNotActive strong {
      font-size: 1.5rem;
      font-weight: 500;
      line-height: 1.4;
    }

    .challengeNotActive p {
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1.4;
      max-width: 70%;
      margin-top: 3rem;
    }

    .challengeNotActive p img {
      margin-bottom: 1rem;
    }
`;