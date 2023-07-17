const Button = ({ children, styles }) => {
  return (
    <button
      className={`
        bg-[#2D5BFF]
        rounded-[8px]
        px-[32px]
        py-[12px]
        text-white
        ${styles}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
