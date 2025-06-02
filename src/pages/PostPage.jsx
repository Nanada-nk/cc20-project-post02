/** @format */

import { useEffect } from "react";
import useAuthStore from "../stores/authStrore";
import usePostStore from "../stores/postStore";
import { X } from "lucide-react";
import postApi from "../api/postApi";
import { toast } from "react-toastify";
import { SettingsIcon } from "lucide-react";
import { useState } from "react";
import { SaveIcon } from "lucide-react";
import { schemaPost } from "../validator/schmePost";
import InputForm from "../components/form/InputForm";
import { LetterText } from "lucide-react";
import { ImageDownIcon } from "lucide-react";
import { NotebookPenIcon } from "lucide-react";
import * as Yup from "yup";
import { Loader2Icon } from "lucide-react";

const initialInput = {
  title: "",
  content: "",
  imgUrl: "",
};
function PostPage() {
  const [isEdit, setIsEdit] = useState(null);
  const [inputError, setInputError] = useState(initialInput);
  const [input, setInput] = useState(initialInput);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDel, setIsLoadingDel] = useState(false);

  const posts = usePostStore((state) => state.posts);
  const actionFetchPost = usePostStore((state) => state.actionFetchPost);

  const userId = useAuthStore((state) => state.userId);

  useEffect(() => {
    actionFetchPost(userId);
  }, []);

  // console.log("posts", posts);

  const handleDelete = async (postId) => {
    try {
      // e.preventDefault()
      setIsLoadingDel(true);
      await postApi.deletePost(userId, postId);
      await actionFetchPost(userId);

      toast.success("Delete success!!");
    } catch (error) {
      console.log("PostPage error", error);
      toast.error("Delete invalid!!");
    } finally {
      setIsLoadingDel(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInput((prev) => ({ ...prev, [id]: value }));
    setInputError((prev) => ({ ...prev, [id]: "" }));
  };

  const handleClickSave = async () => {
    try {
      //validate
      schemaPost.validateSync(input, { abortEarly: false });
      console.log("userId", userId);

      console.log("input PostPage", input);
      setIsLoading(true);
      //api
      await postApi.updatePost(input, userId);
      await actionFetchPost(userId);
      setIsEdit(null); // ยกเลิกโหมดแก้ไขหลังจากบันทึก

      //alert
      toast.success("Edit success!!");
    } catch (error) {
      console.log("PostPage error", error);
      toast.error("Edit invalid");

      if (error instanceof Yup.ValidationError) {
        const err = error.inner.reduce((acc, cur) => {
          acc[cur.path] = cur.message;
          return acc;
        }, {});
        setInputError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 duration-1000 gap-4 p-8">
      {posts.map((item) => (
        <div className="relative" key={item.id}>
          {isEdit === item.id ? (
            <div className="pt-9 space-y-4">
              <InputForm
                id="imgUrl"
                placeholder="Enter your image Url"
                handleChange={handleChange}
                error={inputError.imgUrl}
                value={input.imgUrl}
                text="Image"
                icon={ImageDownIcon}
              />

              <InputForm
                id="title"
                placeholder="Enter your Title"
                handleChange={handleChange}
                error={inputError.title}
                value={input.title}
                text="Title"
                icon={NotebookPenIcon}
              />

              <InputForm
                id="content"
                placeholder="Enter your content"
                handleChange={handleChange}
                error={inputError.content}
                value={input.content}
                text="Content"
                icon={LetterText}
              />
            </div>
          ) : (
            <>
              <div className="h-80 ">
                <img
                  className="h-full w-full object-cover rounded-2xl"
                  src={item?.imgUrl}
                  alt={item?.title}
                />
              </div>

              <div className="space-y-2 py-2">
                <h1 className="font-bold text-fon-1 text-center p-2 bg-pri-1 rounded-2xl">
                  {item?.title}
                </h1>
                <p className="text-fon-1 p-2 bg-hov-1 rounded-2xl line-clamp-3 overflow-auto">
                  {item?.content}
                </p>
              </div>
            </>
          )}

          <div>
            <button
              onClick={() => handleDelete(item.id)}
              disabled={isLoadingDel}
              className="absolute top-3 right-3 cursor-pointer bg-pri-1 rounded-full p-1 hover:bg-hov-1 duration-300">
                {isLoadingDel ? (
                  <Loader2Icon className="h-5 w-5 animate-spin" />
                ):(
                  <X className="h-5 w-5" />
                )}
            </button>
          </div>

          {isEdit === item.id ? (
            <>
              <button
                onClick={() => handleClickSave(item.id)}
                disabled={isLoading}
                className="absolute top-3 right-11 cursor-pointer bg-pri-1 rounded-full p-1 hover:bg-hov-1 duration-300">
                {isLoading ? (
                  
                    <Loader2Icon className="h-5 w-5 animate-spin" />
                  
                ) : (
                  
                    <SaveIcon className="h-5 w-5" />
                  
                )}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsEdit(item.id);
                  setInput({
                    id: item.id,
                    title: item.title,
                    content: item.content,
                    imgUrl: item.imgUrl,
                  });
                }}
                className="absolute top-3 right-11 cursor-pointer bg-pri-1 rounded-full p-1 hover:bg-hov-1 duration-300">
                <SettingsIcon className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostPage;
