//JOI 
const joi = require('joi');

module.exports.joiListingSchema = joi.object({
  listing:joi.object({
    title: joi.string().required(),
    description:joi.string().required(),
    image:joi.string().regex(new RegExp('^https:\/\/')).required(),
    price:joi.number().min(100).required(),
    location: joi.string().min(3).required(),
    country:joi.string().min(3).required()
  }).required()
})


module.exports.joiReviewSchema = joi.object({
  ratingReview:joi.number().min(1).max(5).required(),
  review:joi.string().required().regex(new RegExp('.{99,}$','m'))
})