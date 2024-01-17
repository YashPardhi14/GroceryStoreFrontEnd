export interface GroceryDetails {

    item_id?: number;
    groceryName: string;
    costPerItem: number;
    groceryAmounts: {
      id?: number;
      itemsAvailable: number;
      totalCostOfItems?: number;
    };
    grocerySource: {
      source_id?: number;
      stateName?: string;
    };
}
