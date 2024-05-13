import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import Layout from '../components/Layout';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

let backend_url = 'http://localhost:4000/graphql';

const client = new ApolloClient({
	uri: backend_url,
	cache: new InMemoryCache(),
});

function App({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={client}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ApolloProvider>
	);
}

// Disabling SSR
export default dynamic(() => Promise.resolve(App), { ssr: false });
