import React from "react";
import { Container, AnimationContainer, Header } from "./styles";
import { useAuth } from "../../hooks/auth";
import Aside from "../../components/Aside";
import ExperienceBar from "../../components/ExperienceBar";

const Dashboard = () => {
  const { signOut, user } = useAuth();

  return (
    <AnimationContainer>
      <Aside />
      <Container>
        <ExperienceBar />
      </Container>
    </AnimationContainer>
  );
};

export default Dashboard;
