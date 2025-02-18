import { HTMLAttributes } from "react";

interface IProps extends HTMLAttributes<HTMLSpanElement> {
  color?: string;
  className?: string;
}
const CircleColor = ({ color, className, ...rest }: IProps) => {
  return (
    <span
      className={`${className} rounded-full  w-5 h-5 cursor-pointer`}
      style={{ backgroundColor: color }}
      {...rest}
    ></span>
  );
};

export default CircleColor;
