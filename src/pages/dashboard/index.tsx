// pages/index.tsx
import { useRouter } from "next/router";
import { FilePenLineIcon, Trash2Icon, PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "react-toastify";
import { useMemo } from "react";
import { IProduct } from "@/app/types";
import { useProducts } from "@/app/context/ProductsContext";

export default function DashboardProdutos() {
  const router = useRouter();
  const { products, loading, error, fetchProducts } = useProducts();
  const { accessToken, isAuthenticated } = useAuth();

  async function handleRemove(id: string) {
    try {
      const isConfirmed = window.confirm("Tem certeza de que deseja remover este produto?");
      if (!isConfirmed) return;

      if (!isAuthenticated) {
        alert("Você precisa estar logado para remover um produto.");
        return;
      }

      await axios.delete(`https://product-api-7chz.onrender.com/product/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      //fetchProducts();
      toast.success("Produto removido com sucesso!");
    } catch (err) {
      console.error("Erro ao remover produto:", err);
      toast.error("Erro ao remover produto, tente novamente!");
    }
  }

  // Agrupar produtos por categoria
  const categorias = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  return (
    <div className="w-11/12 max-w-7xl mx-auto py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard de Produtos</h1>
        {isAuthenticated && (
          <Link href="/dashboard/new" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-md">
            <PlusCircleIcon className="w-5 h-5" />
            Cadastrar Produto
          </Link>
        )}
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-sm font-extrabold text-gray-700">Total de Produtos</h2>
          <p className="text-3xl font-bold text-blue-600">{products.length}</p>
        </div>
        {Object.entries(categorias).map(([categoria, quantidade]) => (
          <div key={categoria} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-sm font-bold text-gray-500">Categoria: {categoria}</h2>
            <p className="text-2xl font-semibold text-gray-800">{quantidade}</p>
          </div>
        ))}
      </div>

      {/* Tabela de Produtos */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagem</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
              {isAuthenticated && <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Ações</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product: IProduct) => (
              <tr key={product._id}>
                <td className="px-6 py-4">
                  <Image
                    src={product.imageUrl || "/images/default-image.png"}
                    alt={product.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{product.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{product.description}</td>
                {isAuthenticated && (
                  <td className="px-6 py-4 flex gap-2 justify-center">
                    <button className="hover:cursor-pointer" onClick={() => router.push(`/dashboard/edit/${product._id}`)}>
                      <FilePenLineIcon className="text-blue-600 hover:text-blue-800" />
                    </button>
                    <button className="hover:cursor-pointer" onClick={() => product._id && handleRemove(product._id)}>
                      <Trash2Icon className="text-red-600 hover:text-red-800" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Loading e Error States */}
      {loading && <p className="text-center mt-6">Carregando produtos...</p>}
      {error && <p className="text-center text-red-500 mt-6">Erro ao carregar produtos.</p>}
    </div>
  );
}
