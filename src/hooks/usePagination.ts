import { useState, useCallback } from 'react';

export interface PagedResponse<T> {
  items: T[];
  total: number;
  hasNextPage: boolean;
  nextCursor?: string | null;
}

export function usePagination<T>(
  fetchFunction: (limit: number, cursor?: string) => Promise<PagedResponse<T>>,
  pageSize: number = 10
) {
  const [data, setData] = useState<T[]>([]);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadPage = useCallback(async () => {
    if (loading) return;

    try {
      setLoading(true);
      const response = await fetchFunction(pageSize, cursor);
      
      setData(prev => [...prev, ...response.items]);
      setCursor(response.nextCursor || undefined);
      setHasMore(response.hasNextPage);
      setError(null);
      
      return response;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [cursor, fetchFunction, loading, pageSize]);

  const refresh = useCallback(async () => {
    setData([]);
    setCursor(undefined);
    setHasMore(true);
    return loadPage();
  }, [loadPage]);

  return {
    data,
    cursor,
    hasMore,
    loading,
    error,
    loadPage,
    refresh,
  };
}
