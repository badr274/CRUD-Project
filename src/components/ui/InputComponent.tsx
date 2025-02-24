/* eslint-disable @typescript-eslint/no-empty-object-type */
import { InputHTMLAttributes, memo } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}
const InputComponent = ({ ...rest }: IProps) => {
  return (
    <input
      {...rest}
      className="p-3 rounded-md shadow-md sm:text-sm border-2 border-gray-300 focus:outline-none
       focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
    />
  );
};

export default memo(InputComponent);
