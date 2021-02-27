import React from "react";
import { Container } from "./styles";

const Button = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? "Carregando..." : children}
  </Container>
);

export default Button;