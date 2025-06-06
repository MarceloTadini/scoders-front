import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import * as Yup from "yup";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import ErrorInputText from "@/app/components/ErrorInputText";
import { IFormRegisterUser } from "@/app/types";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "O nome deve possuir pelo menos 3 caracteres")
    .required("Por favor, informe o seu nome"),
  email: Yup.string()
    .email("Por favor, informe um e-mail válido")
    .required("Por favor, informe o seu email"),
  role: Yup.string()
    .required("Por favor, informe o seu cargo"),
  password: Yup.string()
    .min(8, "A senha deve possuir pelo menos 8 caracteres")
    .required("Por favor, informe sua senha"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "As senhas devem ser iguais!")
    .required("Confirme sua senha!"),
});

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const createUser = async (
    values: IFormRegisterUser,
    { resetForm }: { resetForm: () => void }
  ) => {
    const { confirmPassword, ...user } = values; // Remove confirmPassword antes de enviar
    setLoading(true);
    setError("");
  
    try {
      await axios.post("https://product-api-7chz.onrender.com/auth/register", user);
      toast.success("Usuário cadastrado com sucesso!"); 
      resetForm();
      router.push("/");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Erro ao cadastrar usuário!");
      } else {
        setError("Erro ao cadastrar usuário!");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-br from-green-500 to-teal-600 p-6">
      {/* Seção informativa */}
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Crie sua Conta</h1>
        <p className="text-lg text-gray-200 max-w-lg mx-auto">
          Junte-se a nós e confira a mudança no estoque de produtos em tempo real!
        </p>
      </section>

      {/* Formulário */}
      <Formik
        initialValues={{name: "", email: "", password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={createUser}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="flex flex-col w-[90vw] sm:w-[400px] bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">Cadastro</h2>

            {/* Campo Nome */}
            <fieldset>
              <label className="text-sm text-gray-700 mb-1">Nome</label>
              <Field
                className="text-lg bg-gray-100 border border-gray-300 rounded-lg p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                name="name"
                type="text"
              />
              <ErrorMessage name="name" component={ErrorInputText} />
            </fieldset>

            {/* Campo Email */}
            <fieldset>
              <label className="text-sm text-gray-700 mb-1">E-mail</label>
              <Field
                className="text-lg bg-gray-100 border border-gray-300 rounded-lg p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                name="email"
                type="email"
              />
              <ErrorMessage name="email" component={ErrorInputText} />
            </fieldset>

            {/* Campo Role */}
            <fieldset>
              <label className="text-sm text-gray-700 mb-1">Cargo</label>
              <Field
                as="select"
                name="role"
                className="text-lg bg-gray-100 border border-gray-300 rounded-lg p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="">Selecione um cargo</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Field>
              <ErrorMessage name="role" component={ErrorInputText} />
            </fieldset>

            {/* Campo Senha */}
            <fieldset>
              <label className="text-sm text-gray-700 mb-1">Senha</label>
              <Field
                className="text-lg bg-gray-100 border border-gray-300 rounded-lg p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                name="password"
                type="password"
              />
              <ErrorMessage name="password" component={ErrorInputText} />
            </fieldset>

            {/* Campo Confirmar Senha */}
            <fieldset>
              <label className="text-sm text-gray-700 mb-1">Confirme sua senha</label>
              <Field
                className="text-lg bg-gray-100 border border-gray-300 rounded-lg p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-green-400"
                name="confirmPassword"
                type="password"
              />
              <ErrorMessage name="confirmPassword" component={ErrorInputText} />
            </fieldset>

            {error && <p className="text-red-500 text-center text-sm mb-3">{error}</p>}

            {/* Botão de Envio */}
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={`w-full p-2 text-white rounded-lg cursor-pointer transition ${
                isSubmitting || !isValid ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isSubmitting ? "Enviando..." : "Cadastrar"}
            </button>
          </Form>
        )}
      </Formik>

      {/* Link para login */}
      <p className="text-center text-sm text-gray-700 mt-4">
        Já tem uma conta?{" "}
        <Link href="/" className="text-white hover:bg-green-700 rounded-lg p-2 bg-green-500 transition">
          Faça login aqui
        </Link>
      </p>
    </main>
  );
}
