import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 2rem 14rem;
  background-color: #f9fafb;
  height: calc(125vh - 50px);
`;

export const StepBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const Step = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex-grow: 1;
  transition: all 0.3s ease;

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
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform: ${({ active }) => (active ? "scale(1.15)" : "scale(1.05)")};
    box-shadow: ${({ active }) => 
      active ? "0 4px 12px rgba(11, 95, 255, 0.3)" : "none"};
  }

  label {
    margin-top: 0.5rem;
    font-size: 0.875rem;
    color: ${({ active }) => (active ? "#0b5fff" : "#6b7280")};
    font-weight: ${({ active }) => (active ? "600" : "500")};
    transition: all 0.3s ease;
    transform: ${({ active }) => (active ? "translateY(-2px)" : "translateY(0)")};
  }
`;
