// import { useContext } from "react";
// import { ChallengesContext } from "../../hooks/challenges";
import { Header } from "./styles";

const ExperienceBar = () => {
  // const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);
  const currentExperience = 0;
  const experienceToNextLevel = 0;
  const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;

  return (
    <Header>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${percentToNextLevel}%` }} />

        <span className="currentExperience" style={{ left: `${percentToNextLevel}%` }}>
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </Header>
  )
}

export default ExperienceBar;