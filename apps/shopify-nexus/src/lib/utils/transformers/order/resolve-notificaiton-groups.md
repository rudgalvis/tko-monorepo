
## Notification Resolution Summary

The `resolve-notification-groups.ts` file analyzes orders to determine customer notifications based on product types:

### Process Flow
1. **Checks 3 notification types:**
    - **Preorders** - extracts preorder items from order lines
    - **Handmade** - queries product tags via ProductsRepository
    - **Customizations** - checks if order notes exist

2. **Creates qualifications** with items, type, and reasoning

3. **Minimizes notifications** using priority rules:
    - All 3 types → keep preorder + customization
    - Preorder + handmade → keep preorder only
    - Preorder/handmade + customization → keep customization only

### Key Features  
- Async processing for handmade tag lookups
- Smart deduplication of product variants
- Verbose logging of filtered notifications
- Prevents customer notification overload while preserving critical info

The system prioritizes customizations over other types and reduces redundant notifications through intelligent filtering.