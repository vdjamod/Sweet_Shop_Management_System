import request from "supertest";
import mongoose from "mongoose";
import { app } from "../app";
import { User } from "../Models";

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Auth Test", () => {
  describe("User signin Test", () => {
    it("Should return user details", async () => {
      const res = await request(app)
        .post("/user/signin")
        .send({
          userData: {
            email: "demo@gmail.com",
            password: "demo",
          },
        });

      expect(res.status).toBe(200);
    });

    it("Should throw error as User not found", async () => {
      const res = await request(app)
        .post("/user/signin")
        .send({
          userData: {
            email: "demo2@gmail.com",
            password: "demo2",
          },
        });

      expect(res.status).toBe(404);
    });

    it("Should throw error as UnAuthorized", async () => {
      const res = await request(app)
        .post("/user/signin")
        .send({
          userData: {
            email: "demo@gmail.com",
            password: "demo1",
          },
        });

      expect(res.status).toBe(401);
    });
  });

  describe("User Signup Test", () => {
    it("Should save data into db", async () => {
      const userData = {
        name: "Testing User",
        email: "demo1@gmail.com",
        password: "demo1",
      };

      const res = await request(app).post("/user/signup").send({ userData });

      expect(res.status).toBe(200);
    });

    it("Should throw error as User already Exist", async () => {
      const res = await request(app)
        .post("/user/signup")
        .send({
          userData: {
            email: "demo1@gmail.com",
            password: "demo1",
          },
        });

      expect(res.status).toBe(409);
    });
  });
});
