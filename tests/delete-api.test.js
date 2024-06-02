import axios from 'axios'
import expect from '../lib/expect.js'
import { deleteSchema } from '../schemas/delete-schema.js'

const baseURL = 'https://dummyjson.com'

// Testing Function HTTP Method DELETE Data -> Delete/Remove Data
describe('DELETE DATA API TESTING', () => {
  let res
  let skip = false

  if (!skip) {
    beforeEach(async () => {
      res = await axios.delete(`${baseURL}/products/1`)
    })
  }

  it('should return status 200', async () => {
    expect(res.status).to.equal(200)
  })

  it('should match delete schema', async () => {
    expect(res.data).to.be.jsonSchema(deleteSchema)
  })

  it('should indicate isDeleted is true', () => {
    expect(res.data.isDeleted).to.be.true
  })

  it('should return 404 for non-existent product', async () => {
    skip = true
    try {
      await axios.delete(`${baseURL}/products/9999`)
    } catch (error) {
      expect(error.response.status).to.equal(404)
    }
  })

  it('should return appropriate error message for non-existent product', async () => {
    skip = true
    try {
      await axios.delete(`${baseURL}/products/9999`)
    } catch (error) {
      expect(error.response.data.message).to.equal(
        "Product with id '9999' not found",
      )
    }
  })
})
