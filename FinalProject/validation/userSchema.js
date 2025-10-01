import Joi from 'joi'

const registerSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required(),
    givenName: Joi.string().required(),
    familyName: Joi.string().required(),
    role: Joi.string().valid('Developer', 'Business Analyst', 'Quality Analyst', 'Product Manager', 'Technical Manager').required()
  }).required();

const loginSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().required()
  }).required();

  const updateSchema = Joi.object({
        password: Joi.string().optional(),
        fullName: Joi.string().optional(),
        givenName: Joi.string().optional(),
        familyName: Joi.string().optional(),
        role: Joi.string().valid('Developer', 'Business Analyst', 'Quality Analyst', 'Product Manager', 'Technical Manager').optional()
      }).required();


export { registerSchema, loginSchema, updateSchema }