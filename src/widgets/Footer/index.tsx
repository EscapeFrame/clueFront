/** @jsxImportSource @emotion/react */
import * as s from './styles';
import { fonts } from '@/shared/theme/font.styles';

const members = [
  { name: '김민재', role: 'CEO/Security' },
  { name: '김한결', role: 'CTO/Backend' },
  { name: '공덕현', role: 'Frontend' },
  { name: '안재민', role: 'App' },
  { name: '노유현', role: 'Design/Frontend' },
];

export default function Footer() {
  return (
    <s.Container>
      <s.Content>
        <s.LogoImg />
        <s.ItemList>
          {members.map(({ name, role }) => (
            <s.Content key={name}>
              <s.Item>{name}</s.Item>
              <p css={fonts.P1}>{role}</p>
            </s.Content>
          ))}
        </s.ItemList>
      </s.Content>
    </s.Container>
  );
}
