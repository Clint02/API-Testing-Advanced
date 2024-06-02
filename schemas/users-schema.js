import { userSchema } from './user-schema.js'

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
