import styled from "@emotion/styled";
import { theme } from "@/shared/theme/theme.styles";


export const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  min-height: 100vh;
  background-color: ${theme.colors.gray[200]};
  z-index: 1000;
`;
