import * as Yup from 'yup'

export const schemaPost = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Title is required"),
  imgUrl: Yup.string().url()
})