import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background: #f9fafb;
  min-height: 100vh;
  padding: 60px 16px 80px;
`;

export const Card = styled.div`
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 800px;
  padding: 48px 56px;
  display: flex;
  flex-direction: column;
  gap: 36px;

  @media (max-width: 640px) {
  padding: 24px 18px;
  }
`;

export const StepBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #9ca3af;
  font-size: 14px;
  font-weight: 500;
  gap: 12px;
  margin-bottom: 8px;
`;

export const Step = styled.div<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;

  &:not(:last-of-type)::after {
    content: "";
    position: absolute;
    top: 12px;
    right: -50%;
    width: 100%;
    height: 2px;
    background: ${({ active }) => (active ? "#2563eb" : "#e5e7eb")};
    z-index: 0;
  }

  span {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: ${({ active }) => (active ? "#2563eb" : "#e5e7eb")};
    color: ${({ active }) => (active ? "#fff" : "#6b7280")};
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  label {
  margin-top: 8px;
  font-size: 13px;
  color: ${({ active }) => (active ? "#2563eb" : "#6b7280")};
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-weight: 600;
    font-size: 14px;
  }

  input,
  textarea {
    padding: 12px 14px;
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    font-size: 15px;
    outline: none;
    transition: 0.15s ease-in-out;

    &:focus {
      border-color: #2563eb;
      box-shadow: 0 4px 16px rgba(37, 99, 235, 0.08);
      transform: translateY(-1px);
    }
  }

  textarea {
    resize: none;
    min-height: 80px;
  }
`;

export const UploadBox = styled.label`
  border: 1px dashed #e5e7eb;
  background: #fff;
  padding: 12px 14px;
  border-radius: 10px;
  font-size: 14px;
  color: #6b7280;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: 0.12s;

  &:hover {
    background: #f8fafc;
    box-shadow: 0 2px 8px rgba(16,24,40,0.03);
  }

  input {
    display: none;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

export const Button = styled.button<{ variant?: "primary" | "secondary" }>`
  all: unset;
  text-align: center;
  cursor: pointer;
  border-radius: 10px;
  padding: 12px 28px;
  font-weight: 600;
  font-size: 15px;
  transition: 0.2s;
  user-select: none;

  ${({ variant }) =>
    variant === "primary"
      ? `
      background: #2563eb;
      color: #fff;
      &:hover { background: #1d4ed8; }
    `
      : `
      border: 1px solid #d1d5db;
      color: #374151;
      &:hover { background: #f3f4f6; }
    `}
`;
