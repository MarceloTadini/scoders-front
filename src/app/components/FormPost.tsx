import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormPostProps } from "../types";

const validationSchema = Yup.object({
  name: Yup.string().required("O nome é obrigatório"),
  category: Yup.string().required("A categoria é obrigatória"),
  description: Yup.string().max(150, "A descrição deve ter no máximo 150 caracteres").required("A descrição é obrigatória"),
  imageUrl: Yup.string(),
});

const FormPost: React.FC<FormPostProps> = ({ initialData, onSubmit }) => {
  const router = useRouter();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        {initialData ? "Editar Produto" : "Criar Novo Produto"}
      </h1>

      <Formik
        initialValues={{
          name: initialData?.name || "",
          category: initialData?.category || "",
          description: initialData?.description || "",
          imageUrl: initialData?.imageUrl || "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await onSubmit(values);
            router.push("/dashboard");
          } catch (error) {
            console.error("Erro ao salvar produto", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {[
              { label: "Nome do produto", name: "name", type: "text" },
              { label: "Categoria", name: "category", type: "text" },
              { label: "Descrição", name: "description", type: "text" },
              { label: "URL da Imagem", name: "imageUrl", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-sm font-semibold text-gray-700" htmlFor={name}>{label}</label>
                <Field
                  type={type}
                  name={name}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
                <ErrorMessage name={name} component="p" className="text-red-500 text-sm" />
              </div>
            ))}

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 text-white rounded-lg transition cursor-pointer ${isSubmitting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
              >
                {isSubmitting ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormPost;
