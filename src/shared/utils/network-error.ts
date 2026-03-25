export const handleNetworkError = (error: unknown): string => {
  const errorMessage = error instanceof Error ? error.message : "Network error occurred";
  return `Network Error: ${errorMessage}`;
};

export const createNetworkSafeFetch = (baseUrl: string) => {
  return async (endpoint: string, options?: RequestInit): Promise<Response> => {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, options);

      if (!response.ok) {
        const errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      return response;
    } catch (error) {
      const networkError = handleNetworkError(error);
      throw new Error(networkError);
    }
  };
};