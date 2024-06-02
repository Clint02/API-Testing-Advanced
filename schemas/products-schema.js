export const baseURL = 'https://dummyjson.com'

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

export const deleteSchema = {
  type: 'object',
  required: ['isDeleted', 'deletedOn'],
  properties: {
    isDeleted: { type: 'boolean' },
    deletedOn: { type: 'string' },
  },
}

const userSchema = {
  type: 'object',
  required: ['id', 'firstName', 'lastName', 'age'],
  properties: {
    id: { type: 'number' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    age: { type: 'number' },
  },
}

export const usersSchema = {
  type: 'object',
  required: ['users', 'total', 'skip', 'limit'],
  properties: {
    users: {
      type: 'array',
      items: userSchema,
    },
    total: { type: 'number' },
    skip: { type: 'number' },
    limit: { type: 'number' },
  },
}
