import {
	type ProductFullSyncInput,
	productFullSyncMutation
} from '$lib/shopify/mutations/productFullSyncMutation';
import { locationsQuery, type LocationsQueryReturn } from '$lib/shopify/queries/locationsQuery';
import { BaseRepository } from '$lib/shopify/repositories/BaseRepository';

export class LocationsRepository extends BaseRepository {
	async getLocations() {
		const { data, errors } = await this.client.request<LocationsQueryReturn>(locationsQuery);

		if (errors) console.error(errors);

		if (!data) return null;

		return data.locations.edges.map((edge) => edge.node);
	}

	//TODO: better place
	async productFullSyncMutation(variables: ProductFullSyncInput) {
		const { data, errors } = await this.client.request(productFullSyncMutation, {
			variables
		});

		console.log({ data, errors });

		if (errors) console.error(errors);

		if (!data) return null;

		return data;
	}
}
