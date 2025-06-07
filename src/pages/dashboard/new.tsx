import axios from "axios";
import FormPost from "@/app/components/FormPost";
import { IProduct } from "@/app/types";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "react-toastify";
import api from "@/lib/api";

export default function NewPostPage() {
  const {accessToken, isAuthenticated} = useAuth();

  const handleCreatePost = async (postData: IProduct) => {
    try {
      await api.post("/product", postData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      toast.success("Produto adicionado com sucesso!"); 
      
    } catch (err) {
      console.error("Erro ao adicionar product", err);
      toast.error("Erro ao adicionar product, tente novamente!");
    }
  };

  if (!isAuthenticated) return <p className="text-center mt-10">Necessário fazer o Login para cadastrar um novo Product</p>;

  return <FormPost onSubmit={handleCreatePost} />;
}
