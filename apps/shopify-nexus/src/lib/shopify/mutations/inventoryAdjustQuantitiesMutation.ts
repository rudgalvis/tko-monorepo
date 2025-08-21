export const inventoryAdjustQuantitiesMutation = `
mutation inventoryAdjustQuantities($input: InventoryAdjustQuantitiesInput!) {
  inventoryAdjustQuantities(input: $input) {
    userErrors {
      field
      message
    }
    inventoryAdjustmentGroup {
      createdAt
      reason
      referenceDocumentUri
      changes {
        name
        delta
      }
    }
  }
}`;

export type InventoryAdjustQuantitiesReturn = {
	inventoryAdjustQuantities: {
		userErrors: {
			field: string;
			message: string;
		}[];
		inventoryAdjustmentGroup: {
			createdAt: string;
			reason: string;
			referenceDocumentUri: string;
			changes: {
				name: string;
				delta: number;
			}[];
		};
	};
};

export type InventoryAdjustQuantitiesInput = {
	input: {
		reason: string;
		name: string;
		referenceDocumentUri?: string;
		changes: {
			delta: number;
			inventoryItemId: string;
			locationId: string;
		}[];
	};
};
