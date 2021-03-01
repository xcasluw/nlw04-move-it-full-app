import { createContext, useEffect, useState } from "react";
import LevelUpModal from "../components/LevelUpModal";
import api from "../services/api";
import { useAuth } from "./auth";

export const ChallengesContext = createContext({});

export function ChallengesProvider({ children }) {

  const { user } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    api.get("challenges").then((res) => {
      if (Array.isArray(res.data) && res.data.length) {
        setChallenges(res.data);
      }
    })
  }, []);

  useEffect(() => {
    if (user) {
      setLevel(user.level);
      setCurrentExperience(user.currentExperience);
      setChallengesCompleted(user.challengesCompleted);
    }
  }, [user]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`,
        silent: true
      });
      new Audio('/notification.mp3').play();
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengesContext.Provider value={{ level, currentExperience, challengesCompleted, levelUp, startNewChallenge, activeChallenge, resetChallenge, experienceToNextLevel, completeChallenge, closeLevelUpModal }}>
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}

    </ChallengesContext.Provider>
  )
}