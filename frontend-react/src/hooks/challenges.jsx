import { createContext, useEffect, useState, useCallback } from "react";
import LevelUpModal from "../components/LevelUpModal";
import api from "../services/api";
import { useToast } from "./toast";

export const ChallengesContext = createContext({});

export function ChallengesProvider({ children }) {

  const [challenges, setChallenges] = useState([]);
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const { addToast } = useToast();

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
    api.get("user-exp").then((res) => {
      setLevel(res.data.level);
      setCurrentExperience(res.data.current_experience);
      setChallengesCompleted(res.data.challenges_completed);
    });
  }, []);

  const levelUp = useCallback(() => {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }, [level]);

  const closeLevelUpModal = useCallback(() => {
    setIsLevelUpModalOpen(false);
  }, []);

  const startNewChallenge = useCallback(() => {
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
  }, [challenges]);

  const resetChallenge = useCallback(() => {
    setActiveChallenge(null);
  }, []);

  const completeChallenge = useCallback(
    async () => {

      if (!activeChallenge) {
        return;
      }

      const { amount } = activeChallenge;

      let finalExperience = currentExperience + amount;
      let levelDB = level;
      let willUp = false;

      if (finalExperience >= experienceToNextLevel) {
        finalExperience = finalExperience - experienceToNextLevel;
        levelDB = levelDB + 1;

        // Variável de controle para não abrir o modal de levelup caso o usuário fosse upar e a requisição para a api falhar
        willUp = true;
      }

      const userData = {
        level: levelDB,
        current_experience: finalExperience,
        challenges_completed: challengesCompleted + 1
      }

      await api
        .put("/increase-exp", userData)
        .then((res) => {

        })
        .catch((err) => {
          addToast({
            type: "error",
            title: "Houve um erro",
            description: "Houve um erro ao tentar armazenar suas informações"
          });
          return;
        });

      if (willUp) {
        levelUp();
      }

      setCurrentExperience(finalExperience);
      setActiveChallenge(null);
      setChallengesCompleted(challengesCompleted + 1);
    }, [activeChallenge, challengesCompleted, currentExperience, experienceToNextLevel, addToast, level, levelUp]);

  return (
    <ChallengesContext.Provider value={{ level, currentExperience, challengesCompleted, levelUp, startNewChallenge, activeChallenge, resetChallenge, experienceToNextLevel, completeChallenge, closeLevelUpModal }}>
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}

    </ChallengesContext.Provider>
  )
}