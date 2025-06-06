import axios from "axios";
import FormPost from "@/app/components/FormPost";
import { IProduct } from "@/app/types";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "react-toastify";
import { useProducts } from "@/app/context/ProductsContext";

export default function NewPostPage() {
  const {accessToken, isAuthenticated} = useAuth();

  const handleCreatePost = async (postData: IProduct) => {
    try {
      await axios.post("https://product-api-7chz.onrender.com/product", postData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast.success("Product adicionado com sucesso!"); 
      
    } catch (err) {
      console.error("Erro ao adicionar product", err);
      toast.error("Erro ao adicionar product, tente novamente!");
    }
  };

  if (!isAuthenticated) return <p className="text-center mt-10">Necessário fazer o Login para cadastrar um novo Product</p>;

  return <FormPost onSubmit={handleCreatePost} />;
}
