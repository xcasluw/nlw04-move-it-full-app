import React, { useRef, useCallback, useState } from "react";
import { FiLock, FiUser, FiLogIn } from "react-icons/fi";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { useHistory, useLocation, Link } from "react-router-dom";

import { useToast } from "../../hooks/toast";

import getValidationErrors from "../../utils/getValidationErrors";
import Loader from "react-loader-spinner";
import logoImg from "../../assets/logo-white.svg";

import { Container, Content, AnimationContainer } from "./styles";
import Input from "../../components/Input";
import Button from "../../components/Button";
import api from "../../services/api";


const ResetPassword = () => {
  const formRef = useRef(null);

  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required("Senha obrigatória"),
          confirm_password: Yup.string().oneOf(
            [Yup.ref("password"), ""],
            "As senhas não conferem"
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const tokenUrl = location.search.replace("?token=", "");

        if (!tokenUrl) {
          throw new Error();
        }

        setLoading(true);

        await api
          .post("/password/reset", {
            password: data.password,
            confirm_password: data.password,
            reset_password: tokenUrl,
          })
          .then((res) => {
            if (res.status === 201) {
              addToast({
                type: "success",
                title: "Senha Resetada",
                description: res.data.msg,
              });
            } else {
              throw new Error();
            }
          })
          .catch((err) => {
            throw new Error();
          });

        history.push("/signin");

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: "error",
          title: "Erro ao resetar senha",
          description: "Houve um erro ao alterar a senha. Tente novamente.",
        });

      } finally {
        setLoading(false);
      }
    },
    [addToast, history, location]
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Move It" />

          <Form ref={formRef} onSubmit={handleSubmit}>

            <span>Recuperação de senha</span>

            <div>
              <FiUser />
              <span>Digite seu email</span>
            </div>

            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Nova Senha"
            />

            <Input
              name="confirm_password"
              icon={FiLock}
              type="password"
              placeholder="Confirmar Senha"
            />

            <Button type="submit">
              {loading ? (
                <Loader
                  type="Bars"
                  color="#faede8"
                />
              ) : 'Enviar'}
            </Button>

            <Link to="/forgot-password">Voltar para home</Link>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};
export default ResetPassword;
