import { AppProps } from "next/app";
import '../app/globals.css';
import Header from "@/app/components/Header";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { useRouter } from "next/router";
import { ProductsProvider } from "@/app/context/ProductsContext";
import { AuthProvider } from "@/app/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Pages({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const hideHeader = router.pathname === "/register"; // Esconde na página de registro

  return (
    <ProductsProvider>
      <AuthProvider>
        {!hideHeader && <Header />}
        {!hideHeader && <Breadcrumbs />}
        <Component {...pageProps} />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </AuthProvider>
    </ProductsProvider>
  );
}

export default Pages;
