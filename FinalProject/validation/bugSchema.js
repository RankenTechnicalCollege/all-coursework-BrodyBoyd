import Joi from 'joi'

const createBugSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    stepsToReproduce: Joi.string().required(),
    }).required();
    
const updateSchema = Joi.object({
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    stepsToReproduce: Joi.string().optional()
    }).required()

const classifySchema = Joi.object({
    classification: Joi.string().required(),
    }).required();

const assignSchema = Joi.object({
    assignedToUserId: Joi.string().required(),
    assignedToUserName: Joi.string().required()
    }).required();

const closeSchema = Joi.object({
      closed: Joi.bool().required()
    }).required();

export { createBugSchema, updateSchema, classifySchema, assignSchema, closeSchema } 