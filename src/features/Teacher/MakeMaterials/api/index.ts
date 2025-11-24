import Customapi from '@/shared/config/api';

// ================= Step 1: POST /api/v1/agents =================

export interface PostMaterialsRequest {
  studying_name: string;
  learning_purpose: string;
  main_words: string[];
  links: string[];
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

// The raw response from POST /agents/{agentId}/flow may have a different shape
// (e.g., { success, message, data: { words: [...] }, error }). We keep
// postAgentFlow as a thin wrapper returning the raw data, and normalize it
// in createAgentAndGetFlow.
const postAgentFlow = async (agentId: string): Promise<unknown> => {
  const response = await Customapi.post(`/api/v1/agents/${agentId}/flow`);
  return response.data;
};

// ================= PATCH /api/v1/agents/{agent_id}/flow =================
export const patchAgentFlow = async (agentId: string, words: Word[]): Promise<AgentFlowResponse> => {
  const response = await Customapi.patch(`/api/v1/agents/${agentId}/flow`, { words });
  return response.data;
};


// ================= Step 3: POST /api/v1/agents/{agent_id}/doc =================

export interface Doc {
  index: string;
  content: string;
}

export interface AgentDocResponse {
  data: {
    status: string;
    doc: {
      docs: Doc[];
    };
    agent_id: string;
  };
  message: string;
}

export const postAgentDoc = async (agentId: string, words: Word[]): Promise<AgentDocResponse> => {
  const response = await Customapi.post(`/api/v1/agents/${agentId}/doc`, { words }, { timeout: 180000 });
  const raw = response.data as Record<string, unknown>;

  // Normalize to AgentDocResponse shape: data.doc.docs
  const docs: Doc[] = (() => {
    if (!raw) return [];
    // case: data.docs
    const data = raw['data'];
    if (data && typeof data === 'object') {
      const dataObj = data as Record<string, unknown>;
      const maybeDocs = dataObj['docs'];
      if (Array.isArray(maybeDocs)) return maybeDocs as Doc[];
      const doc = dataObj['doc'];
      if (doc && typeof doc === 'object') {
        const docObj = doc as Record<string, unknown>;
        const nested = docObj['docs'];
        if (Array.isArray(nested)) return nested as Doc[];
      }
    }
    // fallback empty
    return [];
  })();

  const normalized: AgentDocResponse = {
    data: {
      status: (() => {
        if (raw['success'] === true) return 'success';
        const d = raw['data'];
        if (d && typeof d === 'object') {
          const dObj = d as Record<string, unknown>;
          const s = dObj['status'];
          if (typeof s === 'string') return s;
        }
        return 'failed';
      })(),
      doc: { docs },
      agent_id: agentId,
    },
    message: (raw['message'] as string) ?? '',
  };

  return normalized;
};


// ================= PATCH /api/v1/agents/{agent_id}/doc =================
export const patchAgentDoc = async (agentId: string, docs: Doc[]): Promise<AgentDocResponse> => {
  const response = await Customapi.patch(`/api/v1/agents/${agentId}/doc`, { docs }, { timeout: 180000 });
  const raw = response.data as Record<string, unknown>;

  const retDocs: Doc[] = (() => {
    if (!raw) return [];
    const data = raw['data'];
    if (data && typeof data === 'object') {
      const dataObj = data as Record<string, unknown>;
      const maybeDocs = dataObj['docs'];
      if (Array.isArray(maybeDocs)) return maybeDocs as Doc[];
      const doc = dataObj['doc'];
      if (doc && typeof doc === 'object') {
        const docObj = doc as Record<string, unknown>;
        const nested = docObj['docs'];
        if (Array.isArray(nested)) return nested as Doc[];
      }
    }
    return [];
  })();

  const normalized: AgentDocResponse = {
    data: {
      status: (() => {
        if (raw['success'] === true) return 'success';
        const d = raw['data'];
        if (d && typeof d === 'object') {
          const dObj = d as Record<string, unknown>;
          const s = dObj['status'];
          if (typeof s === 'string') return s;
        }
        return 'failed';
      })(),
      doc: { docs: retDocs },
      agent_id: agentId,
    },
    message: (raw['message'] as string) ?? '',
  };

  return normalized;
};


// ================= Orchestrator for Step 1 & 2 =================

export const createAgentAndGetFlow = async (data: PostMaterialsRequest): Promise<AgentFlowResponse> => {
  // Step 1: Create the agent and get the ID
  const initialResponse = await postInitialAgent(data);
  const agentId = initialResponse.data.agent_id;

  // Step 2: Use the ID to get the flow data
  const rawFlowResponse = await postAgentFlow(agentId);

  // Normalize different possible server response shapes into AgentFlowResponse
  // Expected normalized shape:
  // {
  //   data: { agentId: string, status: string, flow: { words: Word[] } },
  //   message: string
  // }

  const words: Word[] = (() => {
    if (rawFlowResponse && typeof rawFlowResponse === 'object') {
      const rfObj = rawFlowResponse as Record<string, unknown>;
      const data = rfObj.data;
      if (data && typeof data === 'object') {
        const dataObj = data as Record<string, unknown>;
        const maybeWords = dataObj['words'];
        if (Array.isArray(maybeWords)) {
          return maybeWords.filter((w): w is Word =>
            w && typeof w === 'object' && 'priority' in (w as object) && 'index' in (w as object) && 'iconNumber' in (w as object),
          ) as Word[];
        }
      }
      const flow = rfObj['flow'];
      if (flow && typeof flow === 'object') {
        const flowObj = flow as Record<string, unknown>;
        const maybeWords = flowObj['words'];
        if (Array.isArray(maybeWords)) {
          return maybeWords.filter((w): w is Word =>
            w && typeof w === 'object' && 'priority' in (w as object) && 'index' in (w as object) && 'iconNumber' in (w as object),
          ) as Word[];
        }
      }
    }
    return [];
  })();

  const status = (() => {
    if (rawFlowResponse && typeof rawFlowResponse === 'object') {
      const rfObj = rawFlowResponse as Record<string, unknown>;
      const success = rfObj['success'];
      if (typeof success === 'boolean') return success ? 'success' : 'failed';
      const data = rfObj['data'];
      if (data && typeof data === 'object') {
        const dataObj = data as Record<string, unknown>;
        const s = dataObj['status'];
        if (typeof s === 'string') return s;
      }
    }
    return 'unknown';
  })();

  const message = (() => {
    if (rawFlowResponse && typeof rawFlowResponse === 'object') {
      const rfObj = rawFlowResponse as Record<string, unknown>;
      const m = rfObj['message'];
      if (typeof m === 'string') return m;
    }
    return '';
  })();

  const normalized: AgentFlowResponse = {
    data: {
      agentId,
      status,
      flow: { words },
    },
    message,
  };

  return normalized;
};
