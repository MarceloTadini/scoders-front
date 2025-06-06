import { IErrorInputTextProps } from "../types";

const ErrorInputText: React.FC<IErrorInputTextProps> = ({ children }) => {
    return children ? <p className="text-red-500 text-sm mt-1">{children}</p> : null;
}

export default ErrorInputText;