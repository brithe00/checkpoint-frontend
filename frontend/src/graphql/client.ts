import gql from 'graphql-tag';

export const GET_COUNTRIES = gql(/* GraphQL */ `
	query Countries {
		countries {
			id
			name
			code
			emoji
			continent {
				id
				name
			}
		}
	}
`);

export const GET_COUNTRY = gql(/* GraphQL */ `
	query Country($code: String!) {
		country(code: $code) {
			id
			name
			code
			emoji
			continent {
				id
				name
			}
		}
	}
`);

export const GET_CONTINENTS = gql(/* GraphQL */ `
	query Continents {
		continents {
			id
			name
		}
	}
`);

export const CREATE_COUNTRY = gql(/* GraphQL */ `
	mutation AddCountry($data: NewCountryInput!) {
		addCountry(data: $data) {
			id
			name
			code
			emoji
			# continent {
			# 	id
			# 	name
			# }
		}
	}
`);
