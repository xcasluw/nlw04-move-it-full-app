import React from "react";
import { Container, AnimationContainer } from "./styles";
import Aside from "../../components/Aside";

const Leaderboard = () => {
  return (
    <AnimationContainer>
      <Aside page="leaderboard" />
      <Container>
        <h1>Leaderboard</h1>

        <table>
          <thead>
            <tr>
              <th>POSIÇÃO</th>
              <th>USUÁRIO</th>
              <th>DESAFIOS</th>
              <th>EXPERIÊNCIA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Lucas</td>
              <td>127 completados</td>
              <td>154000 xp</td>
            </tr>
          </tbody>
        </table>
      </Container>
    </AnimationContainer>
  );
}

export default Leaderboard;