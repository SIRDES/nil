import { useState, useEffect, useCallback } from "react";

interface UseFetchResult<T> {
 data: T[];
 loading: boolean;
 error: string | null;
 refetch: () => void;
}

/**
 * Lightweight data-fetching hook for admin dashboard views.
 * Fetches on mount, provides loading/error states, and a refetch callback.
 */
export default function useFetch<T>(url: string): UseFetchResult<T> {
 const [data, setData] = useState<T[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 const fetchData = useCallback(async () => {
 setLoading(true);
 setError(null);
 try {
 const res = await fetch(url);
 if (!res.ok) throw new Error(`Failed to fetch (${res.status})`);
 const json = await res.json();
 setData(Array.isArray(json) ? json : []);
 } catch (err) {
 setError(err instanceof Error ? err.message : "Unknown error");
 } finally {
 setLoading(false);
 }
 }, [url]);

 useEffect(() => {
 fetchData();
 }, [fetchData]);

 return { data, loading, error, refetch: fetchData };
}
