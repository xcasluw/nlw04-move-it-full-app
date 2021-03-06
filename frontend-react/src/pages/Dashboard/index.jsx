import React, { useEffect } from "react";
import { Container, AnimationContainer } from "./styles";
import Aside from "../../components/Aside";
import ExperienceBar from "../../components/ExperienceBar";
import Countdown from "../../components/Countdown";
import Profile from "../../components/Profile";
import CompletedChallenges from "../../components/CompletedChallenges";
import ChallengeBox from "../../components/ChallengeBox";
import { useChallenges } from "../../hooks/challenges";

const Dashboard = () => {

  const { userExp } = useChallenges();

  useEffect(() => {
    userExp();
  }, [userExp]);

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
            <ChallengeBox />
          </div>
        </section>
      </Container>
    </AnimationContainer>
  );
};

export default Dashboard;
