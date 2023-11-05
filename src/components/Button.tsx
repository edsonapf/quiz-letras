interface ButtonProps extends React.ComponentProps<"button"> {
  fullwidth?: boolean;
  isCorrectAnswer?: boolean;
  isWrongAnswer?: boolean;
}

export default function Button({
  fullwidth,
  isCorrectAnswer,
  isWrongAnswer,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`bg-gray-100 rounded text-black py-1 px-4 font-medium hover:bg-gray-300 disabled:opacity-50 disabled:hover:bg-gray-100 ${
        fullwidth ? "w-full" : ""
      } ${
        isCorrectAnswer
          ? "bg-green-500 border-2 border-green-800 disabled:hover:bg-green-500"
          : ""
      } ${
        isWrongAnswer
          ? "bg-red-400 border-2 border-red-800 disabled:hover:bg-red-400"
          : ""
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}
