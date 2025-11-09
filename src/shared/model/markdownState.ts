import { atom } from 'recoil';

export interface MarkdownSection {
  title: string;
  content: string; // #부터 \n까지의 내용
}

export const markdownSectionsState = atom<MarkdownSection[]>({
  key: 'markdownSectionsState',
  default: [],
});

