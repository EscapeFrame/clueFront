import styled from "styled-components";
import { colors } from "@/shared/theme/theme.styles";

export const Container = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  background: #f7f8fa;
  padding: 24px 0;
`;

export const Sidebar = styled.aside`
  width: 260px;
  flex-shrink: 0;
`;

export const SideBox = styled.div`
  background: #f9fafb;
`;

export const SideTitle = styled.div`
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 700;
  color: #111827; /* 짙은 검정 */
`;

export const MenuList = styled.ul`
  padding-left: 16px;
  list-style: none;

  li {
    margin-bottom: 10px;
    font-size: 15px;
    color: #6b7280; /* Gray-500 */
  }

  .active {
    font-weight: 600;
    color: #111827; /* 활성화 컬러 */
  }
`;

export const MenuButton = styled.button<{ active?: boolean }>`
  background: ${({ active }) => (active ? colors.primary : "transparent")};
  color: ${({ active }) => (active ? "white" : "#6B7280")};
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  text-align: left;
  width: 100%;
  text-align: center;

  &:hover {
  background: ${({ active }) => (active ? colors.primary : colors.blue.light1)};
  color: ${({ active }) => (active ? 'white' : '#111827')};
  }
`;

export const Content = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  flex: 1;
`;

export const PageTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #111827; /* 제목 텍스트 */
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex: 1;
  min-height: 0;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #111827;
  }

  input {
    padding: 12px 14px;
    border: 1px solid #d1d5db; /* Gray-300 */
    border-radius: 6px;
    font-size: 15px;
    background: white;

    &:focus {
      outline: none;
      border-color: #3b82f6; /* Blue-500 */
      box-shadow: 0 0 0 1px #3b82f6;
    }
  }
`;

export const TextAreaBox = styled.textarea`
  background: white;
  border-radius: 6px;
  border: none;
  outline: none;

  box-sizing: border-box;
  width: 100%;
  min-height: 6rem;
  max-height: 28rem;
  font-size: 15px;
  line-height: 1.6;
  color: #1f2937;
  overflow: auto;
  white-space: pre-wrap;
  font-family: inherit;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const LoadingBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  font-size: 1.2rem;
  color: #6b7280;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  border-top: 1px solid #e5e7eb;
  padding-top: 24px;
  margin-top: auto; /* push to bottom */
  align-items: center;
  align-self: stretch;
`;

export const Button = styled.button<{ variant: "primary" | "secondary" }>`
  padding: 12px 24px;
  border-radius: 6px;
  border: 1px solid transparent;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  flex: 1; /* expand to fill available width */
  transition: background 0.2s ease;

  ${({ variant }) =>
    variant === "primary" &&
    `
      background: #2563EB; /* Blue-600 */
      color: white;

      &:hover { background: #1E4ED8; } /* Blue-700 */
    `};

  ${({ variant }) =>
    variant === "secondary" &&
    `
      background: white;
      border: 1px solid #D1D5DB;
      color: #374151;

      &:hover { background: #F3F4F6; }
    `};

  ${({ disabled }) =>
    disabled &&
    `
      opacity: .5;
      cursor: not-allowed;
    `}
`;
