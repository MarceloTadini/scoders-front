// context/ProductsContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { IProduct, ProductsContextType } from "@/app/types";
import { useSocket } from "@/app/hooks/useSocket";

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://product-api-7chz.onrender.com/product");
      setProducts(response.data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ⬇️ Hook de WebSocket: novo produto ou atualização
  useSocket(
    (newProduct: IProduct) => {
      setProducts((prev) => {
        const isCreated = prev.some((p) => p._id === newProduct._id);
        return isCreated ? prev : [newProduct, ...prev];
      });
    },
    (updatedProduct: IProduct) => {
      setProducts((prev) =>
        prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
      );
    },
    (deletedProductId: string) => {
      setProducts((prev) => prev.filter((p) => p._id !== deletedProductId));
    }
  );

  return (
    <ProductsContext.Provider value={{ products, loading, error, setProducts, fetchProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts deve ser usado dentro de um ProductsProvider");
  }
  return context;
};
