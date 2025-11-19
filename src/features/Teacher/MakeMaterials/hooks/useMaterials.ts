import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { createAgentAndGetFlow, PostMaterialsRequest, AgentFlowResponse } from '../api';

type UsePostMaterialsOptions = Omit<UseMutationOptions<AgentFlowResponse, Error, PostMaterialsRequest>, 'mutationFn'>;

export const usePostMaterials = (options?: UsePostMaterialsOptions) => {
  return useMutation({
    mutationFn: createAgentAndGetFlow,
    ...options,
  });
};
