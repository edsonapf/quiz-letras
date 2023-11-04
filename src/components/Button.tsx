interface ButtonProps extends React.ComponentProps<"button"> {
  fullwidth?: boolean;
}

export default function Button({ fullwidth, children, ...rest }: ButtonProps) {
  return (
    <button
      className={`bg-gray-100 rounded text-black py-1 px-4 font-medium hover:bg-gray-300 ${
        fullwidth ? "w-full" : ""
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}
