import Joi from "joi";

export const productSchema = Joi.object({
  _id: Joi.string().optional(), // Campo _id opcional
  name: Joi.string().required().trim(),
  description: Joi.string().required().trim(),
  height: Joi.number().required(),
  length: Joi.number().required(),
  width: Joi.number().required(),
  userId: Joi.string().required(),
});