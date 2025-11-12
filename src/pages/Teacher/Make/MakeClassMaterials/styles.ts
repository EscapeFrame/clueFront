import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 2rem 10rem;
  background-color: #f9fafb;
  min-height: 100vh;
`;

export const StepBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 0 5rem;
`;

export const Step = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex-grow: 1;

  span {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${({ active }) => (active ? "#0b5fff" : "#e5e7eb")};
    color: ${({ active }) => (active ? "white" : "#6b7280")};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    z-index: 1;
  }

  label {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: ${({ active }) => (active ? "#0b5fff" : "#6b7280")};
    font-weight: 500;
  }
`;
