export const userSchema = {
  type: 'object',
  required: ['id', 'firstName', 'lastName', 'age'],
  properties: {
    id: { type: 'number' },
    firstName: { type: 'string' },
    lastName: { type: 'string' },
    age: { type: 'number' },
  },
}
