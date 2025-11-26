import styled from "@emotion/styled";
import { colors } from "@/shared/theme/theme.styles";

export const Wrapper = styled.div`
  position: fixed;
  top: 7%;
  width: 100%;
  min-height: 100%;
  background-color: ${colors.gray[1]};
`;

export const LodingText = styled.div`
  padding: 1rem 14rem;
  font-size: 1em;
  margin-top: 8px;
`;

export const ErrorText = styled.div`
  color : ${colors.red[3]};
  padding: 1rem 14rem;
  font-size: 1em;
  margin-top: 8px;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  padding: 1rem 14rem 2rem 14rem;
`;

export const SkeletonCard = styled.div`
  border-radius: 8px;
  padding: 12px;
  background: linear-gradient(180deg, #ffffff, #fafafa);
  border: 1px solid ${colors.gray[3]};
  min-height: 120px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    .date { width: 60px; height: 12px; background: #e9ecef; border-radius: 6px; }
    .actions { width: 48px; height: 20px; background: #e9ecef; border-radius: 6px; }
  }

  .content { 
    .title { width: 70%; height: 16px; background: #e9ecef; border-radius: 6px; margin-bottom: 8px; }
    .desc { width: 100%; height: 12px; background: #f1f3f5; border-radius: 6px; }
  }

  .tags { display:flex; gap:8px; margin-top:10px; .tag{ width: 64px; height: 20px; background:#e9ecef; border-radius: 12px;} .tag.small{ width: 40px; }}
`;
