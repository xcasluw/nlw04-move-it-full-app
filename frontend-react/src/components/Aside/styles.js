import styled from "styled-components";

export const AsideContainer = styled.aside`
  background-color: #fff;
  height: 100vh;
  width: 85px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;

  img {
    position: absolute;
    top: 10px;
  }

  div {

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    svg {
      cursor: pointer;
      font-size: 25px;
      margin: 20px 0;
    }
  }

  button {
    position: absolute;
    bottom: 10px;
    border: 0;
    outline: 0;
    background: transparent;
    transition: scale, background-color .2s;

    svg {
      font-size: 24px;
      color: #4cd62b;
    }

    &:hover {
      transform: scale(1.08);
      border-radius: 50%;
      background-color: #f2f3f5;
    }
  }

  
`;

