import { fonts } from "@/shared/theme/font.styles";
import { theme } from "@/shared/theme/theme.styles";
import styled from "@emotion/styled";

export const Container = styled.div`
  padding: 2rem 14rem;
  background-color: ${theme.colors.white};

  @media (max-width: 768px) {
    padding: 2rem 5rem;
  }
`;

export const ErrorMessage = styled.div`
  color: ${theme.colors.red};
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
  background: ${theme.colors.blue[500]};
  color: ${theme.colors.white};
  padding: 10px 0;
  border-radius: 8px;
  text-align: center;
`;
