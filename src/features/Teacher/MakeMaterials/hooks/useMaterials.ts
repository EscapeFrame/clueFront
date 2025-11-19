import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { postMaterials, PostMaterialsRequest, PostMaterialsResponse } from '../api';

type UsePostMaterialsOptions = Omit<UseMutationOptions<PostMaterialsResponse, Error, PostMaterialsRequest>, 'mutationFn'>;

export const usePostMaterials = (options?: UsePostMaterialsOptions) => {
  return useMutation({
    mutationFn: postMaterials,
    ...options,
  });
};
