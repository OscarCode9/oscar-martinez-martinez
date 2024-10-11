import { createUserSchema, loginUserSchema } from "./user.validator.js";

describe('User Schema Validation', () => {
  describe('createUserSchema', () => {
    it('should validate a valid user', () => {
      const validUser = {
        name: 'John Doe',
        phone: '1234567890',
        email: 'john.doe@example.com',
        password: 'password123',
        img_profile: 'profile.jpg',
      };

      const { error } = createUserSchema.validate(validUser);
      expect(error).toBeUndefined();
    });

    it('should require name', () => {
      const invalidUser = {
        phone: '1234567890',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const { error } = createUserSchema.validate(invalidUser);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe('"name" is required');
    });

    it('should require phone', () => {
      const invalidUser = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const { error } = createUserSchema.validate(invalidUser);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe('"phone" is required');
    });

    it('should require email', () => {
      const invalidUser = {
        name: 'John Doe',
        phone: '1234567890',
        password: 'password123',
      };

      const { error } = createUserSchema.validate(invalidUser);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe('"email" is required');
    });

    it('should require password', () => {
      const invalidUser = {
        name: 'John Doe',
        phone: '1234567890',
        email: 'john.doe@example.com',
      };

      const { error } = createUserSchema.validate(invalidUser);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe('"password" is required');
    });

    it('should require password to be at least 6 characters', () => {
      const invalidUser = {
        name: 'John Doe',
        phone: '1234567890',
        email: 'john.doe@example.com',
        password: '123',
      };

      const { error } = createUserSchema.validate(invalidUser);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe('"password" length must be at least 6 characters long');
    });
  });

  describe('loginUserSchema', () => {
    it('should validate a valid login', () => {
      const validLogin = {
        email: 'john.doe@example.com',
        password: 'password123',
      };

      const { error } = loginUserSchema.validate(validLogin);
      expect(error).toBeUndefined();
    });

    it('should require email', () => {
      const invalidLogin = {
        password: 'password123',
      };

      const { error } = loginUserSchema.validate(invalidLogin);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe('"email" is required');
    });

    it('should require password', () => {
      const invalidLogin = {
        email: 'john.doe@example.com',
      };

      const { error } = loginUserSchema.validate(invalidLogin);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe('"password" is required');
    });

    it('should require password to be at least 6 characters', () => {
      const invalidLogin = {
        email: 'john.doe@example.com',
        password: '123',
      };

      const { error } = loginUserSchema.validate(invalidLogin);
      expect(error).toBeDefined();
      expect(error.details[0].message).toBe('"password" length must be at least 6 characters long');
    });
  });
});