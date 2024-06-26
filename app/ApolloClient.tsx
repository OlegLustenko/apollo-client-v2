import { HttpLink } from '@apollo/client';
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';
import { typdefsAlmansi } from 'api/querries/almansi.typedefs';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      uri: 'https://graphqlzero.almansi.me/api',
      fetchOptions: { cache: 'no-store' },
    }),
    typeDefs: typdefsAlmansi,
  });
});
