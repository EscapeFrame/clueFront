import Customapi from '@/shared/config/api';

// ================= Step 1: POST /api/v1/agents =================

export interface PostMaterialsRequest {
  studing_name: string;
  learning_purpose: string;
  main_word: string[];
  link: string[];
}

interface PostInitialAgentResponse {
  data: {
    status: string;
    agent_id: string;
    created_at: string;
  };
  message: string;
}

const postInitialAgent = async (data: PostMaterialsRequest): Promise<PostInitialAgentResponse> => {
  const response = await Customapi.post('/api/v1/agents', data);
  return response.data;
};


// ================= Step 2: POST /api/v1/agents/{agent_id}/flow =================

export interface Word {
  priority: number;
  index: string;
  iconNumber: number;
}

export interface AgentFlowResponse {
  data: {
    agentId: string;
    status: string;
    flow: {
      words: Word[];
    };
  };
  message: string;
}

const postAgentFlow = async (agentId: string): Promise<AgentFlowResponse> => {
  const response = await Customapi.post(`/api/v1/agents/${agentId}/flow`);
  return response.data;
};


// ================= Orchestrator =================

export const createAgentAndGetFlow = async (data: PostMaterialsRequest): Promise<AgentFlowResponse> => {
  // Step 1: Create the agent and get the ID
  const initialResponse = await postInitialAgent(data);
  const agentId = initialResponse.data.agent_id;

  // Step 2: Use the ID to get the flow data
  const flowResponse = await postAgentFlow(agentId);
  
  return flowResponse;
};
