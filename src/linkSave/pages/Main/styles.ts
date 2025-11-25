import styled from "@emotion/styled";
import { colors } from "@/shared/theme/theme.styles";

export const Wrapper = styled.div`
  position: fixed;
  top: 7%;
  width: 100%;
  min-height: 100%;
  background-color: ${colors.gray[2]};
`;

export const LodingText = styled.div`
  padding: 1rem 14rem;
  font-size: 1em;
  margin-top: 8px;
`;

export const ErrorText = styled.div`
  color : ${colors.red[3]};
  padding: 1rem 14rem;
  font-size: 1em;
  margin-top: 8px;
`;
