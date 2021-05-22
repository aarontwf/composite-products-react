import React from "react";
import Button, { ButtonProps } from "../../../../components/Button";

const AddProductButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    </Button>
  );
};

export default AddProductButton;
