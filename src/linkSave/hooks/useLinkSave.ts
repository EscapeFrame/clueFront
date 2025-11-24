import { useQuery, useMutation, useQueryClient, useInfiniteQuery, QueryFunctionContext, UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";
import { fetchLinks, fetchAllLinks, addLink, updateLink, deleteLink } from "../service/linksave";
import { LinkFormData, LinkCard } from "../types/card";

// 1. 모든 링크 조회 (useGetAlllinks)
export const useGetAlllinks = (size = 40): UseInfiniteQueryResult<InfiniteData<LinkCard[]>, Error> => {
    return useInfiniteQuery<LinkCard[], Error, InfiniteData<LinkCard[]>, [string, number]>({
        queryKey: ['allLinks', size],
        queryFn: async (context: QueryFunctionContext) => {
            const pageParam = context.pageParam as unknown;
            const offset = typeof pageParam === 'number' ? pageParam : 0;
            const data = await fetchAllLinks(size, offset);
            return data as LinkCard[];
        },
        getNextPageParam: (lastPage, allPages) => {
            // lastPage은 배열로 받아옴. 페이지가 비었거나 길이가 0이면 더 이상 없음
            if (!lastPage || (Array.isArray(lastPage) && lastPage.length === 0)) return undefined;
            // 다음 offset은 현재 불러온 총 개수
            const nextOffset = allPages.reduce((sum, p) => sum + (Array.isArray(p) ? p.length : 0), 0);
            return nextOffset;
        },
        initialPageParam: 0,
        staleTime: 1000 * 60 * 5, // 5분
        gcTime: 1000 * 60 * 10, // 10분
        refetchOnWindowFocus: false,
    });
};

// 2. 단일 링크 조회 (useGetLinks)
export const useGetLinks = (link_id: string) => {
    return useQuery({
        queryKey: ['links', link_id],
        queryFn: () => fetchLinks(link_id),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
        enabled: !!link_id,
    });
};

// 3. 링크 추가 (useAddLink)
export const useAddLink = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (linkData: LinkFormData) => addLink(linkData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allLinks'] });
        },
    });
};

// 4. 링크 수정 (useUpdateLink)
export const useUpdateLink = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ link_id, linkData }: { link_id: string, linkData: Partial<LinkFormData> }) => updateLink({ link_id, linkData }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allLinks'] });
            queryClient.invalidateQueries({ queryKey: ['links'] });
        },
    });
};

// 5. 링크 삭제 (useDeleteLink)
export const useDeleteLink = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (linkId: string) => deleteLink(linkId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['allLinks'] });
            queryClient.invalidateQueries({ queryKey: ['links'] });
        },
    });
};
