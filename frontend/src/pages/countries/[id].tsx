import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_COUNTRY } from '../../graphql/client';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

const CountryDetails = () => {
	const router = useRouter();
	const countryCode = router.asPath.split('/')[2];

	const { loading, error, data } = useQuery(GET_COUNTRY, {
		variables: { code: countryCode },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;

	return (
		<div class="flex items-center justify-center h-screen">
			<Card>
				<CardHeader>
					<CardTitle>
						#{data.country.id} - {data.country.name}
					</CardTitle>
					<CardDescription>{data.country.continent.name}</CardDescription>
				</CardHeader>
				<CardContent className="text-9xl">{data.country.emoji}</CardContent>
				<CardFooter className="flex justify-between">
					Code : {data.country.code}
				</CardFooter>
			</Card>
		</div>
	);
};

export default CountryDetails;
