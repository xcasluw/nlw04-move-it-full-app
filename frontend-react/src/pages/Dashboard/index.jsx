import React from "react";
import { Container, AnimationContainer, Header } from "./styles";
import { useAuth } from "../../hooks/auth";

const Dashboard = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <AnimationContainer>
        <Header>
          <h1>Olá {user.name}</h1>
          <button type="button" onClick={signOut}>Sair</button>
        </Header>

      </AnimationContainer>
    </Container>
  );
};

export default Dashboard;
