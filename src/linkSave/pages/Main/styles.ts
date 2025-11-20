import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme.styles";


export const Wrapper = styled.div`
  position: fixed;
  width: 125vh;
  min-height: 125vh;
  background-color: ${theme.colors.gray[200]};
  z-index: 1000;
`;
