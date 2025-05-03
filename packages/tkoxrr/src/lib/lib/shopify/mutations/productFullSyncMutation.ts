export const productFullSyncMutation = `
mutation productFullSync($beforeUpdatedAt: DateTime, $id: ID!, $updatedAtSince: DateTime) {
  productFullSync(beforeUpdatedAt: $beforeUpdatedAt, id: $id, updatedAtSince: $updatedAtSince) {
    userErrors {
      field
      message
    }
  }
}`;

export type ProductFullSyncInput = {
	beforeUpdatedAt?: string; // DateTime type in GraphQL translates to string in TypeScript
	id: string; // ID type in GraphQL translates to string in TypeScript
	updatedAtSince?: string; // DateTime type in GraphQL translates to string in TypeScript
};
