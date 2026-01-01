import request from 'supertest';
import { initExpress } from '../../app/index.ts';

describe('Health endpoint', () => {
  const app = initExpress();

  it('should return 200 and system status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        status: 'ok',
      })
    );
  });
});
