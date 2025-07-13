import styled from "@emotion/styled";

export const TabSelector = styled.div`
  padding: 0 10rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
`;

interface TabButtonProps {
  active?: boolean;
}

export const TabButton = styled.button<TabButtonProps>`
  padding: 0.5rem 1rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  border-bottom: ${({ active }) => (active ? "2px solid #86C1FF" : "none")};
  font-weight: ${({ active }) => (active ? 600 : "normal")};
  color: ${({ active }) => (active ? "#86C1FF" : "inherit")};
`;