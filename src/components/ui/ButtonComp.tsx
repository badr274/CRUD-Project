import { ButtonHTMLAttributes, memo, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: "button" | "submit" | "reset";
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit" | "auto";
}

const ButtonComp = ({
  type,
  children,
  className,
  width = "w-full",
  ...rest
}: IProps) => {
  return (
    <button
      type={type}
      {...rest}
      className={`${className} ${width} font-semibold text-white rounded-md text-center p-2 flex-1 cursor-pointer`}
    >
      {children}
    </button>
  );
};

export default memo(ButtonComp);
