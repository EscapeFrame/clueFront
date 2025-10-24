import styled from '@emotion/styled';
import { fonts } from '@/shared/theme/font.styles';
import { ThemeType } from '@/shared/theme/theme.styles';

export const ModalContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px; /* 내부 여백 */
  max-height: 70vh; /* 모달 높이 제한 */
  overflow-y: auto; /* 내용이 길어지면 스크롤 */
`;

export const ModalTitle = styled.h3`
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.black};
  margin: 0;
  word-break: break-word;
`;

export const ModalMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  ${fonts.P2};
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.gray[500]};
`;

export const NoticeType = styled.span<{ type: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  ${fonts.P3};
  font-weight: 600;
  color: white;
  background-color: ${({ theme, type }: { theme: ThemeType, type: string }) => {
    switch (type) {
      case 'SCHOOL':
        return theme.colors.blue[500];
      case 'SCHEDULE':
        return theme.colors.blue[500];
      case 'SERVICE':
        return theme.colors.blue[500];
      default:
        return theme.colors.gray[500];
    }
  }};
`;

export const ModalText = styled.p`
  ${fonts.P2};
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.gray[300]};
  white-space: pre-wrap;
  word-break: break-word;
  line-height: 1.6;
  margin: 0;
`;

export const AttachmentsSection = styled.div`
  margin-top: 20px;
  border-top: 1px solid ${({ theme }: { theme: ThemeType }) => theme.colors.gray[200]};
  padding-top: 20px;
`;

export const AttachmentsTitle = styled.h4`
  ${fonts.P3};
  font-weight: 600;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.black};
  margin-top: 0;
  margin-bottom: 10px;
`;

export const AttachmentList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const AttachmentItem = styled.li`
  margin-bottom: 8px;
`;

export const AttachmentLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.blue[600]};
  ${fonts.P2};
  cursor: pointer;
  text-decoration: underline;
  text-align: left;
  padding: 0;

  &:hover {
    color: ${({ theme }: { theme: ThemeType }) => theme.colors.blue[700]};
  }
`;

export const LoadingText = styled.p`
  ${fonts.P2};
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.gray[500]};
  text-align: center;
`;

export const ErrorText = styled.p`
  ${fonts.P2};
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.red};
  text-align: center;
`;

export const EmptyText = styled.p`
  ${fonts.P2};
  color: ${({ theme }: { theme: ThemeType }) => theme.colors.gray[500]};
  text-align: center;
`;
