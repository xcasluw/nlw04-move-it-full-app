import styled, { keyframes } from "styled-components";

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px)
  }

  to {
    opacity: 1;
    transform: translateX(0)
  }
`;

export const AnimationContainer = styled.div`
  animation: ${appearFromLeft} 1s;
  display: flex;
`;

export const Container = styled.div`
  height: 100vh;
  max-width: 1020px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  width: 100%;

  table {

    width: 100%;
    display: table;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
    border-radius: 10px;
    border-collapse: collapse;

    th {

      vertical-align: middle; 
      text-align: left;
      color: #ACADAE;
      padding: 1.5rem 0;

    }

    tr {

      transition: background-color 0.2s;

      td {
        height: 96px;
        background: #ffffff;
        padding: 0.5rem 2rem;
        
        white-space: nowrap;
        vertical-align: middle;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        color: #ccc;
        font-size: 14px;
      }
    }

  }

`;