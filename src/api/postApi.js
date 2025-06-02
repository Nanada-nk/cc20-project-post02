import axios from "axios"

const postApi = {}

// id เรา ac5a3f86-a516-480b-a5f5-34bcc005013a

const BASEURL = "https://api-post-ts.onrender.com/api/v1"

postApi.createPost = (input,id) => {
  return axios.post(`${BASEURL}/posts/${id}`,input)
}

postApi.getAllPostByUserID = (id) => {
  console.log('id',id);
  console.log('FULL URL',`${BASEURL}/posts/${id}`);
  return axios.get(`${BASEURL}/posts/${id}`)
}

postApi.deletePost = (userId,postId) => {
  return axios.delete(`${BASEURL}/posts/${userId}/${postId}`)
}

postApi.updatePost = (input, userId) => {
  console.log('input',input);
  console.log('userId',userId);
  console.log('BASEURL',BASEURL);
  console.log('FULL URL',`${BASEURL}/posts/${userId}`);
  return axios.put(`${BASEURL}/posts/${userId}`,input)
}


export default postApi