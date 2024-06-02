import axios from 'axios'
import expect from '../lib/expect.js'
import { productSchema } from '../schemas/product-schema.js'

const baseURL = 'https://dummyjson.com'

// Testing Function HTTP Method POST Data -> Create New Data
describe('POST DATA API TESTING', () => {
  let res
  let skip = false

  if (!skip) {
    beforeEach(async () => {
      res = await axios.post(`${baseURL}/products/add`, {
        title: 'Website Testing',
        description: 'This is a new product.',
        category: 'Testing',
        price: 6.25,
      })
    })
  }

  it('should return status 201', async () => {
    expect(res.status).to.equal(201)
  })

  it('should match product schema', async () => {
    expect(res.data).to.be.jsonSchema(productSchema)
  })

  it('should return 201 even with missing fields', async () => {
    skip = true
    try {
      await axios.post(`${baseURL}/products/add`, {
        price: 6.25,
      })
    } catch (error) {
      expect(error.response.status).to.equal(201)
    }
  })

  it('should return 201 even with invalid data', async () => {
    skip = true
    try {
      await axios.post(`${baseURL}/products/add`, {
        title: 6.25,
        price: 'Website Testing',
      })
    } catch (error) {
      expect(error.response.status).to.equal(201)
    }
  })
})
