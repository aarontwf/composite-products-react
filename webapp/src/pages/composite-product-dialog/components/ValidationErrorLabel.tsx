const ValidationErrorLabel: React.FC = (props) => {
  return (
    <div className="text-sm text-red-600 py-1 ml-2">
      {props.children}
    </div>
  );
};

export default ValidationErrorLabel;
