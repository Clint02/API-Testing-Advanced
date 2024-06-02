export const productSchema = {
  type: 'object',
  required: ['id', 'title', 'description', 'category', 'price'],
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    description: { type: 'string' },
    category: { type: 'string' },
    price: { type: 'number' },
  },
}
