import request from "supertest";
import { initExpress } from "../../app/index.ts";
import { databaseDisconnect } from "../../config/prisma.ts";
import { prisma } from "../../config/prisma.ts";

describe("GET /children", () => {
  const app = initExpress();

  beforeAll(async () => {
    // Seed test data
    await prisma.child.deleteMany();
    await prisma.child.createMany({
      data: [
        {
          name: "John",
          surname: "Doe",
          birthDay: new Date("2015-01-01"),
        },
        {
          name: "Jane",
          surname: "Doe",
          birthDay: new Date("2016-01-01"),
        },
        {
          name: "Mark",
          surname: "Smith",
        },
      ],
    });
  });

  afterAll(async () => {
    await databaseDisconnect();
  });

  it("should get a paginated list of children", async () => {
    const res = await request(app)
      .get("/children")
      .query({ page: 1, pageSize: 2, sortBy: "name", order: "asc" });

    expect(res.status).toBe(200);

    // Shape
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("pagination");

    // Pagination
    expect(res.body.pagination).toEqual({
      page: 1,
      pageSize: 2,
      total: 3,
      totalPages: 2,
    });

    // Data
    expect(res.body.data).toHaveLength(2);
    expect(res.body.data[0]).toHaveProperty("id");
    expect(res.body.data[0]).toHaveProperty("name");
    expect(res.body.data[0]?.name).toBe("Jane");
  });
});

describe("POST /children", () => {
  const app = initExpress();

  beforeEach(async () => {
    await prisma.child.deleteMany();
  });

  afterAll(async () => {
    await databaseDisconnect();
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
