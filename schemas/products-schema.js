import { productSchema } from './product-schema.js'

export const productsSchema = {
  type: 'object',
  required: ['products', 'total', 'skip', 'limit'],
  properties: {
    products: {
      type: 'array',
      items: productSchema,
    },
    total: { type: 'number' },
    skip: { type: 'number' },
    limit: { type: 'number' },
  },
}
