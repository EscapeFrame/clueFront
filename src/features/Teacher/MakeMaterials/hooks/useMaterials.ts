import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { postMaterials, PostMaterialsRequest } from '../api';

type UsePostMaterialsOptions = Omit<UseMutationOptions<unknown, Error, PostMaterialsRequest>, 'mutationFn'>;

export const usePostMaterials = (options?: UsePostMaterialsOptions) => {
  return useMutation({
    mutationFn: postMaterials,
    ...options,
  });
};
