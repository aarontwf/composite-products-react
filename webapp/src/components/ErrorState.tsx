type ErrorData = {
  readonly name: string;
  readonly message: string;
}

const ErrorState: React.FC<ErrorData> = (props) => {
  return (
    <div>
      <h3 className="font-bold">{props.name}</h3>
      <p>{props.message}</p>
    </div>
  );
};

export default ErrorState;
