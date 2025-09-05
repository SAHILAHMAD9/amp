import { useEffect, useState , useCallback} from "react";
// Your Supabase client

export const useFetch = (config) => {
  const [state, setState] = useState({
    data: null,
    error: null,
    loading: false
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const result = await config.fetchFunction();
      setState({ data: result, error: null, loading: false });
      return result;
    } catch (error) {
      setState({ data: null, error, loading: false });
      throw error;
    }
  }, [config.fetchFunction]);

  const reset = useCallback(() => {
    setState({ data: null, error: null, loading: false });
  }, []);

  useEffect(() => {
    if (config.autoFetch) {
      fetchData();
    }
  }, [config.autoFetch, fetchData]);

  return {
    ...state,
    reFetch: fetchData,
    resetFunction: reset
  };
};
