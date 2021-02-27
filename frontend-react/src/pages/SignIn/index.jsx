import React, { useRef, useCallback, useState } from "react";
import { Container, Content, AnimationContainer } from "./styles";

import { FiLogIn, FiMail, FiLock, FiUser } from "react-icons/fi";
import { Form } from "@unform/web";
import * as Yup from "yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import getValidationErrors from "../../utils/getValidationErrors";
import { Link, useHistory } from "react-router-dom";

import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";

import Loader from "react-loader-spinner";

import logoImg from "../../assets/logo-white.svg";

const SignIn = () => {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required("Email obrigatório").email(),
        password: Yup.string().required("Senha obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      setLoading(true);

      await signIn({
        email: data.email,
        password: data.password,
      });

      setTimeout(() => {
        setLoading(false);
        history.push("/dashboard");
      }, 2000);

    } catch (err) {

      setLoading(false);

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      if (!err.response) {
        addToast({
          type: "error",
          title: "Erro de servidor",
          description: "O servidor se encontra offline. Favor comunicar o administrador",
        });
        return;
      }

      addToast({
        type: "error",
        title: "Erro na autenticação",
        description: err.response.data,
      });
    }
  }, [addToast, history, signIn]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Logo" />

          <Form ref={formRef} onSubmit={handleSubmit}>

            <span>Bem-vindo</span>

            <div>
              <FiUser />
              <span>Faça login para começar</span>
            </div>

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
            <Button type="submit">
              {loading ? (
                <Loader
                  type="Bars"
                  color="#faede8"
                />
              ) : 'Entrar'}
            </Button>

            <Link to="/forgot-password">Esqueci minha senha</Link>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
}

export default SignIn;