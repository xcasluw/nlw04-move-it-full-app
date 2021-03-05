import React from "react";
import { Container, AnimationContainer } from "./styles";
import Aside from "../../components/Aside";

const Leaderboard = () => {
  return (
    <AnimationContainer>
      <Aside page="leaderboard" />
      <Container>
        <p>Leaderboard</p>
      </Container>
    </AnimationContainer>
  );
}

export default Leaderboard;