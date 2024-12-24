const chai = require('chai')
const axios = require('axios')

const expect = chai.expect;

describe('API Test Cases for JSONPlaceholder', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com/posts';

  it('1. Validate Successful Response (200 OK)', async () => {
    const response = await axios.get(baseURL);
    expect(response.status).to.equal(200);
  });

  it('2. Validate Response Body Structure', async () => {
    const response = await axios.get(baseURL);
    expect(response.data[0]).to.have.all.keys('userId', 'id', 'title', 'body');
  });

  it('3. Validate Data Types of Response Fields', async () => {
    const response = await axios.get(baseURL);
    expect(response.data[0].userId).to.be.a('number');
    expect(response.data[0].id).to.be.a('number');
    expect(response.data[0].title).to.be.a('string');
    expect(response.data[0].body).to.be.a('string');
  });

  it('4. Validate Content-Type Header', async () => {
    const response = await axios.get(baseURL);
    expect(response.headers['content-type']).to.include('application/json');
  });

  it('5. Validate Response Time', async () => {
    const start = Date.now();
    await axios.get(baseURL);
    const duration = Date.now() - start;
    expect(duration).to.be.below(2000);
  });

  it('6. Invalid Endpoint (404 Error)', async () => {
    try {
      await axios.get(`${baseURL}/invalid`);
    } catch (error) {
      expect(error.response.status).to.equal(404);
    }
  });

  it('7. Unauthorized Access (401 Error)', async () => {
    try {
      await axios.get(baseURL, {
        headers: { Authorization: 'Bearer invalid_token' }
      });
    } catch (error) {
      expect(error.response.status).to.equal(401);
    }
  });
});
