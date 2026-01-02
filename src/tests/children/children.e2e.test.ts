import request from "supertest";
import { initExpress } from "../../app/index.ts";
import { disconnectPrisma } from "../../config/prisma.ts";

describe("POST /children", () => {
  const app = initExpress();

  afterAll(async () => {
    await disconnectPrisma();
  });

  it("should register a child successfully", async () => {
    const payload = {
      name: "Juan",
      surname: "Perez",
      dni: "44123123",
    };

    const response = await request(app)
      .post("/children")
      .send(payload)
      .expect(201);

    expect(response.body).toMatchObject({
      id: expect.any(Number),
      name: "Juan",
      surname: "Perez",
      dni: "44123123",
    });
  });

  it("should fail with 400 if name is missing", async () => {
    const response = await request(app)
      .post("/children")
      .send({ surname: "Perez" })
      .expect(400);

    expect(response.body).toHaveProperty("error");
  });
});
