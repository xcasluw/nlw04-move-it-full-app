import React from "react";
import { Container, AnimationContainer } from "./styles";
import Aside from "../../components/Aside";
import ExperienceBar from "../../components/ExperienceBar";
import Countdown from "../../components/Countdown";
import Profile from "../../components/Profile";
import CompletedChallenges from "../../components/CompletedChallenges";

const Dashboard = () => {

  return (
    <AnimationContainer>
      <Aside page="dashboard" />
      <Container>
        <ExperienceBar />
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
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
