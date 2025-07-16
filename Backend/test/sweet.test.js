import request from "supertest";
import mongoose from "mongoose";
import { app } from "../app.js";
import Sweet from "../Models/sweet.js";

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Sweet add Test", () => {
  it("Should create sweet", async () => {
    const sweetData = {
      name: "demo1",
      price: 2,
      category: "demo1",
      quantity: 2,
    };

    const res = await request(app).post("/sweet/add").send({ sweetData });

    expect(res.status).toBe(200);
  });

  it("Should throw an error as Sweet already exist", async () => {
    const res = await request(app)
      .post("/sweet/add")
      .send({
        sweetData: {
          name: "demo",
          price: 1,
          category: "demo",
          quantity: 1,
        },
      });

    expect(res.status).toBe(409);
  });
});
