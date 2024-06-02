import axios from 'axios'
import expect from '../lib/expect.js'
import { usersSchema } from '../schemas/users-schema.js'

const baseURL = 'https://dummyjson.com'

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
