import React, { AnchorHTMLAttributes, MouseEventHandler } from "react";

export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: MouseEventHandler<HTMLElement>;
} & BaseButtonProps &
  // 去除AnchorHTMLAttributes<any>中的type和onClick
  Omit<AnchorHTMLAttributes<any>, "type" | "onClick">;

export interface BaseButtonProps {
  className?: string;
  ghost?: boolean;
  danger?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export type ButtonProps = Partial<AnchorButtonProps>;

import { useAppSelector, useAppDispatch } from "originLib/redux/hooks";

const Button: React.FC<ButtonProps> = (props) => {
  const count = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      <div>123</div>
    </React.Fragment>
  );
};

export default Button;
