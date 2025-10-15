import styled from '@emotion/styled';

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px 128px;
  /* 부모 요소의 헤더/네비게이션 높이를 고려하여 조정 필요 */
`;

export const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 16px;
  position: relative;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  height: 200px;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }
`;

// 헤더: 날짜 왼쪽, 버튼 오른쪽
export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px;
  padding: 0px;
`;

export const CardDate = styled.p`
  color: #666;
  font-size: 0.85em;
  margin: 0px;
  padding: 0px;
`;

export const CardActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const EditButton = styled.button`
  color: #0077ff;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.2s;

  &:hover {
    color: #b7daff;
  }
`;

export const DeleteButton = styled.button`
  color: #ff6d6d;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.2s;

  &:hover {
    color: #eba8a8;
  }
`;

export const CardContent = styled.div`
  flex: 1;
  overflow: hidden;
  margin: 8px 0;
  padding-bottom: 36px;
`;

export const CardTitle = styled.h3`
  font-size: 1.15em;
  font-weight: 600;
  margin: 0px;
  color: #18191A;
`;

export const CardExplanation = styled.p`
  font-size: 0.9em;
  color: #666;
  margin: 0;
  line-height: 1.3em;

  display: -webkit-box;
  -webkit-line-clamp: 3; /* 최대 3줄 표시 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 5px;
  position: absolute;
  bottom: 20px; /* 카드 하단에서 20px */
  left: 16px;
  right: 16px;
`;

export const CardTag = styled.span`
  background-color: #EBF6FF;
  color: #0077FF;
  border-radius: 4px;
  border: 1px solid #86C1FF;
  padding: 3px 8px;
  font-size: 0.75em;
  font-weight: 500;
  margin-right: 6px;
`;