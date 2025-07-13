import styled from "@emotion/styled";

export const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 0.9375rem; /* 15px */
  background-color: #f3f3f3;
  border-radius: 0.75rem; /* 12px */
  font-weight: 600;
  font-size: 0.8rem;
  overflow: hidden;
`;

export const Progress = styled.div`
  height: 1.875rem; /* 30px */
  padding: 0;
  text-align: center;
  background-color: #86c1ff;
  color: #111;
  transition: width 0.3s ease;
  line-height: 1.875rem;
`;