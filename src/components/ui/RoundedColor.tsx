interface IProps {
  color: string;
}
const RoundedColor = ({ color }: IProps) => {
  return (
    <span
      className={`w-5 h-5 bg-[${color}] rounded-full cursor-pointer`}
    ></span>
  );
};

export default RoundedColor;
