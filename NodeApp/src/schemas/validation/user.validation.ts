import { object, string, ref } from "yup"

export const userCreationValidator = object({
    body: object({
        name: string().required("Name is Required"),
        password: string().required("Password is required").min(6, "Password is too short, should be 6 characters min")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters"),
        email: string().email("Must be a valid Email")
            .required("Email is required"),
        passwordConfirmation: string().oneOf(
            [ref("password"), null],
            "password must match"
        ),
    })
});

export const loginUserValidator = object({
    body: object({
        password: string().required("Password is required").min(6, "Password is too short, should be 6 characters min")
            .matches(/^[a-zA-Z0-9_.-]*$/, "Password can only contain Latin letters"),
        email: string().email("Must be a valid Email")
            .required("Email is required"),
    })
});


 