import React, { useRef, useCallback, useState } from "react";
import { Container, Content, AnimationContainer } from "./styles";

import { FiLogIn, FiMail, FiLock, FiUser } from "react-icons/fi";
import { Form } from "@unform/web";
import * as Yup from "yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import getValidationErrors from "../../utils/getValidationErrors";
import { Link, useHistory } from "react-router-dom";

import { useToast } from "../../hooks/toast";

import Loader from "react-loader-spinner";

import logoImg from "../../assets/logo-white.svg";
import api from "../../services/api";

const SignIn = () => {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string().required("Email obrigatório").email(),
          password: Yup.string().min(6, "Mínimo de 6 digitos"),
          confirmPassword: Yup.string()
            .min(6, "Digite a senha novamente")
            .required(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        setLoading(true);

        await api.post("/signup", data).then((res) => {
          if (res.status === 204) {
            history.push("/");

            addToast({
              type: "success",
              title: "Cadastro Realizado",
              description: "Você já pode fazer login no app",
            });
          } else {
            addToast({
              type: "error",
              title: "Erro no cadastro",
              description:
                "Ocorreu um erro ao fazer o cadastro. Tente novamente.",
            });
          }
        });

        setLoading(false);

      } catch (err) {

        setLoading(false);

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: "error",
          title: "Erro no cadastro",
          description: "Houve um erro ao tentar cadastrar. Tente novamente.",
        });
      }
    }, [addToast, history]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Logo" />

          <Form ref={formRef} onSubmit={handleSubmit}>

            <span>Bem-vindo</span>

            <div>
              <FiUser />
              <span>Crie sua conta</span>
            </div>

            <Input
              name="name"
              icon={FiUser}
              type="text"
              placeholder="Nome"
              disabled={loading}
            />
            <Input
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-mail"
              disabled={loading}
            />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
              disabled={loading}
            />
            <Input
              name="confirmPassword"
              icon={FiLock}
              type="password"
              placeholder="Confirmar Senha"
              disabled={loading}
            />
            <Button type="submit">
              {loading ? (
                <Loader
                  type="Bars"
                  color="#faede8"
                />
              ) : 'Cadastrar'}
            </Button>
          </Form>

          <Link to="/signin">
            <FiLogIn />
            Já tenho uma conta
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
}

export default SignIn;