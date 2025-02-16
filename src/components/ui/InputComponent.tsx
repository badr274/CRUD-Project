import { InputHTMLAttributes } from "react";
// import { IFormInput } from "../../interfaces";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IProps extends InputHTMLAttributes<HTMLInputElement> { }
const InputComponent = ({ ...rest }: IProps) => {
  return (
    <input

      className="border-[1px] border-gray-300 rounded-md p-3
       text-md shadow-md focus:outline-0 focus:border-indigo-500
        focus:ring-1 focus:ring-indigo-500"
      {...rest}
    />
  );
};

export default InputComponent;
