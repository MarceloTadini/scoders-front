import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, LogIn, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const Header: React.FC = () => {
    const router = useRouter();
    const {isAuthenticated, userName} = useAuth();

    const handleLogout = async () => {
        try {
            await axios.post("/api/logout");
            router.push('/');
            toast.success("Logout realizado com sucesso!");
        } catch (err) {
            console.error("Erro ao fazer logout", err);
        }
    };

    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg">
            <h1 className="text-2xl font-bold">Scoders Products</h1>
            {/* <Logo/> */}
            {isAuthenticated ? (
                <div className="flex items-center gap-4">
                    <User className="w-5 h-5" /> 
                    <span className="hidden md:flex items-center gap-2 text-lg">
                        Olá, {userName}!
                    </span>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg shadow-md transition duration-200 cursor-pointer"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            ) : (
                <Link
                    href="/"
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg shadow-md transition duration-200"
                >
                    <LogIn className="w-5 h-5" />
                    Login
                </Link>
            )}
        </header>
    );
};

export default Header;