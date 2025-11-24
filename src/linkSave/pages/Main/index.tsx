import React, { useState, useCallback } from 'react';
import Header from '@/linkSave/entities/Header';
import LinkCardList from '@/linkSave/components/CardList';
import LinkFormModal from '@/linkSave/components/Modal';
import DeleteConfirmModal from '@/linkSave/components/Modal/Delete';
import * as S from './styles';
import { LinkCard, LinkFormData, LINK_CATEGORY_ENGLISH_MAP, LinkCategoryKorean } from '@/linkSave/types/card';
import { useContext } from 'react';
import { UserContext } from '@/entities/Context/LoginContext';
import { useGetAlllinks, useAddLink, useDeleteLink, useUpdateLink } from '@/linkSave/hooks/useLinkSave';

export const LinkSaveMain = () => {
    const [activeCategory, setActiveCategory] = useState('전체');
    const [searchQuery, setSearchQuery] = useState('');

    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'추가' | '수정'>('추가');
    const [selectedCard, setSelectedCard] = useState<LinkCard | null>(null); // 수정/삭제 대상 카드

    const { data: cardsData, isLoading, isError, error } = useGetAlllinks();
    const addLinkMutation = useAddLink();
    const updateLinkMutation = useUpdateLink();
    const deleteLinkMutation = useDeleteLink();

    // cardsData가 배열이 아닐 경우 빈 배열로 초기화
    const cards: LinkCard[] = Array.isArray(cardsData) ? cardsData : [];

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query.toLowerCase());
    }, []);

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
    const { user } = useContext(UserContext) || { user: null };

    const handleFormSubmit = useCallback(async (data: LinkFormData, cardId?: string) => {
        try {
            const englishData = {
                title: data.title,
                description: data.description,
                link: data.link,
                subjectType: LINK_CATEGORY_ENGLISH_MAP[data.subjectType as LinkCategoryKorean] || data.subjectType,
                authorizationType: (data as any).authorizationType,
                // include grade/class if available from logged-in user
                ...(user?.grade ? { grade: String(user.grade) } : {}),
                ...(user?.classNo ? { clas: String(user.classNo) } : {}),
            };

            if (cardId) {
                // 수정 로직
                await updateLinkMutation.mutateAsync({
                    link_id: cardId,
                    linkData: englishData
                });
                console.log(`수정 완료 - ID: ${cardId}`);
            } else {
                // 추가 로직
                await addLinkMutation.mutateAsync(englishData);
                console.log('추가 완료');
            }
            setIsFormModalOpen(false);
        } catch (error) {
            console.error('폼 제출 중 에러:', error);
            alert(modalMode === '추가' ? '링크 추가에 실패했습니다.' : '링크 수정에 실패했습니다.');
        }
    }, [addLinkMutation, updateLinkMutation, modalMode, user?.grade, user?.classNo]);


    // 5. 삭제 확인 (DeleteConfirmModal에서 호출)
    const handleConfirmDelete = useCallback(async (cardId: string) => {
        try {
            await deleteLinkMutation.mutateAsync(cardId);
            console.log(`삭제 완료 - ID: ${cardId}`);
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error('삭제 중 에러:', error);
            alert('링크 삭제에 실패했습니다.');
        }
    }, [deleteLinkMutation]);

    const filteredCards = cards.filter(card => {
        const englishCategory = LINK_CATEGORY_ENGLISH_MAP[activeCategory as LinkCategoryKorean];
        const categoryMatch = activeCategory === '전체' || (englishCategory && card.subjectType?.includes(englishCategory));
        const searchMatch = card.title?.toLowerCase().includes(searchQuery);
        return categoryMatch && searchMatch;
    });

    if (isLoading) {
        return <S.Wrapper>
            <div>
                <Header
                    onAddLink={handleAddLinkClick}
                    onSelectCategory={setActiveCategory}
                    activeCategory={activeCategory}
                    onSearch={handleSearch}
                />
            </div>
            <S.LodingText>로딩 중...</S.LodingText>
        </S.Wrapper>;
    }
    if (isError) {
        console.error('링크 조회 중 에러 발생:', error);
        return <S.Wrapper>
            <div>
                <Header
                    onAddLink={handleAddLinkClick}
                    onSelectCategory={setActiveCategory}
                    activeCategory={activeCategory}
                    onSearch={handleSearch}
                />
            </div>
            <S.ErrorText>링크를 불러오는 중 문제가 발생했습니다!</S.ErrorText>
        </S.Wrapper>;
    }

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