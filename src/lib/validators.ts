import * as Yup from "yup";
export const signinSchema=Yup.object({email:Yup.string().email('Invalid email').required('Email is required'),password:Yup.string().required('Password is required')});
export const signupSchema=Yup.object({name:Yup.string().required('Name is required'),email:Yup.string().email('Invalid email').required('Email is required'),password:Yup.string().min(8,'Minimum 8 characters').required('Password is required')});
export const contactSchema=Yup.object({name:Yup.string().required('Name is required'),email:Yup.string().email('Invalid email').required('Email is required'),message:Yup.string().min(10,'Minimum 10 characters').required('Message is required')});
