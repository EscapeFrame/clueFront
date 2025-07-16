import styled from "@emotion/styled"
import { gray, white, black, blue } from "@/shared/styles/theme.styles"
import { fonts } from "@/shared/styles/font.styles"

export const PageContainer = styled.div`
  background-color: ${white};
  margin: 0 auto;
  padding: 0 2rem;
  max-width: 1200px;
  box-sizing: border-box;
`

export const ContentWrapper = styled.div`
  margin: 0 auto;
`

export const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`

export const HeaderTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;

  .icon {
    width: 2.5rem;
    height: 2.5rem;
    color: ${blue[500]}
  }
`

export const Title = styled.h1`
    ${fonts.P3}
  font-weight: 700;
  color: ${black}
`

export const Subtitle = styled.p`
${fonts.P2}
  ${gray[300]}
`

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

export const StatCard = styled.div`
  background-color: ${white};
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid ${gray[150]};
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.05);
`

export const StatIconWrapper = styled.div<{ color: string }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: ${(props) => props.color};
  }
`

export const StatLabel = styled.span`
  font-weight: 500;
  color: ${gray[400]}
`

export const StatNumber = styled.p`
${fonts.P2}
  font-weight: 700;
  color: ${black}
  margin-top: 0.25rem;
`

export const SectionTitle = styled.h2`
${fonts.P2}
  font-weight: 700;
  color: ${black}
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .icon {
    width: 1.5rem;
    height: 1.5rem;
  }
`

export const QuizGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 0;

  .icon-large {
    width: 4rem;
    height: 4rem;
    color: ${gray[250]}
    margin: 0 auto 1rem;
  }

  p {
    ${fonts.P2}
    color: ${gray[300]}
  }
`

export const CompleteSummary = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;

  p {
    ${fonts.P4}
    margin: 1rem 0;
  }

  .icon-large {
    width: 48px;
    height: 48px;
    color: ${blue[600]}
    margin-bottom: 0.5rem;
  }

  button {
    margin-top: 1rem;
    border: none;
    border-radius: 10px;
    padding: 0.75rem 1.75rem;
    ${fonts.P2}
    cursor: pointer;
    transition: background 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease;

    &:hover {
      background: ${blue[500]};
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(1px);
      box-shadow: 0 3px 10px rgba(59, 130, 246, 0.4);
    }
  }
`
