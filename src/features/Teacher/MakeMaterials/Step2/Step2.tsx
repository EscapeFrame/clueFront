import React, { useCallback, useRef, useEffect, useState } from "react";
import { PiBookOpenText, PiCodeSimple, PiPencilSimpleLine, PiClipboardText, PiPlusBold, PiXBold } from "react-icons/pi";
import * as s from "./styles";

type WorkflowIconKey = "theory" | "example" | "practice" | "assignment" | "custom";

export interface WorkflowNode {
    id: string;
    title: string;
    icon: WorkflowIconKey;
    iconNumber: number;
}

export interface WorkflowState {
    nodes: WorkflowNode[];
}

export interface Word {
    priority: number;
    index: string;
    iconNumber: number;
}

export interface Step2Props {
    words: Word[];
    onBack?: () => void;
    onNext?: (payload: { words: Word[] }) => void;
    agentId?: string;
    isProcessing?: boolean;
}

const workflowIconMap: Record<WorkflowIconKey, React.ReactNode> = {
    theory: <PiBookOpenText size={18} />,
    example: <PiCodeSimple size={18} />,
    practice: <PiPencilSimpleLine size={18} />,
    assignment: <PiClipboardText size={18} />,
    custom: <PiBookOpenText size={18} />,
};

const iconNumberMap: Record<number, WorkflowIconKey> = {
    1: "theory",
    2: "example",
    3: "practice",
    4: "assignment",
};

const getIconKeyFromNumber = (num: number): WorkflowIconKey => iconNumberMap[num] || "custom";

const createId = () => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID();
    }
    return `node-${Math.random().toString(36).slice(2, 11)}`;
};

const defaultWorkflow: WorkflowState = {
    nodes: [
        { id: createId(), title: "이론", icon: "theory", iconNumber: 1 },
        { id: createId(), title: "예제코드", icon: "example", iconNumber: 2 },
        { id: createId(), title: "실습문제", icon: "practice", iconNumber: 3 },
        { id: createId(), title: "미니과제", icon: "assignment", iconNumber: 4 },
    ],
};

const processInitialWords = (words: Word[]): WorkflowState => {
    if (!words || words.length === 0) {
        return defaultWorkflow;
    }
    const sortedNodes = [...words]
        .sort((a, b) => a.priority - b.priority)
        .map((word) => ({
            id: createId(),
            title: word.index,
            icon: getIconKeyFromNumber(word.iconNumber),
            iconNumber: word.iconNumber,
        }));
    return { nodes: sortedNodes };
};

