import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type?: "submit" | "reset" | "button" | undefined;
  children: ReactNode;
  className?: string;
  width?: "w-fit" | "w-full";
}
const ButtonComponent = ({
  type,
  children,
  className,
  width = "w-full",
  ...res
}: IProps) => {
  return (
    <button
      type={type}
      className={`${className} ${width} text-center p-2 rounded-md text-white cursor-pointer`}
      {...res}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
