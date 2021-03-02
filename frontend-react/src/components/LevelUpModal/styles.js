import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from { 
    transform: translateY(-30px); 
    opacity: 0; 
  }
  
  to { 
    transform: translateY(0px); 
    opacity: 1; 
  }
`;

export const ContainerSlideEnter = styled.div`
  animation: ${slideIn} 0.3s ease;

  background: rgba(242, 243, 245, 0.8);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    background: #fff;
    width: 100%;
    max-width: 400px;
    padding: 2rem 3rem;
    border-radius: 5px;
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
    text-align: center;
    position: relative;
  }

  .container header {
    font-size: 8.75rem;
    font-weight: 600;
    color: #5965e0;
    background: url('/icons/levelup.svg') no-repeat center;
    background-size: contain;
  }

  .container strong {
    font-size: 2.25rem;
    color: #2e384d;
  }

  .container p {
    font-size: 1.25rem;
    color: #666666;
    margin-top: 0.25rem;
  }

  .container button {
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
    background: transparent;
    border: 0;
    font-size: 0;
  }
`;

