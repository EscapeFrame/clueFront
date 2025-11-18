import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  background: #f7f8fa; /* 전체 페이지 배경 */
  padding: 24px 0;
`;

export const Sidebar = styled.aside`
  width: 260px;
  flex-shrink: 0;
`;

export const SideBox = styled.div`
  background: #f9fafb; /* 피그마 스타일 */
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e5e7eb; /* 연한 회색 border */
`;

export const SideTitle = styled.h4`
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

export const Content = styled.div`
  flex: 1;
`;

export const PageTitle = styled.h2`
  margin: 0 0 24px 0;
  font-size: 22px;
  font-weight: 700;
  color: #111827; /* 제목 텍스트 */
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
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

export const TextAreaBox = styled.div`
  white-space: pre-wrap;
  background: white;
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  min-height: 400px;
  font-size: 15px;
  line-height: 1.6;
  color: #1f2937;
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid #e5e7eb;
  padding-top: 24px;
`;

export const Button = styled.button<{ variant: "primary" | "secondary" }>`
  padding: 12px 24px;
  border-radius: 6px;
  border: 1px solid transparent;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  width: 110px;
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