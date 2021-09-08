import Joi from 'joi';

const userSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }).required(),
    number: Joi.string().pattern(new RegExp('^[0-9]{7,15}$')).required(),
    name: Joi.string().pattern(new RegExp('^[a-zA-Z]+[\\s\\w]+')).min(3).max(15).required(),
    gender: Joi.string().pattern(new RegExp('^(male|female)$')).required(),
    language: Joi.string().pattern(new RegExp('^[a-zA-Z]+$')).min(2).max(10).required(),
    avatarUrl: Joi.string().pattern(new RegExp('^(http://|https://|www.)')).required()
});

const validateUserAsync = async user => {
    // TODO: Check if user.email is in firestore (if true return false otherwise validate);
    try {
        const res = await userSchema.validateAsync(user);
    }
    catch (e) {
        return false;
    }
    return true;
};

export {
    validateUserAsync
};
