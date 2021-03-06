import styled from "styled-components";
import { shade } from "polished";

export const AsideContainer = styled.aside`
   background-image: linear-gradient(45.34deg, #edeef0 5.66%, #ffffff 44.35%);
  height: 100vh;
  width: 110px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  img {
    position: absolute;
    top: 10px;
    width: 50px;
  }

  div {

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    a {

      svg {
        cursor: pointer;
        font-size: 34px;
        margin: 20px 0;
      }

    }

  }

  button {
    position: absolute;
    bottom: 20px;
    border: 0;
    outline: 0;
    background: transparent;
    transition: all .3s;

    svg {
      font-size: 34px;
      color: #4cd62b;
    }

    &:hover {
      transform: scale(1.08);
      color: ${shade(0.1, "#4cd62b")};
    }
  }

  
`;

