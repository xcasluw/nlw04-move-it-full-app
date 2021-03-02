import styled, { keyframes } from "styled-components";
import { shade } from "polished";

import signInLogoImg from "../../assets/logo.svg";

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;
  background-color: #5965E0;

  &::after {
    content: "";
    background: url(${signInLogoImg});
    background-repeat: no-repeat;
    background-size: contain;
    opacity: 0.5;
    top: 10%;
    right: 0;
    bottom: 0;
    left: 0;
    position: absolute;
    /* z-index: -1; */
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  z-index: 10;
`;

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
  
  
  @media (min-width: 600px) {
    width: 400px;
  }

  img {

    @media (min-width: 1801px) {
      width: 300px;
      margin-bottom: 60px;
    }

    @media (max-width: 1800px) {
      width: 300px;
      margin-bottom: 50px;
    }

    @media (max-width: 1600px) {
      width: 300px;
      margin-bottom: 40px;
    }

    @media (max-width: 1200px) {
      width: 300px;
      margin-bottom: 30px;
    }    
    
    @media (max-width: 900px) {
      width: 300px;
      margin-bottom: 30px;
    }

    @media (max-width: 600px) {
      width: 300px;
      margin-bottom: 30px;
    }
    
  }

  form {

    width: 100%;

    > span {
      font-size: 30px;
      color: #fff;
    }

    div {

      margin: 20px 0;
      display: flex;
      align-items: center;
      
      svg {
        font-size: 30px;
        color: rgba(255, 255, 255, 0.6);
        margin-right: 10px;
      }

      span {
        font-size: 18px;
        color: rgba(255, 255, 255, 0.6);
      }
    }

    button {

      svg {

        @media (min-width: 1801px) {
          width: 48px;
          height: 40px;
        }

        @media (max-width: 1800px) {
          width: 50px;
          height: 40px;
        }

        @media (max-width: 1600px) {
          width: 50px;
          height: 38px;
        }

        @media (max-width: 1200px) {
          width: 50px;
          height: 35px;
        }    
        
        @media (max-width: 900px) {
          width: 50px;
          height: 30px;
        }

        @media (max-width: 600px) {
          width: 50px;
          height: 30px;
        }
      }
    }

    a {
      color: #faede8;
      display: block;
      text-decoration: none;
      transition: color 0.2s;

      @media (min-width: 1801px) {
        font-size: 16px;
        margin-top: 24px;
      }

      @media (max-width: 1800px) {
        font-size: 16px;
        margin-top: 22px;
      }

      @media (max-width: 1600px) {
        font-size: 16px;
        margin-top: 20px;
      }

      @media (max-width: 1200px) {
        font-size: 16px;
        margin-top: 18px;
      }    
      
      @media (max-width: 900px) {
        font-size: 16px;
        margin-top: 18px;
      }

      @media (max-width: 600px) {
        font-size: 16px;
        margin-top: 16px;
      }

      &:hover {
        color: ${shade(0.2, "#f4ede8")};
      }
    }
  }

  > a {
    color: #4cd62b;
    display: block;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center;
    margin-top: 10px;

    @media (min-width: 1801px) {
      font-size: 16px;
    }

    @media (max-width: 1800px) {
      font-size: 16px;
    }

    @media (max-width: 1600px) {
      font-size: 15px;
    }

    @media (max-width: 1200px) {
      font-size: 14px;
    }    
    
    @media (max-width: 900px) {
      font-size: 14px;
    }

    @media (max-width: 600px) {
      font-size: 14px;
    }

    svg {
      margin-right: 12px;
    }

    &:hover {
      color: ${shade(0.2, "#4cd62b")};
    }
  }
`;


