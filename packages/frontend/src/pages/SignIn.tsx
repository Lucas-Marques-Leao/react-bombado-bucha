import {
  Button,
  Checkbox,
  Label,
  TextInput,
  DarkThemeToggle,
} from "flowbite-react";
import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../contexts/AuthContext";

const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email("O Campo precisa ser um email")
    .required("O Campo é obrigatório"),
  password: Yup.string()
    .min(8, "O numero necessário de caracters para a senha é de 8")
    .required("O Campo é obrigatório"),
});

interface SignInData {
  email: string;
  password: string;
}

const signInInitialValues: SignInData = {
  email: "",
  password: "",
};

const SignIn: React.FC = () => {
  const { login } = useAuth();

  const handleSubmit = async (values: SignInData) => {
    await login(values.email, values.password);
  };

  const formik = useFormik({
    validationSchema: signInSchema,
    initialValues: signInInitialValues,
    onSubmit: handleSubmit,
  });

  return (
    <div className="dark:bg-gray-800">
      <div className="container p-12">
        <div className="flex justify-center">
          <DarkThemeToggle />
        </div>
        <h1 className="text-xl dark:text-white pb-6">Sign in</h1>

        <form className="flex flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Your email" />
            </div>
            <TextInput
              id="email"
              type="email"
              name="email"
              onChange={formik.handleChange}
              placeholder="name@flowbite.com"
              required={true}
              color={
                formik.touched.email && formik.errors.email ? "red" : "base"
              }
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password" value="Your password" />
            </div>
            <TextInput
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              required={true}
              color={
                formik.touched.password && formik.errors.password
                  ? "red"
                  : "base"
              }
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
          </div>
          <Link
            className="text-right text-blue-700 hover:underline"
            to="/sign-up"
          >
            Don't have an account? Create one
          </Link>
          <Button
            type="button"
            disabled={formik.submitCount >= 0 ? !formik.isValid : true}
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
