import Customapi from '@/shared/config/api';

export interface PostMaterialsRequest {
  studing_name: string;
  learning_purpose: string;
  main_word: string[];
  link: string[];
}

export const postMaterials = async (data: PostMaterialsRequest) => {
  const response = await Customapi.post('/api/v1/agents', data);
  return response.data;
};
