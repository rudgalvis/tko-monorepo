# TypeScript Patterns for TKO Monorepo

A quick reference of TypeScript patterns and best practices used across the monorepo, with emphasis on Shopify Nexus development.

## Type Safety

### Avoid `any`, Use `unknown`

```typescript
// ❌ Bad - loses all type safety
function processData(data: any) {
  return data.value
}

// ✅ Good - requires type narrowing
function processData(data: unknown) {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as { value: string }).value
  }
  throw new Error('Invalid data structure')
}
```

### Prefer `null` Over `undefined`

```typescript
// ❌ Bad - mixing null and undefined
function getUser(id: string): User | undefined {
  return users.find(u => u.id === id)
}

// ✅ Good - consistent null usage
function getUser(id: string): User | null {
  return users.find(u => u.id === id) ?? null
}
```

## Early Exit Pattern

Exit early from functions to reduce nesting and improve readability.

```typescript
// ❌ Bad - nested conditions
async function getProduct(id: string) {
  const data = await fetchProduct(id)
  if (data) {
    if (data.product) {
      if (data.product.status === 'ACTIVE') {
        return data.product
      } else {
        throw new Error('Product not active')
      }
    } else {
      throw new Error('Product not found')
    }
  } else {
    throw new Error('No data returned')
  }
}

// ✅ Good - early exits
async function getProduct(id: string) {
  const data = await fetchProduct(id)
  
  if (!data) {
    throw new Error('No data returned')
  }
  
  if (!data.product) {
    throw new Error('Product not found')
  }
  
  if (data.product.status !== 'ACTIVE') {
    throw new Error('Product not active')
  }
  
  return data.product
}
```

## Nullish Coalescing & Optional Chaining

### Nullish Coalescing (`??`)

Provides defaults only for `null` or `undefined`, not for other falsy values like `0` or `''`.

```typescript
// ❌ Bad - || treats 0 as falsy
const quantity = product.quantity || 10  // 0 becomes 10
const price = product.price || 0         // Could hide actual 0 price

// ✅ Good - ?? only replaces null/undefined
const quantity = product.quantity ?? 10  // 0 stays 0
const price = product.price ?? 0         // Only replaces null/undefined

// ✅ Good - with optional chaining
const amount = product.variant?.price?.amount ?? 0
const currency = product.variant?.price?.currencyCode ?? 'USD'
```

### Optional Chaining (`?.`)

Safely access nested properties without explicit null checks.

```typescript
// ❌ Bad - verbose null checks
const price = product && product.variant && product.variant.price 
  ? product.variant.price.amount 
  : 0

// ✅ Good - optional chaining
const price = product?.variant?.price?.amount ?? 0

// ✅ Good - works with arrays
const firstImage = product?.images?.[0]?.url ?? '/default.jpg'

// ✅ Good - works with method calls
const result = repository?.getData?.()
```

## Array Methods

### Filter Boolean

Remove falsy values from arrays using `.filter(Boolean)`.

```typescript
// ❌ Bad - verbose filtering
const validProducts = products.filter(p => p !== null && p !== undefined)

// ✅ Good - concise filtering
const validProducts = products.filter(Boolean)

// ✅ Good - with map
const productIds = products
  .filter(Boolean)
  .map(p => p.id)

// Example: filtering multiple types of falsy values
const values = [0, '', null, undefined, 'hello', false, 'world']
const truthy = values.filter(Boolean)  // [0, 'hello', 'world'] - note: 0 stays!
```

### Chaining Array Methods

```typescript
// ✅ Good - readable chain
const activeProductIds = products
  .filter(p => p.status === 'ACTIVE')
  .filter(p => p.publishedAt !== null)
  .map(p => p.id)

// ✅ Good - with flatMap
const allVariantIds = products
  .flatMap(p => p.variants)
  .filter(v => v.availableForSale)
  .map(v => v.id)
```

## Type Assertions vs Type Guards

### When to Use Type Assertions

Use type assertions (`as`) sparingly and only when you have more information than TypeScript.

```typescript
// ⚠️ Use sparingly - only when you know better than TypeScript
const data = JSON.parse(response) as ProductData

// ✅ Better - validate before asserting
function isProductData(data: unknown): data is ProductData {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'title' in data
  )
}

const data = JSON.parse(response)
if (isProductData(data)) {
  // TypeScript knows data is ProductData here
  console.log(data.title)
}
```

## Error Handling

### Throw Errors for Better Debugging

