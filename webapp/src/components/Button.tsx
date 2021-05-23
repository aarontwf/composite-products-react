import classNames from "classnames";

export enum ButtonType {
  Standard,
  Success,
  Danger
}

export enum ButtonSize {
  Fit,
  Expand,
  Dynamic
}

export interface ButtonProps {
  readonly onClick?: () => void,
  readonly type?: ButtonType,
  readonly size?: ButtonSize
}

const Button: React.FC<ButtonProps> = (props) => {
  function handleClick(): void {
    if (props.onClick) {
      props.onClick();
    }
  }

  const type = props.type ? props.type : ButtonType.Standard;
  const size = props.size ? props.size : ButtonSize.Fit;

  const classes = classNames(
    'btn-base',
    {
      'w-auto': size === ButtonSize.Fit,
      'w-full': size === ButtonSize.Expand,
      'w-full sm:w-auto': size === ButtonSize.Dynamic,
      'btn-default': type === ButtonType.Standard,
      'btn-success': type === ButtonType.Success,
      'btn-danger': type === ButtonType.Danger
    }
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!props.onClick}
      className={classes}>
      {props.children}
    </button>
  );
};

export default Button;
