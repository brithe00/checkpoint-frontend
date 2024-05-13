import { useQuery } from '@apollo/client';
import { GET_COUNTRIES } from '../graphql/client';

import Link from 'next/link';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

export default function Countries() {
	const { loading, error, data } = useQuery(GET_COUNTRIES);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	return (
		<>
			<div className="flex justify-center items-center min-h-screen">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl w-full px-4">
					{data.countries.map((country) => (
						<div key={country.id} className="p-2">
							<Card key={country.id}>
								<CardHeader>
									<CardTitle>
										#{country.id} - {country.name}
									</CardTitle>
									<CardDescription>{country.continent?.name}</CardDescription>
								</CardHeader>
								<CardContent className="text-9xl">{country.emoji}</CardContent>
								<CardFooter>
									<Button asChild>
										<Link href={`/countries/${country.code}`}>Details</Link>
									</Button>
								</CardFooter>
							</Card>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
