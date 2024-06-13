import { Express } from 'express'
import request from 'supertest'

export async function createAndAuthenticateUser(app: Express) {
  await request(app).post('/auth/register').send({
    name: 'Edgar Washington',
    email: 'nedzesa@sip.cr',
    password: '123456',
  })

  const response = await request(app).post('/auth/login').send({
    email: 'nedzesa@sip.cr',
    password: '123456',
  })

  const cookies = response.headers['set-cookie']

  return { cookies }
}
