import { useEffect, useState } from "react";
// Your Supabase client

export const useFetch = ({ fetchFunction, autoFetch = true }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchFunction();
      setData(response);
    } catch (error) {
      console.error("Supabase error:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) fetchData();
  }, []);

  const resetFunction = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return { loading, data, error, reFetch: fetchData, resetFunction };
};