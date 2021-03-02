import styled, { css } from "styled-components";
import { shade } from "polished";

export const AsideContainer = styled.aside`
  background-color: #fff;
  height: 100vh;
  width: 130px;

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

    svg {
      cursor: pointer;
      font-size: 34px;
      margin: 20px 0;

      &:nth-child(1) {
        ${(props) => props.page === "dashboard" && css`color: #535ED0;`}
      }

      &:nth-child(2) {
        ${(props) => props.page === "dashboard" && css`color: #666666;`}
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

