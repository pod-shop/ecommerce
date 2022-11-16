import { createContext, useMemo, useContext, ProviderProps } from 'react';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';

const GlobalDataContext = createContext({
  users: []
});

export const GlobalDataProdiver = (props: JSX.IntrinsicAttributes & ProviderProps<{ users: never[]; }>) => {
  const { data: users } = useSWR('/api/users', fetcher);
  const { data: items } = useSWR('/api/items', fetcher);

  const value = useMemo(() =>
  ({
    users, items
  }), [users, items]);

  return <GlobalDataContext.Provider {...props} value={value} />
}

export const useGlobalData = () => {
  const context = useContext(GlobalDataContext);
  if (!context) throw new Error("Need to wrap GlobalDataProdiver");
  return context;
}
