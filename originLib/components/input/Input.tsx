import React, {
  AnchorHTMLAttributes,
  MouseEventHandler,
  forwardRef,
  MouseEvent,
} from "react";
import {
  InputWrapper,
  InputBox,
  InputContent,
  InputLabel,
  _Input,
  InputIcon,
  InputBorder,
} from "./Input.styled";

export type AnchorInputProps = {
  href: string;
  target?: string;
  onClick?: MouseEventHandler<HTMLElement>;
} & BaseInputProps &
  // 去除AnchorHTMLAttributes<any>中的type和onClick
  Omit<AnchorHTMLAttributes<any>, "type" | "onClick">;

export interface BaseInputProps {
  id?: string;
  className?: string;
  disabled?: boolean;
  label?: string;
  suffixIcon?: React.ReactNode;
  onClickSuffixIcon?: (e: MouseEvent<HTMLDivElement>) => void;
}

export type InputProps = Partial<AnchorInputProps>;

const Input = forwardRef((props: InputProps, ref: React.RefObject<any>) => {
  const {
    id,
    label = "Last Name",
    suffixIcon = "icon",
    onClickSuffixIcon,
    ...rest
  } = props;

  const _onClickSuffixIcon = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    onClickSuffixIcon && onClickSuffixIcon(e);
  };

  return (
    <React.Fragment>
      <InputWrapper>
        <InputBorder>
          <InputBox>
            <InputContent>
              {label && (
                <InputLabel htmlFor={id || label || "input-label"}>
                  {label}
                </InputLabel>
              )}
              <_Input id={id || label || "input-label"} {...rest} ref={ref} />
            </InputContent>
            {suffixIcon && (
              <InputIcon onClick={_onClickSuffixIcon}>{suffixIcon}</InputIcon>
            )}
          </InputBox>
        </InputBorder>
      </InputWrapper>
    </React.Fragment>
  );
});

export default Input;
