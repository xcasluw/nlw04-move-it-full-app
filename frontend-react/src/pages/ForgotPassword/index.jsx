import React, { useRef, useState, useCallback } from "react";
import { Container, Content, AnimationContainer } from "./styles";

import { FiLogIn, FiMail, FiUser } from "react-icons/fi";
import { Form } from "@unform/web";
import * as Yup from "yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import getValidationErrors from "../../utils/getValidationErrors";
import { Link } from "react-router-dom";
import { useToast } from "../../hooks/toast";
import Loader from "react-loader-spinner";
import logoImg from "../../assets/logo-white.svg";

import api from "../../services/api";

const ForgotPassword = () => {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string().required("Email obrigatório").email(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      setLoading(true);

      await api
        .post("/password/forgot", {
          email: data.email,
        })
        .then((res) => {
          if (res.status === 201) {
            addToast({
              type: "success",
              title: "E-mail de recuperação enviado",
              description: res.data.msg,
            });
          } else {
            throw new Error();
          }
        })
        .catch((err) => {
          throw new Error();
        });

    } catch (err) {

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }

      if (!err.response) {
        addToast({
          type: "error",
          title: "Erro de servidor",
          description: "Houve um erro. Por favor, tente novamente",
        });
        return;
      }

      addToast({
        type: "error",
        title: "Erro ao enviar email",
        description: "Houve um erro ao tentar enviar o email de recuperação. Tente novamente."
      });

    } finally {
      setLoading(false);
    }
  }, [addToast]);

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
              name="email"
              icon={FiMail}
              type="text"
              placeholder="E-mail"
              disabled={loading}
            />

            <Button type="submit">
              {loading ? (
                <Loader
                  type="Bars"
                  color="#faede8"
                />
              ) : 'Enviar'}
            </Button>

            <Link to="/signin">Voltar para login</Link>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default ForgotPassword;