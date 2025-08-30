import * as S from './styles'
import { useNavigate } from 'react-router-dom';

interface SetDataProps {
    title: string;
    body: string;
    url: string;
  }

export function GoUser({ title, body, url }: SetDataProps) {
    const navigate = useNavigate();

    return (
        <div onClick={() => navigate(url)}>
            <S.LinkItemWrapper>
                <S.TextGroup>
                    <S.Title>{title}</S.Title>
                    <S.Body>{body}</S.Body>
                </S.TextGroup>
            </S.LinkItemWrapper>
        </div>
    )
}