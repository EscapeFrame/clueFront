import styled from "@emotion/styled";
import { colors } from "@/shared/theme/theme.styles";
import { fonts } from "@/shared/theme/font.styles";

export const Container = styled.div`
  margin-top: 1rem;
`;

export const Title = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
  ${fonts.P3};

  @media (max-width: 768px) {
    ${fonts.P2};
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  justify-content: center;
  flex-wrap: wrap; // 모바일에서 버튼 줄바꿈 허용
`;

export const Button = styled.button`
  padding: 6px 10px;
  background: ${colors.white};
  border: 1px solid ${colors.gray[2]};
  border-radius: 4px;
  cursor: pointer;
  flex: 1 1 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 60px;

  &:hover {
    background: ${colors.gray[1]};
  }

  &:disabled {
    background-color: ${colors.gray[1]};
    color: ${colors.gray[4]};
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    flex: 1 1 40%;
  }
`;

export const IconWrapper = styled.div`
  ${fonts.P4};
  line-height: 1;
`;

export const FileInput = styled.input`
  display: none;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Item = styled.div`
  background: ${colors.gray[2]};
  padding: 8px 12px;
  border-radius: 4px;
  position: relative;
  word-break: break-word; // 긴 파일명 처리

  @media (max-width: 768px) {
    ${fonts.P2};
    padding: 6px 10px;
  }
`;

export const Remove = styled.button`
  position: absolute;
  right: 8px;
  top: 8px;
  border: none;
  background: transparent;
  ${fonts.P2};
  cursor: pointer;
  color: ${colors.gray[4]};

  &:hover {
    color: ${colors.red[3]};
  }

  &:disabled {
    color: ${colors.gray[4]};
    cursor: not-allowed;
  }
`;
