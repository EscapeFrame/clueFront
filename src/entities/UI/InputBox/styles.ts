import styled from '@emotion/styled';
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  margin-bottom: 8px;
  font-weight: 600;
`;

export const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 6px;
  ${fonts.P2}
  outline: none;
  width: 100%;
  &:focus {
    border-color: ${theme.colors.blue[500]};
    box-shadow: 0 0 3px ${theme.colors.blue[500]};
  }
`;

export const Input = styled.input`
  padding: 10px 12px;
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 6px;
  ${fonts.P2}
  width: 97%;
  outline: none;
  &:focus {
    border-color: ${theme.colors.blue[500]};
    box-shadow: 0 0 3px ${theme.colors.blue[500]};
  }
`;

export const Span = styled.span`
  color: ${theme.colors.blue[500]};
`;

// 여기에 추가: 학년/반 가로 래퍼
export const GradeClassWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

export const GradeClassInput = styled(Input)`
  flex: 1;
`;

export const ErrorText = styled.p`
  color: ${theme.colors.red};
  ${fonts.P1}
  margin-top: 4px;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const Icon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.gray[600]};
`;