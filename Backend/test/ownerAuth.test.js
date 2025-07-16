import request from "supertest";
import mongoose from "mongoose";
import { app } from "../app";
import { Owner } from "../Models";

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Owner Auth Test", () => {
  describe("Owner Signup Test", () => {
    it("Should save data into db", async () => {
      const ownerData = {
        name: "Testing Owner",
        email: "demo1@gmail.com",
        password: "demo1",
      };

      const res = await request(app).post("/owner/signup").send({ ownerData });

      expect(res.status).toBe(200);
    });

    it("Should throw error as Owner Already Exist", async () => {
      const res = await request(app)
        .post("/owner/signup")
        .send({
          ownerData: {
            name: "Testing Owner",
            email: "demo1@gmail.com",
            password: "demo1",
          },
        });

      expect(res.status).toBe(409);
    });
  });

  describe("Owner Signin Test", () => {
    it("Should save owner data into db", async () => {
      const res = await request(app)
        .post("/owner/signin")
        .send({
          ownerData: {
            email: "demo@gmail.com",
            password: "demo",
          },
        });

      expect(res.status).toBe(200);
    });

    it("Should throw error as Owner not registered", async () => {
      const res = await request(app)
        .post("/owner/signin")
        .send({
          ownerData: {
            email: "demo2@gmail.com",
            password: "demo2",
          },
        });

      expect(res.status).toBe(401);
    });

    it("Should throw error as UnAuthorized error", async () => {
      const res = await request(app)
        .post("/owner/signin")
        .send({
          ownerData: {
            email: "demo@gmail.com",
            password: "demo1",
          },
        });

      expect(res.status).toBe(401);
    });
  });
});
