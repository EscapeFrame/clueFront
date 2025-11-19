import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { postAgentDoc, AgentDocResponse, Word } from '../api';

interface PostAgentDocPayload {
  agentId: string;
  words: Word[];
}

type UsePostAgentDocOptions = Omit<UseMutationOptions<AgentDocResponse, Error, PostAgentDocPayload>, 'mutationFn'>;

export const usePostAgentDoc = (options?: UsePostAgentDocOptions) => {
  return useMutation({
    mutationFn: ({ agentId, words }) => postAgentDoc(agentId, words),
    ...options,
  });
};
