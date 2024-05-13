import Link from 'next/link';

export default function Header() {
	return (
		<header className="header bg-red-300 text-center py-2">
			<h1>Checkpoint : frontend</h1>
			<div className="flex flex-col">
				<Link href="/">Countries</Link>
				<Link href="/countries/new">Add Country</Link>
			</div>
		</header>
	);
}
