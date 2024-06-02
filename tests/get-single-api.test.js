import axios from 'axios'
import expect from '../lib/expect.js'
import { productSchema } from '../schemas/product-schema.js'

const baseURL = 'https://dummyjson.com'

// Testing Function HTTP Method GET Data by ID -> Read Specific Data
describe('GET SINGLE PRODUCT API TESTING', () => {
  let res
  let skip = false

  if (!skip) {
    beforeEach(async () => {
      res = await axios.get(`${baseURL}/products/5`)
    })
  }

  it('should return status 200', async () => {
    expect(res.status).to.equal(200)
  })

  it('should match product schema', async () => {
    expect(res.data).to.be.jsonSchema(productSchema)
  })

  it('should return 404 for non-existent product', async () => {
    skip = true
    try {
      await axios.get(`${baseURL}/products/9999`)
    } catch (error) {
      expect(error.response.status).to.equal(404)
    }
  })

  it('should return appropriate error message for non-existent product', async () => {
    skip = true
    try {
      await axios.get(`${baseURL}/products/9999`)
    } catch (error) {
      expect(error.response.data.message).to.equal(
        "Product with id '9999' not found",
      )
    }
  })
})
