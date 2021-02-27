import styled from "styled-components";

export const Container = styled.button`
  width: 100%;
  height: 5rem;
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: 5px;
  background: #4cd62b;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
  transition: background-color 0.2s;

  @media (max-width: 1800px) {
    height: 50px;
  }

  @media (max-width: 1600px) {
    height: 50px;
  }

  @media (max-width: 1200px) {
    height: 50px;
  }    
  
  @media (max-width: 900px) {
    height: 48px;
  }

  @media (max-width: 600px) {
    height: 48px;
  }

  &:not(:disabled):hover {
    background: #4953b8;
  }

  &:active {
    background: #fff;
    color: #2e384d;
  }

  &:active:not(:disabled):hover {
    background: #e83f5b;
    color: #fff;
  }

  &:disabled {
    background: #fff;
    color: #666666;
    cursor: not-allowed;
  }
`;
