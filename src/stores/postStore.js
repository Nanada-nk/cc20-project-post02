import { create } from "zustand";
import postApi from "../api/postApi";

const usePostStore = create((set) => ({
  posts: [],
  actionFetchPost: async (userId) => {
    const res = await postApi.getAllPostByUserID(userId)
    console.log('res',res);
    
    set({posts: res.data.posts})
  }
}))

export default usePostStore