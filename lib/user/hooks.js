import { fetcher } from '@/lib/fetch';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';

export function useCurrentUser() {
  return useSWR('/api/user', fetcher);
}

export function useUser(id) {
  return useSWR(`/api/users/${id}`, fetcher);
}

export function useUsers({ limit = 10 } = {}) {
  const { data, error, size, ...props } = useSWRInfinite(
    (index, previousPageData) => {
      if (previousPageData && previousPageData.users.length === 0) return null;

      const searchParams = new URLSearchParams();
      searchParams.set('limit', limit);

      return `/api/users?${searchParams.toString()}`;
    },
    fetcher,
    {
      refreshInterval: 10000,
      revalidateAll: false,
    }
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.users?.length < limit);

  return {
    data,
    error,
    size,
    isLoadingMore,
    isReachingEnd,
    ...props,
  };
}
