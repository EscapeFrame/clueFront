import styled from "@emotion/styled";
import { theme } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Container = styled.div`
  width: 100%;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 32px; 
  padding: 24px 0; 
  border-bottom: 1px solid ${theme.colors.gray[200]};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 16px 0;
  }
`;

export const AvatarArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`;

export const Avatar = styled.img`
  width: 80px; 
  height: 80px; 
  border-radius: 50%; 
  object-fit: cover; 
  background: ${theme.colors.white};

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

export const AvatarFallback = styled.div`
  width: 80px; 
  height: 80px; 
  border-radius: 50%; 
  background: ${theme.colors.gray[300]};

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

export const SubText = styled.div`
  ${fonts.P3};
  color: ${theme.colors.gray[600]};
  text-align: center;
  word-break: keep-all;
`;

export const FileButton = styled.div`
  display: inline-block;
  padding: 6px 12px;
  border: 1px solid ${theme.colors.gray[400]};
  border-radius: 6px;
  cursor: pointer;
  ${fonts.P3};

  &:hover {
    background-color: ${theme.colors.gray[100]};
  }
`;

export const FormArea = styled.form`
  flex: 1;
  width: 100%;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;

  label {
    ${fonts.P3};
    color: ${theme.colors.black};
    font-weight: 500;
  }

  input,
  textarea {
    padding: 10px 12px;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 6px;
    font-size: 14px;
    resize: none;

    &:focus {
      outline: none;
      border-color: ${theme.colors.blue[500]};
    }
  }

  textarea {
    min-height: 80px;
  }
`;

export const FormRow = styled.div`
  display: flex;
  gap: 16px;

  & > div {
    flex: 1;
  }
`;

export const SubmitRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    ${fonts.P3};
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  button[type="submit"] {
    background: ${theme.colors.blue[500]};
    color: ${theme.colors.white};

    &:hover {
      background: ${theme.colors.blue[600]};
    }
  }

  button[type="button"] {
    background: ${theme.colors.gray[200]};

    &:hover {
      background: ${theme.colors.gray[300]};
    }
  }
`;

export const ChatSection = styled.div`
  padding: 24px 0;

  h3 {
    ${fonts.P2};
    font-weight: 600;
    margin-bottom: 12px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 4px;
      border-bottom: 1px solid ${theme.colors.gray[200]};
      ${fonts.P3};

      a {
        color: ${theme.colors.blue[500]};
        text-decoration: none;
        font-size: 13px;
      }
    }
  }
`;

export const InfoArea = styled.div``;
export const Name = styled.div``;
export const Header = styled.div``;