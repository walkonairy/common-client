import React, {
  AnchorHTMLAttributes,
  forwardRef,
  MouseEventHandler,
} from "react";

import "./button.css";

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
  children?: React.ReactElement;
}

export type ButtonProps = Partial<AnchorButtonProps>;

const Button = forwardRef((props: ButtonProps, ref: React.RefObject<any>) => {
  const { children, loading = false, ...rest } = props;

  return (
    <React.Fragment>
      {/*<button className="button" ref={ref} {...rest}>*/}
      {/*  <span className="load loading activeLoading" />*/}
      {/*  {children}*/}
      {/*</button>*/}
      <button className="button" ref={ref} {...rest}>
        <div className="btn-content">
          {children}
          {loading && (
            <div className={`dot-${loading}`}>
              <div className="dot bounce1" />
              <div className="dot bounce2" />
              <div className="dot bounce3" />{" "}
            </div>
          )}
        </div>
      </button>
    </React.Fragment>
  );
});

export default Button;
