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
    assignedToUserEmail: Joi.string().required(),
    }).required();

const closeSchema = Joi.object({
      closed: Joi.bool().required()
    }).required();
    
const createCommentSchema = Joi.object({
    text: Joi.string().required()
}).required();

const createTestSchema = Joi.object({
    title: Joi.string().required(),
    status: Joi.string().valid('passed', 'failed').required(),
    description: Joi.string().required()
}).required();

const updateTestSchema = Joi.object({
    status: Joi.string().valid('passed', 'failed').required()
}).required()

export { createBugSchema, updateSchema, classifySchema, assignSchema, closeSchema, createCommentSchema, createTestSchema, updateTestSchema} 