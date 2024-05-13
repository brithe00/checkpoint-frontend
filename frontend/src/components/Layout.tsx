import Header from './Header';

export default function Layout({ children }) {
	return (
		<main className="main-content">
			<Header />
			{children}
		</main>
	);
}
