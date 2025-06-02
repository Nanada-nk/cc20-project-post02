import * as Yup from 'yup'

export const schemaRegister = Yup.object({
  email: Yup.string().email().max(30).required("Email is required"),
  phone: Yup.string().min(10).max(10).required("Phone Number is required"),
  password: Yup.string().max(20).required("Password is required"),
})


export const schemaLogin = Yup.object({
  email: Yup.string().email().max(30).required("Email is required"),
  password: Yup.string().max(20).required("Password is required"),
})