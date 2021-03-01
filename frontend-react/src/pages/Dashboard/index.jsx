import React from "react";
import { Container, AnimationContainer, Header } from "./styles";
import { useAuth } from "../../hooks/auth";
import ExperienceBar from "../../components/ExperienceBar";

const Dashboard = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <AnimationContainer>

        <ExperienceBar />

      </AnimationContainer>
    </Container>
  );
};

export default Dashboard;
