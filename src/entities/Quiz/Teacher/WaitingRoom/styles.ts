import { fonts } from "@/shared/theme/font.styles";
import { colors } from "@/shared/theme/theme.styles";
import styled from "@emotion/styled";

export const Container = styled.div`
  background-color: ${colors.gray[1]};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 2rem 4rem;

  @media (max-width: 1024px) {
    padding: 2rem;
  }

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 2rem;
`;

export const Title = styled.h1`
  ${fonts.P4};
  font-weight: 600;
  color: ${colors.black};
  margin: 0px;
  padding: 0px;
`;

export const Explanation = styled.p`
  ${fonts.P3};
  color: ${colors.gray[4]};
  margin: 0px;
  padding: 0px;
`;

export const Body = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0 2rem;

  @media (max-width: 900px) {
    flex-direction: column;
    margin: 0;
  }
`;

export const Left = styled.div`
  flex: 2;
  background: ${colors.white};
  padding: 1rem;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.08);
  text-align: center;
  min-width: 0;
`;

export const MemberList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Member = styled.div<{ bgColor: string; borderColor: string }>`
  display: flex;
  align-items: center;
  margin: 8px;
  background-color: ${(p) => p.bgColor};
  border: 1.5px solid ${(p) => p.borderColor};
  padding: 16px 20px;
  border-radius: 12px;
  white-space: nowrap;
  ${fonts.P3};
  gap: 10px;
`;

export const MemberImageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: auto;
    height: 64px;
    display: block;
  }
`;

export const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Card = styled.div`
  background: ${colors.white};
  padding: 1rem 2rem;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const SubTitle = styled.h2`
  ${fonts.P3};
  font-weight: 600;
  color: ${colors.black};
`;

export const SubTitle2 = styled.h2`
  ${fonts.P3};
  color: ${colors.white};
  margin: 0px;
  padding: 0px;
`;

export const CodeBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: ${colors.primary};
  padding: 1rem;
  text-align: center;
  border-radius: 15px;
`;

export const Code = styled.span`
  ${fonts.P5};
  font-weight: 600;
  color: ${colors.white};
`;

export const PointText = styled.span`
  color: ${colors.primary};
  ${fonts.P2};
  font-weight: 600;
`;

export const TimeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Button = styled.button`
  background: ${colors.gray[2]};
  color: ${colors.gray[4]};
  border: none;
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  ${fonts.P2};
  cursor: pointer;

  &:hover {
    background: ${colors.blue.light4};
  }
`;

export const SubmitButton = styled.button`
  margin-top: 1rem;
  padding: 0.8rem;
  ${fonts.P3};
  margin-top: auto;
  color: ${colors.white};
  background: ${colors.primary};
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: ${colors.blue.dep1};
  }
`;