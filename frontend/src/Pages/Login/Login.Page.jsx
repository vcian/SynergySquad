import {
  Button,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { useFormik } from "formik";
import * as React from "react";

import DbIcon from "../../assets/db-icon.png";
import { onLoginSubmit } from "./login.service";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const loginForm = useFormik({
    initialValues: {
      host: "",
      database: "",
      user: "",
      password: "",
    },
    onSubmit: async (values) => {
      const loginResponse = await onLoginSubmit(values);
      debugger;
      if (loginResponse && loginResponse.data) {
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
