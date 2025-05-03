export const locationsQuery = `
query {
  locations(first: 5) {
    edges {
      node {
        id
        name
        address {
          formatted
        }
      }
    }
  }
}
`;

type Location = {
	id: string;
	name: string;
	address: {
		formatted: string;
	};
};

type LocationEdge = {
	node: Location;
};

export type LocationsQueryReturn = {
	locations: {
		edges: LocationEdge[];
	};
};
