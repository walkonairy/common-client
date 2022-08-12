import styled from "@emotion/styled";

export const InputWrapper = styled.div`
  padding: 3px;
  border-radius: 18px;
  background: #333643;
  box-sizing: border-box;
  transition: all 0.3s;

  &: active {
    box-shadow: 0 0 0 6px #dae8fd;
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
`;

export const InputIcon = styled.div`
  margin-left: 24px;
  cursor: pointer;
`;
