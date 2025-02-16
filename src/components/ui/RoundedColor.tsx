import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  className: string;
}
const RoundedColor = ({ className, ...rest }: IProps) => {
  return (
    <span className={`${className} w-5 h-5 rounded-full cursor-pointer`} {...rest}></span>
  );
};

export default RoundedColor;
