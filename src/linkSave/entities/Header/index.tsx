import * as s from './styles';
import SearchBar from '@/linkSave/components/SearchBar';

export default function Hdeader() {
    return (
        <s.Wrapper>
            <s.HeaderContainer>
                <s.TopRow>
                    <s.AddLinkButton>
                        + 링크 추가
                    </s.AddLinkButton>
                </s.TopRow>
                <s.Container>
                    <s.ItemContainer>
                        <li><s.Item>전체</s.Item></li>
                        <li><s.Item>반</s.Item></li>
                        <li><s.Item>인문과목</s.Item></li>
                        <li><s.Item>전공과목</s.Item></li>
                        <li><s.Item>방과후</s.Item></li>
                    </s.ItemContainer>
                    <s.SearchContainer>
                        <SearchBar onSearch={(query) => console.log('Searching for:', query)} />
                    </s.SearchContainer>
                </s.Container>
            </s.HeaderContainer>

        </s.Wrapper>
    );
}