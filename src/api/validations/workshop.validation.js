const Joi = require("joi");

module.exports = {
  // GET /v1/workshop
  listWorkshop: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number().min(1).max(100),
      name: Joi.string(),
      coach: Joi.string(),
    },
  },

  // POST /v1/workshop
  createWorkshop: {
    body: {
      title: Joi.string().required().min(6).max(125),
      subject: Joi.string().required().min(6).max(125),
      image: Joi.string(),
      date: Joi.date().required(),
      duration: Joi.number().min(15).max(300).required(),
      description: Joi.string().min(5).max(1500),
      coachTag: Joi.array().items(Joi.string()),
      amount: Joi.number().min(1000),
      maxQuantity: Joi.number().min(1).max(99),
    },
  },

  // PUT /v1/workshop/:workshopId
  updateWorkshop: {
    params: {
      workshopId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required(),
    },
    body: {
      title: Joi.string().required().min(6).max(125),
      subject: Joi.string().required().min(6).max(125),
      image: Joi.string(),
      date: Joi.date().required(),
      duration: Joi.number().min(15).max(300).required(),
      description: Joi.string().min(5).max(1500),
      coachTag: Joi.array().items(Joi.string()),
      amount: Joi.number().min(1000),
      maxQuantity: Joi.number().min(1).max(99),
    },
  },
};
