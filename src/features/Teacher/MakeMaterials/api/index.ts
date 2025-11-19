import Customapi from '@/shared/config/api';

export interface PostMaterialsRequest {
  studing_name: string;
  learning_purpose: string;
  main_word: string[];
  link: string[];
}

export interface PostMaterialsResponse {
  words: string[];
}

export const postMaterials = async (data: PostMaterialsRequest): Promise<PostMaterialsResponse> => {
  const response = await Customapi.post('/api/v1/agents', data);
  return response.data;
};
