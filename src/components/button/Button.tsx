import React, {
  AnchorHTMLAttributes,
  MouseEventHandler,
  forwardRef,
  ForwardRefRenderFunction,
} from "react";

type ButtonType = "default" | "primary" | "ghost" | "link";

export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  // Omit: 去除AnchorHTMLAttributes<any>中的type和onClick
  Omit<AnchorHTMLAttributes<any>, "type" | "onClick">;

export interface BaseButtonProps {
  loading?: boolean;
  type?: ButtonType;
  disabled?: boolean;
}

export type ButtonProps = Partial<AnchorButtonProps>;

const OriginButton: ForwardRefRenderFunction<unknown, ButtonProps> = (
  props,
  ref
) => {
  return <button>test</button>;
};

const Button = forwardRef<unknown, ButtonProps>(OriginButton);

export default Button;