```typescript
// ❌ Bad - silent failures
async function getProduct(id: string) {
  const { data, errors } = await client.request(query, { variables: { id } })
  if (errors) console.error(errors)
  if (!data) return null
  return data.product
}

// ✅ Good - explicit error throwing
async function getProduct(id: string) {
  const { data, errors } = await client.request(query, { variables: { id } })
  
  if (errors) {
    throw new Error(`Failed to get product: ${JSON.stringify(errors)}`)
  }
  
  if (!data) {
    throw new Error('No data returned from Shopify API')
  }
  
  return data.product
}
```

### Descriptive Error Messages

```typescript
// ❌ Bad - generic errors
if (!product) throw new Error('Error')

// ✅ Good - descriptive errors
if (!product) {
  throw new Error(`Product not found: ${productId}`)
}

// ✅ Good - include context
if (variant.compareAtPrice === null) {
  throw new Error(
    `Variant ${variant.id} in product ${product.title} has no compareAtPrice`
  )
}
```

## Strict Typing

### Avoid Implicit Any

```typescript
// ❌ Bad - implicit any
function processItems(items) {  // items: any
  return items.map(item => item.id)  // item: any
}

// ✅ Good - explicit types
function processItems(items: Product[]): string[] {
  return items.map(item => item.id)
}

// ✅ Good - with generics
function processItems<T extends { id: string }>(items: T[]): string[] {
  return items.map(item => item.id)
}
```

### Type Exports

Export types alongside implementation for reusability.

```typescript
// ✅ Good - export types
export const getProductQuery = `
  query getProduct($id: ID!) {
    product(id: $id) {
      id
      title
    }
  }
`

export type GetProductResponse = {
  product: {
    id: string
    title: string
  }
}

export type GetProductVars = {
  id: string
}
```

## Destructuring with Defaults

```typescript
// ✅ Good - destructure with defaults
async function getProducts({ 
  first = 50, 
  after 
}: { 
  first?: number
  after?: string 
} = {}) {
  // first is guaranteed to be a number
  return fetchProducts({ first, after })
}

// ✅ Good - with nullish coalescing
const { 
  title = 'Untitled', 
  price 
} = product

const finalPrice = price ?? 0
```

## Type Narrowing

```typescript
// ✅ Good - typeof narrowing
function processValue(value: string | number) {
  if (typeof value === 'string') {
    return value.toUpperCase()  // TypeScript knows it's string
  }
  return value.toFixed(2)  // TypeScript knows it's number
}

// ✅ Good - truthiness narrowing
function processProduct(product: Product | null) {
  if (!product) {
    throw new Error('Product is required')
  }
  // TypeScript knows product is not null here
  return product.title
}

// ✅ Good - in operator narrowing
function hasProperty(obj: unknown): obj is { id: string } {
  return typeof obj === 'object' && obj !== null && 'id' in obj
}
```

## Const Assertions

Make objects and arrays deeply readonly.

```typescript
// ✅ Good - const assertion for literal types
const STATUS = {
  ACTIVE: 'ACTIVE',
  DRAFT: 'DRAFT',
  ARCHIVED: 'ARCHIVED'
} as const

type ProductStatus = typeof STATUS[keyof typeof STATUS]
// ProductStatus = 'ACTIVE' | 'DRAFT' | 'ARCHIVED'

// ✅ Good - with arrays
const COLORS = ['red', 'blue', 'green'] as const
type Color = typeof COLORS[number]
// Color = 'red' | 'blue' | 'green'
```

## Common Patterns in Shopify Nexus

### GID Extraction

```typescript
// Extract numeric ID from Shopify GID
const productNumericId = product.node.id.split('/').pop()
const variantNumericId = variant.node.id.split('/').pop()

// ✅ Better - with safety
function extractNumericId(gid: string): string {
  const id = gid.split('/').pop()
  if (!id) {
    throw new Error(`Invalid GID format: ${gid}`)
  }
  return id
}
```

### Price Amount Conversion

```typescript
// Convert string amounts to numbers
const price = {
  ...variant.node.price,
  amount: +variant.node.price.amount  // Unary plus for string -> number
}

// ✅ Alternative - more explicit
const price = {
  ...variant.node.price,
  amount: parseFloat(variant.node.price.amount)
}
```

### Flattening GraphQL Responses

```typescript
// ✅ Good - flatten edges pattern
const products = data.products.edges.map(edge => edge.node)

// ✅ Good - with filtering
const activeProducts = data.products.edges
  .map(edge => edge.node)
  .filter(product => product.status === 'ACTIVE')

// ✅ Good - with flatMap for nested data
const allVariants = data.products.edges.flatMap(productEdge =>
  productEdge.node.variants.edges.map(variantEdge => variantEdge.node)
)
```

---

**Summary**: Write strictly typed, defensive code with early exits, proper error handling, and modern TypeScript features. Prioritize readability and maintainability over cleverness.

