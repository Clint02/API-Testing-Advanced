export const deleteSchema = {
  type: 'object',
  required: ['isDeleted', 'deletedOn'],
  properties: {
    isDeleted: { type: 'boolean' },
    deletedOn: { type: 'string' },
  },
}
