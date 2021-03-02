import React, { useContext } from "react";
import { ChallengesContext } from "../../hooks/challenges";
import { ProfileContainer } from "./styles";
import iconLevel from "../../assets/icons/level.svg"

const Profile = () => {

  const { level } = useContext(ChallengesContext);

  return (
    <ProfileContainer>
      <img src="https://github.com/xcasluw.png" alt="Lucas Genari" />
      <div>
        <strong>Lucas Genari</strong>
        <p>
          <img src={iconLevel} alt="Level" />
          Level {level}
        </p>
      </div>
    </ProfileContainer>
  )
}

export default Profile;