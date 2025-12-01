import { fonts } from "@/shared/theme/font.styles";
import { colors } from "@/shared/theme/theme.styles";
import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 2rem 30rem;
  background-color: ${colors.white};

  @media (max-width: 1024px) {
    padding: 2rem 5rem;
  }
`;

export const ErrorMessage = styled.div`
  color: ${colors.red[3]};
`;

export const Icon = styled.div`
  ${fonts.P4};
  cursor: pointer;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const PostButton = styled.div`
  width: 100%;
  background: ${colors.primary};
  color: ${colors.white};
  padding: 10px 0;
  border-radius: 8px;
  text-align: center;
`;

export const ActionRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;
