import { InputHTMLAttributes } from "react";
// import { IFormInput } from "../../interfaces";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  type: string;
}
const InputComponent = ({ id, type, name, ...res }: IProps) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      className="border-2 border-gray-300 focus:outline-0 rounded-md p-2"
      {...res}
    />
  );
};

export default InputComponent;
