import axios from 'axios'
import expect from './lib/expect.js'
import {
  productSchema,
  productsSchema,
  deleteSchema,
  usersSchema,
  baseURL,
} from './schemas/products-schema.js'

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

// Testing Function HTTP Method PUT/PATCH Data -> Update Data
describe('PUT DATA API TESTING', () => {
  let res
  let skip = false

  if (!skip) {
    beforeEach(async () => {
      res = await axios.put(`${baseURL}/products/5`, {
        title: 'Updated Product',
        description: 'This product has been updated.',
      })
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
      await axios.put(`${baseURL}/products/9999`, {
        title: 'Nonexistent Product',
        description: 'Trying to update a non-existent product.',
      })
    } catch (error) {
      expect(error.response.status).to.equal(404)
    }
  })

  it('should return appropriate error message for non-existent product', async () => {
    skip = true
    try {
      await axios.put(`${baseURL}/products/9999`, {
        title: 'Nonexistent Product',
        description: 'Trying to update a non-existent product.',
      })
    } catch (error) {
      expect(error.response.data.message).to.equal(
        "Product with id '9999' not found",
      )
    }
  })
})

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

describe('GET RESTRICTED DATA API TESTING', () => {
  let token
  let skip = false
  const defaultToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvSmVhbm5lLnBuZz9zZXQ9c2V0NCIsImlhdCI6MTcxMTIwOTAwMSwiZXhwIjoxNzExMjEyNjAxfQ.F_ZCpi2qdv97grmWiT3h7HcT1prRJasQXjUR4Nk1yo8'

  if (!skip) {
    beforeEach(async () => {
      const authResponse = await axios.post(`${baseURL}/auth/login`, {
        username: 'alexanderj',
        password: 'alexanderjpass',
      })
      token = authResponse.data.token
    })
  }

  it('should get auth token', async () => {
    expect(token).to.be.a('string')
  })

  it('should access restricted data with valid token', async () => {
    const authConfig = {
      headers: { Authorization: `Bearer ${token}` },
    }
    const secureResponse = await axios.get(`${baseURL}/auth/users`, authConfig)
    expect(secureResponse.status).to.equal(200)
  })

  it('should match users schema', async () => {
    const authConfig = {
      headers: { Authorization: `Bearer ${token}` },
    }
    const secureResponse = await axios.get(`${baseURL}/auth/users`, authConfig)
    expect(secureResponse.data).to.be.jsonSchema(usersSchema)
  })

  it('should return 401 for invalid token', async () => {
    try {
      const authConfig = {
        headers: { Authorization: 'Bearer invalidtoken' },
      }
      await axios.get(`${baseURL}/auth/users`, authConfig)
    } catch (error) {
      expect(error.response.status).to.equal(401)
    }
  })

  it('should return appropriate error message for invalid token', async () => {
    try {
      const authConfig = {
        headers: { Authorization: 'Bearer invalidtoken' },
      }
      await axios.get(`${baseURL}/auth/users`, authConfig)
    } catch (error) {
      expect(error.response.data.message).to.equal('Invalid/Expired Token!')
    }
  })

  it('should return 500 for invalid signature', async () => {
    skip = true
    try {
      const authConfig = {
        headers: { Authorization: `Bearer ${defaultToken}` },
      }
      await axios.get(`${baseURL}/auth/users`, authConfig)
    } catch (error) {
      expect(error.response.status).to.equal(500)
    }
  })

  it('should return appropriate error message for invalid signature', async () => {
    skip = true
    try {
      const authConfig = {
        headers: { Authorization: `Bearer ${defaultToken}` },
      }
      await axios.get(`${baseURL}/auth/users`, authConfig)
    } catch (error) {
      expect(error.response.data.message).to.equal('invalid signature')
    }
  })
})
