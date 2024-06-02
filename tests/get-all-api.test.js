import axios from 'axios'
import expect from '../lib/expect.js'
import { productsSchema } from '../schemas/products-schema.js'

const baseURL = 'https://dummyjson.com'

// Testing Function HTTP Method Get -> Read All Data
describe('GET ALL PRODUCTS API TESTING', () => {
  let paginatedRes
  let res

  beforeEach(async () => {
    paginatedRes = await axios.get(`${baseURL}/products?limit=2&skip=6`)
    res = await axios.get(`${baseURL}/products`)
  })

  it('should return status 200', async () => {
    expect(res.status).to.equal(200)
  })

  it('should match products schema', async () => {
    expect(res.data).to.be.jsonSchema(productsSchema)
  })

  it('should return status 200 with pagination', async () => {
    expect(paginatedRes.status).to.equal(200)
  })

  it('should match products schema with pagination', async () => {
    expect(paginatedRes.data).to.be.jsonSchema(productsSchema)
  })
})
