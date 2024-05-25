const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const createSchema = {
    payload: Joi.object({
        name: Joi
            .string()
            .min(3)
            .required(),
        format_aquarium: Joi
            .string()
            .valid('rectangular', 'curved', 'hexagonal')
            .required(),
        material: Joi
            .string()
            .valid('glass', 'acrylic', 'plastic')
            .required(),
        thickness: Joi
            .number()
            .integer()
            .description('Define measurements in mm')
            .required(),
        capacity: Joi
            .number()
            .description('Define measurements in liters')
            .required(),
        height: Joi
            .number()
            .description('Define measurements in cm')
            .required(), 
        width: Joi
            .number()
            .description('Define measurements in cm')
            .required(),
        voltage: Joi
            .string()
            .valid('110', '220')
            .required()
    })
};

const getAllSchema = {
    query: Joi.object({
        page: Joi
            .number()
            .integer()
            .default(1),
        itemsPerPage: Joi
            .number()
            .integer()
            .default(10),
        name: Joi
            .string(),
        format_aquarium: Joi
            .string()
            .valid('rectangular', 'curved', 'hexagonal'),
        material: Joi
            .string()
            .valid('glass', 'acrylic', 'plastic'),
        thickness: Joi
            .number()
            .integer()
            .description('Define measurements in mm'),
        capacity: Joi
            .number()
            .description('Define measurements in liters'),
        height: Joi
            .number()
            .description('Define measurements in cm'),
        width: Joi
            .number()
            .description('Define measurements in cm'),
        voltage: Joi
            .string()
            .valid('110', '220')
    })
};

const getOneSchema = {
    params: Joi.object({
        id: Joi
            .objectId()
            .required()
    }),
    query: Joi.object({
        name: Joi
            .string(),
        format_aquarium: Joi
            .string()
            .valid('rectangular', 'curved', 'hexagonal'),
        material: Joi
            .string()
            .valid('glass', 'acrylic', 'plastic'),
        thickness: Joi
            .number()
            .integer()
            .description('Define measurements in mm'),
        capacity: Joi
            .number()
            .description('Define measurements in liters'),
        height: Joi
            .number()
            .description('Define measurements in cm'),
        width: Joi
            .number()
            .description('Define measurements in cm'),
        voltage: Joi
            .string()
            .valid('110', '220')
    })
};

const updateSchema = {
    params: Joi.object({
        id: Joi
            .objectId()
            .required()
    }),
    payload: Joi.object({
        name: Joi
            .string(),
        format_aquarium: Joi
            .string()
            .valid('rectangular', 'curved', 'hexagonal'),
        material: Joi
            .string()
            .valid('glass', 'acrylic', 'plastic'),
        thickness: Joi
            .number()
            .integer()
            .description('Define measurements in mm'),
        capacity: Joi
            .number()
            .description('Define measurements in liters'),
        height: Joi
            .number()
            .description('Define measurements in cm'),
        width: Joi
            .number()
            .description('Define measurements in cm'),
        voltage: Joi
            .string()
            .valid('110', '220')
    })
};

const deleteSchema = {
    params: Joi.object({
        id: Joi
            .objectId()
            .required()
    })
};

module.exports = {
    createSchema,
    getAllSchema,
    getOneSchema,
    updateSchema,
    deleteSchema
};