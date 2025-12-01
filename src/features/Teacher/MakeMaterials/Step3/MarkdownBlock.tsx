import React, { useState, useRef, useEffect } from "react";
import MDEditor from '@uiw/react-md-editor';
import * as s from './styles';

interface MarkdownBlockProps {
    content: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

interface MarkdownLine {
    id: string;
    content: string;
    type: 'heading' | 'paragraph' | 'code' | 'list' | 'blockquote' | 'empty';
}

// 마크다운을 줄 단위로 파싱
const parseMarkdownLines = (content: string): MarkdownLine[] => {
    const lines = content.split('\n');
    const result: MarkdownLine[] = [];
    let inCodeBlock = false;
    let codeBlockLines: string[] = [];
    let codeBlockId = '';

    lines.forEach((line, index) => {
        // 코드 블록 시작/종료
        if (line.trim().startsWith('```')) {
            if (!inCodeBlock) {
                inCodeBlock = true;
                codeBlockId = `line-${index}`;
                codeBlockLines = [line];
            } else {
                codeBlockLines.push(line);
                result.push({
                    id: codeBlockId,
                    content: codeBlockLines.join('\n'),
                    type: 'code'
                });
                inCodeBlock = false;
                codeBlockLines = [];
            }
            return;
        }

        // 코드 블록 안의 내용
        if (inCodeBlock) {
            codeBlockLines.push(line);
            return;
        }

        // 빈 줄
        if (line.trim() === '') {
            result.push({
                id: `line-${index}`,
                content: line,
                type: 'empty'
            });
            return;
        }

        // 제목
        if (line.trim().match(/^#{1,6}\s/)) {
            result.push({
                id: `line-${index}`,
                content: line,
                type: 'heading'
            });
            return;
        }

        // 리스트
        if (line.trim().match(/^[-*+]\s/) || line.trim().match(/^\d+\.\s/)) {
            result.push({
                id: `line-${index}`,
                content: line,
                type: 'list'
            });
            return;
        }

        // 인용
        if (line.trim().startsWith('>')) {
            result.push({
                id: `line-${index}`,
                content: line,
                type: 'blockquote'
            });
            return;
        }

        // 일반 문단
        result.push({
            id: `line-${index}`,
            content: line,
            type: 'paragraph'
        });
    });

    return result;
};

// 개별 줄 컴포넌트
const MarkdownLineComponent: React.FC<{
    line: MarkdownLine;
    onUpdate: (newContent: string) => void;
    disabled: boolean;
}> = ({ line, onUpdate, disabled }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(line.content);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const wrapperElRef = useRef<HTMLDivElement | null>(null);
    const disabledRef = useRef(disabled);
    const handlerMap = useRef<WeakMap<Element, EventListener>>(new WeakMap());

    // disabled 값을 ref에 저장
    useEffect(() => {
        disabledRef.current = disabled;
    }, [disabled]);

    useEffect(() => {
        setEditValue(line.content);
    }, [line.content]);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
            // textarea 높이를 내용에 맞게 자동 조절
            // Adjust twice: once immediately and once in next tick to ensure computed styles applied
            adjustTextareaHeight();
            setTimeout(adjustTextareaHeight, 0);
        }
    }, [isEditing]);

    const adjustTextareaHeight = () => {
        if (inputRef.current) {
            inputRef.current.style.height = 'auto';
            inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
        }
    };

    // use a callback ref to reliably attach native dblclick listener to the current wrapper element
    useEffect(() => {
        return () => {
            // cleanup on unmount
            if (wrapperElRef.current) {
                // remove any listener if present
                wrapperElRef.current.onclick = null;
                wrapperElRef.current = null;
            }
        };
    }, []);

    const setWrapperRef = (el: HTMLDivElement | null) => {
        if (wrapperElRef.current) {
            const prev = wrapperElRef.current;
            const prevHandler = handlerMap.current.get(prev);
            if (prevHandler) prev.removeEventListener('dblclick', prevHandler);
            handlerMap.current.delete(prev);
        }

        wrapperElRef.current = el;

        if (el) {
            const handler = (e: Event) => {
                e.preventDefault();
                e.stopPropagation();
                if (!disabledRef.current) setIsEditing(true);
            };
            handlerMap.current.set(el, handler);
            el.addEventListener('dblclick', handler);
        }
    };

    const handleBlur = () => {
        console.log('Blur - saving changes');
        setIsEditing(false);
        if (editValue !== line.content) {
            onUpdate(editValue);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleBlur();
        }
        if (e.key === 'Escape') {
            setEditValue(line.content);
            setIsEditing(false);
        }
    };

    if (isEditing) {
        return (
            <s.MBEditingLine>
                <s.MBEditTextArea
                    ref={inputRef}
                    value={editValue}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        setEditValue(e.target.value);
                        adjustTextareaHeight();
                    }}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                />
            </s.MBEditingLine>
        );
    }

    return (
        <s.MBLineWrapper disabled={disabled} lineType={line.type}>
            <div ref={setWrapperRef}>
                {line.type === 'empty' ? (
                    <s.MBEmptyLine>&nbsp;</s.MBEmptyLine>
                ) : (
                    <s.MBMarkdownContent>
                        <MDEditor.Markdown
                            source={line.content}
                            style={{ padding: '4px 8px', background: 'transparent', margin: 0 }}
                        />
                    </s.MBMarkdownContent>
                )}
            </div>
        </s.MBLineWrapper>
    );
};

const MarkdownBlock: React.FC<MarkdownBlockProps> = ({ content, onChange, disabled = false }) => {
    const [lines, setLines] = useState<MarkdownLine[]>([]);

    useEffect(() => {
        setLines(parseMarkdownLines(content));
    }, [content]);

    const handleLineUpdate = (lineId: string, newContent: string) => {
        const updatedLines = lines.map(line => 
            line.id === lineId ? { ...line, content: newContent } : line
        );
        const newFullContent = updatedLines.map(l => l.content).join('\n');
        onChange(newFullContent);
    };

    return (
        <s.MBContainer>
            <s.MBContentWrapper data-color-mode="light">
                {lines.length === 0 ? (
                    <s.MBEmptyState>내용을 더블클릭하여 편집하세요</s.MBEmptyState>
                ) : (
                    lines.map((line) => (
                        <MarkdownLineComponent
                            key={line.id}
                            line={line}
                            onUpdate={(newContent) => handleLineUpdate(line.id, newContent)}
                            disabled={disabled}
                        />
                    ))
                )}
            </s.MBContentWrapper>
        </s.MBContainer>
    );
};

export default MarkdownBlock;