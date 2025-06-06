"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import * as Yup from "yup";
import ErrorInputText from "./components/ErrorInputText";
import { ErrorMessage, Field, Form, Formik } from "formik";
import axios from "axios";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Por favor, informe um e-mail válido")
    .required("Por favor, informe o seu email"),
  password: Yup.string()
    .required("Por favor, informe sua senha"),
});

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (
    values: { email: string; password: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    setLoading(true);
    setError("");

    try {
      await axios.post("/api/login", values);
      resetForm();
      router.push("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Erro ao fazer login");
      } else {
        setError("Erro ao fazer login");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-br from-blue-500 to-indigo-600 p-6">
      {/* Seção informativa */}
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Bem-vindo ao Scoders Products</h1>
        <p className="text-lg text-gray-200 max-w-lg mx-auto">
          Tenha um controle em tempo real e administre todos os seu produtos! Faça login para acessar e compartilhar seus próprios produtos.
        </p>
      </section>

      {/* Formulário */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="flex flex-col w-[90vw] sm:w-[400px] bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">Login</h2>

            {/* Campo Email */}
            <fieldset>
              <label className="text-sm text-gray-700 mb-1">E-mail</label>
              <Field
                className="text-lg bg-gray-100 border border-gray-300 rounded-lg p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="email"
                type="email"
              />
              <ErrorMessage name="email" component={ErrorInputText} />
            </fieldset>

            {/* Campo Senha */}
            <fieldset>
              <label className="text-sm text-gray-700 mb-1">Senha</label>
              <Field
                className="text-lg bg-gray-100 border border-gray-300 rounded-lg p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                name="password"
                type="password"
              />
              <ErrorMessage name="password" component={ErrorInputText} />
            </fieldset>

            {error && <p className="text-red-500 text-center text-sm mb-3">{error}</p>}

            {/* Botão de Envio */}
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={`w-full p-2 text-white rounded-lg transition cursor-pointer ${isSubmitting || !isValid ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
                }`}
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </Form>
        )}
      </Formik>

      <p className="text-center text-sm text-gray-200 mt-4">
        Não tem uma conta?{" "}
        <Link href="/register" className="text-white hover:bg-blue-700 rounded-lg p-2 bg-blue-500">
          Cadastre-se aqui
        </Link>
      </p>

      <div className="mt-6 text-center">
        <p className="text-gray-200 text-sm">Caso não seja um admin, acesse o blog diretamente.</p>
        <Link
          href="/dashboard"
          className="mt-2 inline-block cursor-pointer bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Acessar Dashboard
        </Link>
      </div>

    </main>
  );
}
