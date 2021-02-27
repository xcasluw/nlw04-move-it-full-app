import styled, { css } from "styled-components";
import { shade } from "polished";
import Tooltip from "../Tooltip";

export const Container = styled.div`
  background-image: linear-gradient(to right, #4953B9, #5561D7);
  border-radius: 10px;
  border: 1px solid linear-gradient(to right, #4953B9, #5561D7);
  padding: 16px;
  width: 100%;
  display: flex;
  align-items: center;
  color: #faede8;

  @media (min-width: 1801px) {
    height: 56px;
  }

  @media (max-width: 1800px) {
    height: 56px;
  }

  @media (max-width: 1600px) {
    height: 56px;
  }

  @media (max-width: 1200px) {
    height: 56px;
  }    
  
  @media (max-width: 900px) {
    height: 56px;
  }

  @media (max-width: 600px) {
    height: 24px;
  }

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}



  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #faede8;

    &::placeholder {
      color: ${shade(0.3, "#faede8")};
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
