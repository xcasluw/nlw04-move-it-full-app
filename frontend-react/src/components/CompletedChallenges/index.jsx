import React, { useContext } from "react";
import { ChallengesContext } from "../../hooks/challenges";
import { CompletedChallengesContainer } from "./styles";

const CompletedChallenges = () => {

  const { challengesCompleted } = useContext(ChallengesContext);

  return (
    <CompletedChallengesContainer>
      <span>Desafios Completos</span>
      <span>{challengesCompleted}</span>
    </CompletedChallengesContainer>
  )
}

export default CompletedChallenges;