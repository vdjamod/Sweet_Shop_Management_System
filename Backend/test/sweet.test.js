import request from "supertest";
import mongoose from "mongoose";
import { app } from "../app.js";
import Sweet from "../Models/sweet.js";

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Sweet crud testing", () => {
  describe("Sweet add Test", () => {
    it("Should create sweet", async () => {
      const sweetData = {
        name: "demo1",
        price: 2,
        category: "demo1",
        quantity: 2,
      };

      const res = await request(app)
        .post("/owner/sweet/add")
        .send({ sweetData });

      expect(res.status).toBe(200);
    });

    it("Should throw an error as Sweet already exist", async () => {
      const res = await request(app)
        .post("/owner/sweet/add")
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

  describe("Get all Sweet", () => {
    it("Should return all Sweets", async () => {
      const res = await request(app).get("/sweet/all");

      expect(res.status).toBe(200);
    });
  });

  describe("Get sweet", () => {
    it("Should return the sweet by ID", async () => {
      const res = await request(app).get("/sweet/6877a204f774245affa5b034");

      expect(res.status).toBe(200);
    });
  });

  describe("Update Sweet", () => {
    const sweetData = {
      name: "demo",
      price: 1000,
      category: "nuts",
      quantity: 50,
    };

    it("Should Update the Sweet", async () => {
      const sweetId = "6877fb9ab573f4d341ca8d19";

      const res = await request(app)
        .put(`/owner/sweet/${sweetId}/update`)
        .send({ sweetData });

      expect(res.status).toBe(200);
    });

    it("Should throw an error as sweet NOT Found", async () => {
      const sweetId = "000000000000000000000000";

      const res = await request(app)
        .put(`/owner/sweet/${sweetId}/update`)
        .send({ sweetData });

      expect(res.status).toBe(500);
    });
  });

  describe("Delete Sweet", () => {
    it("Should delete the sweet", async () => {
      const sweetId = "6877fb9ab573f4d341ca8d19";

      const res = await request(app).delete(`/sweet/${sweetId}`);

      expect(res.status).toBe(200);
    });

    it("Should throw error as Failed to delete sweet", async () => {
      const sweetId = "000000000000000000000000";

      const res = await request(app).delete(`/sweet/${sweetId}`);

      expect(res.status).toBe(500);
    });
  });
});
