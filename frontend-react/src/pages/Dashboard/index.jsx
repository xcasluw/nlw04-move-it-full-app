import React from "react";
import { Container, AnimationContainer, Header } from "./styles";
import { useAuth } from "../../hooks/auth";
import Aside from "../../components/Aside";
import ExperienceBar from "../../components/ExperienceBar";
import Countdown from "../../components/Countdown";
import Profile from "../../components/Profile";

const Dashboard = () => {
  const { signOut, user } = useAuth();

  return (
    <AnimationContainer>
      <Aside page="dashboard" />
      <Container>
        <ExperienceBar />
        <section>
          <div>
            <Profile />
            <Countdown />
          </div>
          <div>

          </div>
        </section>
      </Container>
    </AnimationContainer>
  );
};

export default Dashboard;
