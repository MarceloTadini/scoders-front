export interface IProduct{
  _id?: string;
  name: string;
  category: string;
  description: string;
  imageUrl: string;
}

export interface IFormRegisterUser{
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IErrorInputTextProps {
  children?: React.ReactNode;
}

export interface FormPostProps {
  initialData?: IProduct;
  onSubmit: (postData: IProduct) => Promise<void>;
}

export interface ProductsContextType {
  products: IProduct[];
  fetchProducts: () => Promise<void>;
  loading: boolean;
  error: boolean;
  setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
  userName?: string | null;
}

export interface DecodedToken {
  email: string;
  sub: string;
  role: "admin" | "user";
  name: string;
  iat: number;
  exp: number;
}

export interface ProductSocketEvents {
  productCreated: {
    product: IProduct;
    timestamp: string;
    message: string;
  };
  productUpdated: {
    product: IProduct;
    timestamp: string;
    message: string;
  };
  productDeleted: {
    productId: string;
    timestamp: string;
    message: string;
  };
}
