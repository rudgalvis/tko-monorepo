export const getProductsTagsQuery = `
    query productById($ids: [ID!]!) {
        nodes(ids: $ids) {
            ... on Product {
                id
                title
                tags
            }
        }
    }
`

export type GetProductTagsQueryVars = {
    ids: string[]
}

export type GetProductTagsQueryVarsReturn = {
    nodes: {
        id: string
        title: string
        tags: string[]
    }[]
}
