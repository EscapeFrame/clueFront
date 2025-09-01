import * as s from "./styles";
import Button from "@/entities/UI/Button";

interface LessonCardProps {
    title: string;
    desc: string[];
    url: string;
    onSelect: (url: string) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ title, desc, url, onSelect }) => {
    return (
        <s.Card onClick={() => onSelect(url)}>
            <s.CardTitle># {title}</s.CardTitle>
            <s.CardList>
                {desc.map((d, i) => (
                    <s.CardListItem key={i}>{d}</s.CardListItem>
                ))}
            </s.CardList>
            <Button
                text="선택하기"
                width="100%"
                type={0}
                onClick={(e) => { e.stopPropagation(); onSelect(url); }}
            />
        </s.Card>
    );
};

export default LessonCard;