import { login, register } from "../src/services/authService";
import pool from "../src/config/db";
import bcrypt from "bcrypt";

jest.mock("../src/config/db", () => ({
  query: jest.fn()
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn(),
  hash: jest.fn()
}));

describe("Auth Service", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    test("returns null if user not found", async () => {
      (pool.query as jest.Mock).mockResolvedValue({ rows: [] });

      const result = await login("test@example.com", "123456");
      expect(result).toBeNull();
      expect(pool.query).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE email = $1",
        ["test@example.com"]
      );
    });

    test("returns null if password does not match", async () => {
      (pool.query as jest.Mock).mockResolvedValue({
        rows: [{ id: 1, email: "test@example.com", password: "hashed" }]
      });

      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await login("test@example.com", "wrong");
      expect(result).toBeNull();
      expect(bcrypt.compare).toHaveBeenCalledWith("wrong", "hashed");
    });

    test("returns user if login is successful", async () => {
      const fakeUser = { id: 1, email: "test@example.com", password: "hashed" };

      (pool.query as jest.Mock).mockResolvedValue({ rows: [fakeUser] });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await login("test@example.com", "correct");

      expect(result).toEqual(fakeUser);
      expect(bcrypt.compare).toHaveBeenCalledWith("correct", "hashed");
    });
  });

  describe("register", () => {
    test("successfully registers and returns user", async () => {
      (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");

      const fakeCreatedUser = {
        id: 2,
        first_name: "John",
        last_name: "Doe",
        phone: "123456789",
        email: "john@example.com",
        password: "hashedPassword"
      };

      (pool.query as jest.Mock).mockResolvedValue({
        rows: [fakeCreatedUser]
      });

      const result = await register(
        "John",
        "Doe",
        "123456789",
        "john@example.com",
        "plainPassword"
      );

      expect(bcrypt.hash).toHaveBeenCalledWith("plainPassword", 10);

      expect(pool.query).toHaveBeenCalledWith(
        "INSERT INTO users (first_name, last_name, phone, email,  password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
          "John",
          "Doe",
          "123456789",
          "john@example.com",
          "hashedPassword"
        ]
      );

      expect(result).toEqual(fakeCreatedUser);
    });
  });
});
