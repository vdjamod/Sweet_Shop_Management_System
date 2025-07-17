import request from "supertest";
import mongoose from "mongoose";
import { app } from "../app.js";
import Sweet from "../Models/sweet.js";
import { response } from "express";

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
      sweetData: {
        name: "demo",
        price: 1000,
        category: "nuts",
        quantity: 100,
      },
    };

    it("Should Update the Sweet", async () => {
      const sweetId = "6877a204f774245affa5b034";

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
      const sweetId = "68789df485d94ab1b372e625";

      const res = await request(app).delete(`/sweet/${sweetId}`);

      expect(res.status).toBe(200);
    });

    it("Should throw error as Failed to delete sweet", async () => {
      const sweetId = "000000000000000000000000";

      const res = await request(app).delete(`/sweet/${sweetId}`);

      expect(res.status).toBe(500);
    });
  });

  describe("Filter and Sort Sweet", () => {
    const sortFilterOptions = {
      name: "",
      category: "nut",
      sortBy: "price",
      sort: 1,
      min: 500,
      max: 1000,
    };

    it("Should filter the sweets", async () => {
      const res = await request(app)
        .post("/sweet/sort-filter")
        .send({ sortFilterOptions });

      expect(res.status).toBe(200);
    });
  });

  describe("Inventory Update", () => {
    const inventoryData = {
      demo: 10,
    };

    it("Should update stock of given sweet", async () => {
      const res = await request(app)
        .post("/owner/sweet/inventory/update")
        .send({ inventoryData });

      expect(res.status).toBe(200);
    });
  });

  describe("Purchase Sweet", () => {
    const buyData = {
      name: "demo",
      quantity: 5,
    };

    const buyData2 = {
      name: "demo",
      quantity: 50000,
    };

    const sweetId = "687769c0cffd8c066d30ed5f";

    it("Should buy and update stock of give sweet", async () => {
      const res = await request(app).post(`/user/sweet/${sweetId}/buy`).send({
        buyData,
      });

      expect(res.status).toBe(200);
    });

    it("Should throw error as Stock is not enough", async () => {
      const res = await request(app).post(`/user/sweet/${sweetId}/buy`).send({
        buyData2,
      });

      expect(res.status).toBe(500);
    });
  });
});
