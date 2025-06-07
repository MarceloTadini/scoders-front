import { useRouter } from "next/router"; 
import FormPost from "@/app/components/FormPost";
import { useAuth } from "@/app/context/AuthContext";
import { useProducts } from "@/app/context/ProductsContext";
import { IProduct } from "@/app/types";
import { toast } from "react-toastify";
import api from "@/lib/api";

export default function EditPostPage() {
  const router = useRouter();
  const { id: productId } = router.query; 
  const {accessToken, isAuthenticated} = useAuth();
  const {loading, products} = useProducts();

  const handleUpdatePost = async (updatedData: IProduct) => {

    try {
      await api.put(`/product/${productId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      toast.success("Produto editado com sucesso!"); 
    
    } catch (err) {
      console.error("Erro ao editar produto", err);
      toast.error("Erro ao editar produto, tente novamente!");
    }

  };

  if (loading) return <p className="text-center">Carregando...</p>;
  if (!isAuthenticated) return <p className="text-center mt-10">Necessário fazer o Login para editar um produto</p>;

  const product = productId ? products.find((product) => product._id === productId) : null;

  return product ? <FormPost initialData={product} onSubmit={handleUpdatePost} /> : <p className="text-center">Produto não encontrado.</p>;
}
