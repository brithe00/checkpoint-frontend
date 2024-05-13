import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { useRouter } from 'next/router';

import { useQuery, useMutation } from '@apollo/client';
import { GET_CONTINENTS, CREATE_COUNTRY } from '../../graphql/client';

import { SubmitHandler, useForm } from 'react-hook-form';

const NewCountry = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		reset,
	} = useForm();

	const router = useRouter();

	const { loading, error, data } = useQuery(GET_CONTINENTS);

	const [
		createCountry,
		{
			data: createCountryData,
			loading: createCountryLoading,
			error: createCountryError,
		},
	] = useMutation(CREATE_COUNTRY);

	if (loading || createCountryLoading) return <p>Loading...</p>;
	if (error) return <p>Error : {error.message}</p>;
	if (createCountryError) return <p>Error : {createCountryError.message}</p>;

	const onSubmit = async (data) => {
		try {
			console.log(data);
			const result = await createCountry({
				variables: {
					data: {
						name: data.name,
						code: data.code,
						emoji: data.emoji,
					},
				},
			});
			console.log('result', result);
			reset();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div class="flex items-center justify-center h-screen">
			<Card className="w-[350px]">
				<form onSubmit={handleSubmit(onSubmit)}>
					<CardHeader>
						<CardTitle>Create country</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid w-full items-center gap-4">
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="name">Name</Label>
								<Input id="name" placeholder="Name of the country" />
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="code">Country Code</Label>
								<Input id="code" placeholder="Code of the country" />
							</div>
							<div className="flex flex-col space-y-1.5">
								<Label htmlFor="emoji">Emoji</Label>
								<Input id="emoji" placeholder="Emoji of the country" />
							</div>
							{/* <div className="flex flex-col space-y-1.5">
								<Label htmlFor="continent">Continent</Label>
								<Select>
									<SelectTrigger id="continent">
										<SelectValue placeholder="Select" />
									</SelectTrigger>
									<SelectContent position="popper">
										{data.continents.map((continent) => (
											<SelectItem key={continent.id} value={continent.id}>
												{continent.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div> */}
						</div>
					</CardContent>
					<CardFooter className="flex justify-end">
						<Button type="submit">Create</Button>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
};

export default NewCountry;
