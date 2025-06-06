// hooks/useSocket.ts
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket(
  onNewProduct: (data: any) => void,
  onProductUpdate: (data: any) => void,
  onProductDelete: (data: any) => void
) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io("https://product-api-7chz.onrender.com/products", {
      transports: ["websocket"],
      forceNew: true,
      reconnection: true,
      timeout: 5000,
    });

    socket.on("connect", () => {
      console.log("🔌 Conectado ao WebSocket");
      console.log("Socket ID:", socket.id);
    });

    socket.on("connected", (data) => {
      console.log("✅ Confirmação do servidor:", data);
    });

    socket.on("productCreated", (data) => {
      console.log("📦 Novo produto via socket:", data);
      onNewProduct(data.product);
    });

    socket.on("productUpdated", (data) => {
      console.log("♻️ Produto atualizado via socket:", data);
      onProductUpdate(data.product);
    });

    socket.on("productDeleted", (data) => {
      console.log("🗑️ Produto Excluído via socket:", data);
      onProductDelete(data.productId);
    });

    socket.on("disconnect", (reason) => {
      console.log("🔌 Desconectado do WebSocket. Motivo:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("❌ Erro de conexão WebSocket:", error);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [onNewProduct, onProductUpdate]);

  return socketRef.current;
}