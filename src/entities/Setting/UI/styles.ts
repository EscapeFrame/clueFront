import styled from "@emotion/styled";
import { colors } from '@/shared/theme/theme.styles';
import { fonts } from '@/shared/theme/font.styles';

export const Section = styled.section`
  background: ${colors.white};
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);

  @media (max-width: 1200px) {
    padding: 24px;
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const Wrapper = styled.section`
  margin-bottom: 10px;
`;

export const SectionTitle = styled.h2`
  ${fonts.P4};
  font-weight: 600;
  color: ${colors.black};
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    ${fonts.P3};
  }
`;

export const SectionExplan = styled.a`
  ${fonts.P3};
  color: ${colors.gray[4]};

  @media (max-width: 768px) {
    ${fonts.P2};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end; 
  margin-top: 24px;

  @media (max-width: 768px) {
    margin-top: 16px;
  }
`;

export const Line = styled.hr`
  border: none;
  height: 1px;
  background-color: ${colors.gray[3]};
  margin: 1.5rem 0;
`;

/* UserSection */
export const AvatarArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  padding-top: 2rem;

  @media (max-width: 768px) {
    gap: 12px;
    padding-top: 1rem;
  }
`;

export const AvatarRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 4px;
  }
`;

export const FileButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  background-color: ${colors.gray[1]};
  border: 1px solid ${colors.gray[3]};
  border-radius: 6px;
  cursor: pointer;
  ${fonts.P2};

  &:hover {
    background-color: ${colors.blue.light2};
  }

  @media (max-width: 768px) {
    padding: 4px 8px;
  }
`;

export const SubText = styled.div`
  ${fonts.P1};
  color: ${colors.gray[4]};
  text-align: left;
  word-break: keep-all;

  @media (max-width: 768px) {
    ${fonts.P1};
  }
`;

export const Avatar = styled.img`
  width: 80px; 
  height: 80px; 
  border-radius: 50%; 
  object-fit: cover; 
  background: ${colors.white};

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

export const AvatarFallback = styled.div`
  width: 80px; 
  height: 80px; 
  border-radius: 50%; 
  background: ${colors.gray[3]};

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

export const FormArea = styled.form`
  flex: 1;
  width: 100%;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 16px;

  & > div {
    flex: 1;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;

  label {
    ${fonts.P2};
    color: ${colors.black};
    font-weight: 500;

    span {
      color: ${colors.primary};
      margin-left: 2px;
    }
  }

  input,
  textarea {
    padding: 10px 12px;
    border: 1px solid ${colors.gray[3]};
    border-radius: 6px;
    ${fonts.P2};
    resize: none;

    &:focus {
      outline: none;
      border-color: ${colors.primary};
    }

    &:disabled {
      background-color: ${colors.gray[2]};
      color: ${colors.gray[4]};
      cursor: not-allowed;
    }
  }

  textarea {
    min-height: 80px;
  }

  @media (max-width: 768px) {
    margin-bottom: 12px;

    input,
    textarea {
      ${fonts.P1};
      padding: 8px 10px;
    }
  }
`;

export const RadioWrapper = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

/* ChatSection */
export const ChatList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const ChatItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid ${colors.gray[2]};
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${colors.gray[1]};
  }

  @media (max-width: 768px) {
    padding: 10px 12px;
  }
`;

export const InfoArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const UserName = styled.span`
  ${fonts.P2};
  line-height: 1.2;
`;

export const LastMessage = styled.p`
  ${fonts.P1};
  color: ${colors.gray[4]};
  margin: 0;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChatDate = styled.span`
  ${fonts.P1};
  color: ${colors.gray[4]};
`;

export const SearchWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 12px;
  margin-bottom: 16px;
`;

export const SearchIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.gray[4]};
  ${fonts.P3};
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px 36px 8px 12px;
  border: 1px solid ${colors.gray[2]};
  border-radius: 8px;
  height: 40px;
  line-height: 1.2;
  ${fonts.P1};

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
  }

  @media (max-width: 768px) {
    height: 36px;
    padding: 6px 32px 6px 10px;
    ${fonts.P1};
  }
`;

/* AlertSection */
export const AlertList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 18px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const AlertItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid ${colors.gray[2]};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    padding: 12px 0;
  }
`;

export const AlertText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AlertLabel = styled.span`
  ${fonts.P3};
  font-weight: 500;
  color: ${colors.black};

  @media (max-width: 768px) {
    ${fonts.P2};
  }
`;

export const AlertDesc = styled.span`
  ${fonts.P2};
  color: ${colors.gray[4]};
  margin-top: 4px;

  @media (max-width: 768px) {
    ${fonts.P1};
  }
`;