export default function Step2({ words, onBack, onNext, isProcessing = false }: Step2Props) {
    const [workflow, setWorkflow] = useState<WorkflowState>(() => processInitialWords(words));
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [hoverEdgeIndex, setHoverEdgeIndex] = useState<number | null>(null);
    const [hoverNodeId, setHoverNodeId] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [draftTitle, setDraftTitle] = useState<string>("");
    const editingRef = useRef<HTMLTextAreaElement | null>(null);

    

    const handleAddNode = useCallback(() => {
        setWorkflow((prev) => {
            const nextIndex = prev.nodes.length + 1;
            const newNode: WorkflowNode = {
                id: createId(),
                title: `새 단계 ${nextIndex}`,
                icon: "custom",
                iconNumber: 5, // 'custom'에 해당하는 기본값
            };
            return { ...prev, nodes: [...prev.nodes, newNode] };
        });
    }, []);

    const handleRemoveNode = useCallback((id: string) => {
        setWorkflow((prev) => {
            if (prev.nodes.length <= 1) {
                return prev;
            }
            return { ...prev, nodes: prev.nodes.filter((node) => node.id !== id) };
        });
    }, []);

    const handleDragStart = useCallback((event: React.DragEvent<HTMLDivElement>, id: string) => {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", id);
        setDraggingId(id);
    }, []);

    const handleDragEnd = useCallback(() => {
        setDraggingId(null);
        setHoverEdgeIndex(null);
        setHoverNodeId(null);
    }, []);

    const handleEdgeDrop = useCallback(
        (index: number) => {
            if (!draggingId) {
                return;
            }
            setWorkflow((prev) => {
                const nodes = [...prev.nodes];
                const fromIndex = nodes.findIndex((node) => node.id === draggingId);
                if (fromIndex === -1) {
                    return prev;
                }
                const [draggedNode] = nodes.splice(fromIndex, 1);
                let insertIndex = index;
                if (fromIndex < index) {
                    insertIndex -= 1;
                }
                nodes.splice(insertIndex, 0, draggedNode);
                return { ...prev, nodes };
            });
            setHoverEdgeIndex(null);
            setDraggingId(null);
        },
        [draggingId],
    );

    const handleNodeDrop = useCallback(
        (targetId: string) => {
            if (!draggingId || draggingId === targetId) {
                return;
            }
            setWorkflow((prev) => {
                const nodes = [...prev.nodes];
                const sourceIndex = nodes.findIndex((node) => node.id === draggingId);
                const targetIndex = nodes.findIndex((node) => node.id === targetId);
                if (sourceIndex === -1 || targetIndex === -1) {
                    return prev;
                }
                const temp = nodes[sourceIndex];
                nodes[sourceIndex] = nodes[targetIndex];
                nodes[targetIndex] = temp;
                return { ...prev, nodes };
            });
            setHoverNodeId(null);
            setDraggingId(null);
        },
        [draggingId],
    );

    const handleNodeDoubleClick = useCallback(
        (id: string) => {
            const target = workflow.nodes.find((node) => node.id === id);
            if (!target) {
                return;
            }
            setEditingId(id);
            setDraftTitle(target.title);
        },
        [workflow.nodes],
    );

    const commitTitle = useCallback(() => {
        if (!editingId) {
            return;
        }
        setWorkflow((prev) => ({
            ...prev,
            nodes: prev.nodes.map((node) =>
                node.id === editingId ? { ...node, title: draftTitle.trim() || node.title } : node,
            ),
        }));
        setEditingId(null);
        setDraftTitle("");
    }, [draftTitle, editingId]);

    // autosize textarea when draftTitle changes or when editing starts
    useEffect(() => {
        const el = editingRef.current;
        if (!el) return;
        el.style.height = '0px';
        const scrollHeight = el.scrollHeight;
        el.style.height = `${Math.min(scrollHeight, 320)}px`;
    }, [draftTitle, editingId]);

    const cancelEditing = useCallback(() => {
        setEditingId(null);
        setDraftTitle("");
    }, []);

    const handleNext = useCallback(() => {
        const wordsPayload: Word[] = workflow.nodes.map((node, index) => ({
            priority: index + 1,
            index: node.title,
            iconNumber: node.iconNumber,
        }));

        const payload = { words: wordsPayload };
        console.log("[Step2] Workflow payload:", payload);
        onNext?.(payload);
    }, [onNext, workflow.nodes]);

    

    return (
        <s.Container>



            <s.WorkflowCanvas>
                {workflow.nodes.map((node, index) => (
                    <React.Fragment key={node.id}>
                        <s.NodeCard
                            draggable
                            onDragStart={(event) => handleDragStart(event, node.id)}
                            onDragEnd={handleDragEnd}
                            onDragOver={(event: React.DragEvent<HTMLDivElement>) => event.preventDefault()}
                            onDragEnter={() => setHoverNodeId(node.id)}
                            onDragLeave={() => setHoverNodeId((prev) => (prev === node.id ? null : prev))}
                            onDrop={(event: React.DragEvent<HTMLDivElement>) => {
                                event.preventDefault();
                                handleNodeDrop(node.id);
                            }}
                            onDoubleClick={() => handleNodeDoubleClick(node.id)}
                            isDragging={draggingId === node.id}
                            isDropTarget={hoverNodeId === node.id}
                        >
                            <s.RemoveButton type="button" onClick={() => handleRemoveNode(node.id)}>
                                <PiXBold size={12} />
                            </s.RemoveButton>
                            <s.NodeIcon>{workflowIconMap[node.icon]}</s.NodeIcon>
                            {editingId === node.id ? (
                                <s.NodeTitleInput
                                    ref={editingRef}
                                    value={draftTitle}
                                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setDraftTitle(event.target.value)}
                                    autoFocus
                                    onBlur={commitTitle}
                                    onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
                                        if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
                                            // allow cmd/ctrl+Enter to commit
                                            event.preventDefault();
                                            commitTitle();
                                        }
                                        if (event.key === "Escape") {
                                            event.preventDefault();
                                            cancelEditing();
                                        }
                                    }}
                                />
                            ) : (
                                <s.NodeTitle>{node.title}</s.NodeTitle>
                            )}
                        </s.NodeCard>
                        <s.EdgeDropZone
                            role="button"
                            aria-label="이 위치에 놓기"
                            onDragEnter={(event: React.DragEvent<HTMLDivElement>) => {
                                event.preventDefault();
                                setHoverEdgeIndex(index + 1);
                            }}
                            onDragOver={(event: React.DragEvent<HTMLDivElement>) => event.preventDefault()}
                            onDragLeave={() =>
                                setHoverEdgeIndex((prev) => (prev === index + 1 ? null : prev))
                            }
                            onDrop={(event: React.DragEvent<HTMLDivElement>) => {
                                event.preventDefault();
                                handleEdgeDrop(index + 1);
                            }}
                            isActive={hoverEdgeIndex === index + 1}
                        />
                    </React.Fragment>
                ))}
                <s.AddNodeButton type="button" onClick={handleAddNode}>
                    <PiPlusBold size={18} />
                </s.AddNodeButton>
            </s.WorkflowCanvas>

            <s.InfoBox>
                각 단계를 클릭하여 이름을 수정하거나 드래그해 순서를 변경할 수 있습니다. X 버튼을 눌러 삭제하거나 + 버튼으로 새 단계를 추가할 수
                있습니다.
            </s.InfoBox>

            <s.ControlGroup>
                <s.ButtonRow>
                <s.Button variant="secondary" type="button" onClick={onBack} disabled={isProcessing}>취소</s.Button>
                <s.Button variant="primary" type="submit" onClick={handleNext} disabled={isProcessing}>다음</s.Button>
                    </s.ButtonRow>
            </s.ControlGroup>
        
        </s.Container>
    );
}
