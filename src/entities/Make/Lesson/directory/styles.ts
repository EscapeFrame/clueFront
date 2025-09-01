/** @jsxImportSource @emotion/react */
import { fonts } from "@/shared/theme/font.styles";
import { theme } from "@/shared/theme/theme.styles";
import styled from "@emotion/styled";

export const SelectBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 1rem 0;

  select,
  input {
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 8px;
    padding: 8px;
    ${fonts.P2}
  }
`;