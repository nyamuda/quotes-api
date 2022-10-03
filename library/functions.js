let Joi = require("joi");

module.exports.validateNewPost = (data) => {

    let schema = Joi.object({
        quote: Joi.string().min(5).required(),
        author: Joi.string().min(3).required()
    })

    return schema.validate(data);
}


module.exports.validePostUpdate = data => {
    let schema = Joi.object({
        quote: Joi.string().min(5),
        author: Joi.string().min(3)
    })

    return schema.validate(data);
}