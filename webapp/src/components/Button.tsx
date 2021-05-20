type ButtonProps = {
  label: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  function handleClick(): void {
    if (props.onClick) {
      props.onClick();
    }
  }

  return (
    <button type="button" onClick={handleClick} className="w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      {props.label}
    </button>
  );
};

export default Button;
