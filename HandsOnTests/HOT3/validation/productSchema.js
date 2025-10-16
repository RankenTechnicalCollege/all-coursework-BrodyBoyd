import Joi from 'joi';

const newProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required()
}).required();

const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  category: Joi.string().optional(),
  price: Joi.number().optional()
}).required()

export { newProductSchema, updateProductSchema };