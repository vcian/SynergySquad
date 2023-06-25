import {
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { Image, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as React from "react";

import DbIcon from "../../assets/db-icon.png";
import { onLoginSubmit } from "./login.service";
import { useNavigate } from "react-router-dom";
import {
  getLocalStorageKey,
  setLocalStorageKey,
} from "../../utils/local-storage.service";

const LoginPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  React.useEffect(() => {
    if (getLocalStorageKey("session_id")) {
      navigate("/chat");
    }
  }, []);
  const loginForm = useFormik({
    initialValues: {
      host: "",
      database: "",
      user: "",
      password: "",
    },
    onSubmit: async (values) => {
      const loginResponse = await onLoginSubmit(values).catch((error) => {
        toast({
          status: "error",
          duration: 900,
          colorScheme: "red",
          variant: "solid",
          title: error.message,
        });
      });
      if (loginResponse && loginResponse.data) {
        setLocalStorageKey("session_id", loginResponse.data.session_id);
        navigate("/chat");
      }
    },
  });
  return (
    <section className="flex flex-col  items-center justify-center h-full">
      <div className="flex flex-col px-12 py-10 rounded-md bg-gray-100 text-black">
        <Image
          src={DbIcon}
          boxSize={50}
          alt="Database Icon"
          className="self-center mb-2"
        />
        <div className="mb-4">
          <Heading as="h2" className="text-center mb-5">
            Welcome
          </Heading>
          <p>Please enter your Databse Credentials</p>
        </div>
        <div className="flex flex-col gap-3">
          <InputGroup size="sm">
            <InputLeftAddon>{"mysql://"}</InputLeftAddon>
            <Input
              placeholder="Host"
              name="host"
              onChange={loginForm.handleChange}
              value={loginForm.values.host}
            />
          </InputGroup>
          <Input
            placeholder="User"
            name="user"
            onChange={loginForm.handleChange}
            value={loginForm.values.user}
          ></Input>
          <InputGroup>
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={loginForm.handleChange}
              value={loginForm.values.password}
            />
          </InputGroup>
          <Input
            type="text"
            placeholder="Database Name"
            name="database"
            onChange={loginForm.handleChange}
            value={loginForm.values.database}
          />
          <Button
            onClick={loginForm.handleSubmit}
            colorScheme="blue"
            className="bg-blue-700"
            variant="solid"
          >
            Login
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
