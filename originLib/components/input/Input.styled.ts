import styled from "@emotion/styled";
import { theme } from "../theme";

export const InputWrapper = styled.div`
  padding: 3px;
  border-radius: 18px;
  background: #333643;
  box-sizing: border-box;
  transition: all 0.3s;

  &: active {
    box-shadow: 0 0 0 6px #dae8fd;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    border-radius: 14px;
  }
`;

export const InputBorder = styled.div`
  padding: 8px 16px;
  border: 2px solid transparent;
  border-radius: 15px;
  transition: all 0.3s;

  &: hover {
    border: 2px solid #4490ee;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    padding: 6px 12px;
  }
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 4px 12px;
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 4px 8px;
    border: 1px solid transparent;
  }
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
`;

export const InputContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputLabel = styled.label`
  font-size: 13px;
  color: #8e96a4;
  cursor: text;
  font-weight: bold;

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

export const _Input = styled.input`
  font-size: 18px;
  border: unset;
  outline: unset;
  color: #ffffff;
  background: #333643;
  padding: 2px 0;

  &:focus-visible,
  &:focus {
    border: unset;
    outline: unset;
  }

  @media (max-width: ${theme.breakpoints.lg}) {
    font-size: 16px;
  }
  @media (max-width: ${theme.breakpoints.md}) {
    font-size: 14px;
    padding: 1px 0;
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 1px 0;
    font-size: 12px;
  }
`;

export const InputIcon = styled.div`
  margin-left: 16px;
  cursor: pointer;

  @media (max-width: ${theme.breakpoints.md}) {
    margin-left: 12px;
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    margin-left: 8px;
  }
`;
