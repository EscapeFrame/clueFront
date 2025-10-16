import React, { useState, useCallback } from 'react';
import Header from '@/linkSave/entities/Header'; // 제공해주신 경로
import LinkCardList from '@/linkSave/components/CardList';
import LinkFormModal from '@/linkSave/components/Modal';
import DeleteConfirmModal from '@/linkSave/components/Modal/Delete';
import * as S from './styles';
import { LinkCard, LinkFormData } from '@/linkSave/types/card';

export const LinkSaveMain = () => {
    const [activeCategory, setActiveCategory] = useState('전체');
    const [searchQuery, setSearchQuery] = useState('');
    
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'추가' | '수정'>('추가');
    const [selectedCard, setSelectedCard] = useState<LinkCard | null>(null); // 수정/삭제 대상 카드

    // 임시 카드 목록 (실제는 API로 대체)
    const [cards, setCards] = useState<LinkCard[]>([
        { id: '1', date: '2025-12-31', title: 'Title', explanation: 'explanation', url: 'https://example.com/1', tags: ['반'] },
        { id: '2', date: '2025-12-31', title: 'Title 2', explanation: 'explanation 2', url: 'https://example.com/2', tags: ['전공과목'] },
    ]);

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query.toLowerCase());
    }, []);


    // === 이벤트 핸들러 ===

    // 1. 링크 추가 버튼 클릭 (Header에서 호출)
    const handleAddLinkClick = useCallback(() => {
        setModalMode('추가');
        setSelectedCard(null); // 초기화
        setIsFormModalOpen(true);
    }, []);
    
    // 2. 카드 수정 버튼 클릭 (LinkCardItem에서 호출)
    const handleEditLinkClick = useCallback((card: LinkCard) => {
        setModalMode('수정');
        setSelectedCard(card);
        setIsFormModalOpen(true);
    }, []);

    // 3. 카드 삭제 버튼 클릭 (LinkCardItem에서 호출)
    const handleDeleteLinkClick = useCallback((card: LinkCard) => {
        setSelectedCard(card);
        setIsDeleteModalOpen(true);
    }, []);


    // 4. 추가/수정 폼 제출 (LinkFormModal에서 호출)
    const handleFormSubmit = useCallback((data: LinkFormData, cardId?: string) => {
        if (cardId) {
            // 수정 로직 (API: PUT/PATCH)
            console.log(`수정 요청 - ID: ${cardId}`, data);
            setCards(prev => prev.map(card => 
                card.id === cardId 
                    ? { ...card, ...data } // ...data가 title, url, explanation, tags를 업데이트
                    : card
            ));
        } else {
            // 추가 로직 (API: POST)
            console.log('추가 요청', data);
            const newCard: LinkCard = { 
                ...data, 
                id: Date.now().toString(), 
                date: new Date().toISOString().split('T')[0] 
            };
            setCards(prev => [newCard, ...prev]);
        }
    }, []);


    // 5. 삭제 확인 (DeleteConfirmModal에서 호출)
    const handleConfirmDelete = useCallback((cardId: string) => {
        // 삭제 로직 (API: DELETE)
        console.log(`삭제 확정 - ID: ${cardId}`);
        setCards(prev => prev.filter(card => card.id !== cardId));
        setSelectedCard(null);
    }, []);

    const filteredCards = cards.filter(card => {
        const categoryMatch = activeCategory === '전체' || card.tags.includes(activeCategory);
        const searchMatch = card.title.toLowerCase().includes(searchQuery);
        return categoryMatch && searchMatch;
    });
    

    return (
        <S.Wrapper>
            {/* Header 영역 */}
            <div>
                <Header 
                    onAddLink={handleAddLinkClick} 
                    onSelectCategory={setActiveCategory}
                    activeCategory={activeCategory}
                    onSearch={handleSearch}
                />
            </div>
            
            {/* Content 영역 (카드 목록) */}
            <div>
                {/* LinkCardList에 현재 상태를 전달 */}
                <LinkCardList 
                    cards={filteredCards} // 필터링되지 않은 전체 목록
                    activeCategory={activeCategory} // 필터링에 사용
                    onEdit={handleEditLinkClick}
                    onDelete={handleDeleteLinkClick}
                />
            </div>

            {/* 링크 추가/수정 모달 */}
            <LinkFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                modalTitle={modalMode === '추가' ? '링크 추가' : '링크 수정'}
                initialData={selectedCard || undefined}
                onSubmit={handleFormSubmit}
            />

            {/* 링크 삭제 모달 */}
            <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                cardToDelete={selectedCard}
                onConfirm={handleConfirmDelete}
            />
        </S.Wrapper>
    );
};

export default LinkSaveMain;