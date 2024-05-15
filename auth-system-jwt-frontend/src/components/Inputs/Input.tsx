import { FC } from "react";
import { InputProps } from "../../types";

const Input: FC<InputProps> = ({ onChange, type, name, value }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      required
      className="w-full py-[6px] px-4 outline-none bg-[#070707] text-gray-100"
      onChange={onChange}
    />
  );
};

export default Input;
