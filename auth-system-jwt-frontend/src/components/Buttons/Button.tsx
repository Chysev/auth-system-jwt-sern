import { ButtonProps } from "../../types";

const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#2a2a2a] hover:cursor-pointer hover:opacity-[0.8] w-full outline-none py-2 px-4 rounded-lg text-gray-100"
    >
      {children}
    </button>
  );
};

export default Button;
