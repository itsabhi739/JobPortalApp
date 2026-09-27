import Joi from "joi";

const validateBody = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        convert: true,
        stripUnknown: true,
    });

    if (error) {
        return res.status(400).json({
            success: false,
            message: "Request validation failed",
            errors: error.details.map((detail) => detail.message),
        });
    }

    req.body = value;
    return next();
};

export const validateJobSchema = validateBody(Joi.object({
    title: Joi.string().trim().min(1).required(),
    description: Joi.string().trim().min(1).required(),
    requirements: Joi.alternatives().try(
        Joi.string().trim().min(1),
        Joi.array().items(Joi.string().trim().min(1)).min(1)
    ).required(),
    location: Joi.string().trim().min(1).required(),
    salary: Joi.string().trim().min(1).required(),
    jobType: Joi.string().valid("Full Time", "Part Time", "Internship", "Remote").required(),
    experience: Joi.string().trim().min(1).required(),
    position: Joi.string().trim().min(1).required(),
    applyLink: Joi.string().trim().uri().allow("").optional(),
    company: Joi.forbidden(),
}));

export const validateJobUpdateSchema = validateBody(Joi.object({
    title: Joi.string().trim().min(1).optional(),
    description: Joi.string().trim().min(1).optional(),
    requirements: Joi.alternatives().try(
        Joi.string().trim().min(1),
        Joi.array().items(Joi.string().trim().min(1)).min(1)
    ).optional(),
    location: Joi.string().trim().min(1).optional(),
    salary: Joi.string().trim().min(1).optional(),
    jobType: Joi.string().valid("Full Time", "Part Time", "Internship", "Remote").optional(),
    experience: Joi.string().trim().min(1).optional(),
    position: Joi.string().trim().min(1).optional(),
    status: Joi.string().valid("Pending", "Active", "Paused", "Closed").optional(),
    applyLink: Joi.string().trim().uri().allow("").optional(),
}).min(1));

export const validateCompanyRegistrationSchema = validateBody(Joi.object({
    companyName: Joi.string().trim().min(1).required(),
    description: Joi.string().trim().min(1).required(),
    website: Joi.string().trim().uri().allow("").optional(),
    location: Joi.string().trim().allow("").optional(),
    logo: Joi.string().trim().allow("").optional(),
}));

export const validateCompanyUpdateSchema = validateBody(Joi.object({
    name: Joi.string().trim().min(1).optional(),
    description: Joi.string().trim().min(1).optional(),
    website: Joi.string().trim().uri().allow("").optional(),
    location: Joi.string().trim().allow("").optional(),
}).min(1));

const passwordSchema = Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/)
    .required()
    .messages({
        "string.min": "Password must be at least 8 characters long",
        "string.pattern.base": "Password must include uppercase, lowercase, number, and special character",
    });

export const validateRegisterSchema = validateBody(Joi.object({
    username: Joi.string().trim().min(4).required()
        .messages({ "string.min": "Username must be at least 4 characters long" }),
    email: Joi.string().trim().email().required(),
    password: passwordSchema,
    phonenumber: Joi.string().trim().min(1).required(),
    role: Joi.string().valid("Student", "Recruiter").required(),
    companyName: Joi.when("role", {
        is: "Recruiter",
        then: Joi.string().trim().min(1).required(),
        otherwise: Joi.string().trim().allow("").optional(),
    }),
    companyId: Joi.string().hex().length(24).optional(),
    designation: Joi.when("role", {
        is: "Recruiter",
        then: Joi.string().trim().min(1).required(),
        otherwise: Joi.string().trim().allow("").optional(),
    }),
    location: Joi.when("role", {
        is: "Recruiter",
        then: Joi.string().trim().min(1).required(),
        otherwise: Joi.string().trim().allow("").optional(),
    }),
}));

export const validateLoginSchema = validateBody(Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().required(),
}));