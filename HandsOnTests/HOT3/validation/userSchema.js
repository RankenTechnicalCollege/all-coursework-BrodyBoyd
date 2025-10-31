import Joi from 'joi';

const updateUserSchema = Joi.object({
  fullName: Joi.string().optional(),
  email: Joi.string().optional(),
  password: Joi.string().optional(),
}).required();

export {updateUserSchema}