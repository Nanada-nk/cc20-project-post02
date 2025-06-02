/** @format */

import { Send } from "lucide-react";
import { useState } from "react";
import InputForm from "../components/form/InputForm";
import * as Yup from "yup";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { schemaPost } from "../validator/schmePost";
import postApi from "../api/postApi";
import { LetterText } from "lucide-react";
import { ImageDownIcon } from "lucide-react";
import { NotebookPenIcon } from "lucide-react";
import useAuthStore from "../stores/authStrore";

const initialInput = {
  title: "",
  content: "",
  imgUrl: "",
};

function CreatePostPage() {

  const userId = useAuthStore((state)=>state.userId)

  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInput);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInput((prev) => ({ ...prev, [id]: value }));
    setInputError((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // console.log(input);
      setIsLoading(true);

      //validate
      schemaPost.validateSync(input, { abortEarly: false });



      //api
      const res = await postApi.createPost(input,userId);
      console.log("res", res.data);

      setInput(initialInput)
      navigate('/')

      //alert
      toast.success("Create Post success!!")
    } catch (error) {
      console.log(error);
      toast.error("Create Post invalid!!")

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
    <div className="p-8">
      <div className="w-2/4 border border-pri-1 rounded-3xl p-8 mx-auto space-y-4">
        <h1 className="text-2xl text-fon-1">Create Post</h1>

        <form onSubmit={handleSubmit} className="space-y-4 pl-2">
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
          

          <InputForm
            id="imgUrl"
            placeholder="Enter your image Url"
            handleChange={handleChange}
            error={inputError.imgUrl}
            value={input.imgUrl}
            text="Image"
            icon={ImageDownIcon}
          />

          <button
          disabled={isLoading}
          className="bg-pri-1 mt-8 text-fon-2 w-full py-2 rounded-2xl hover:bg-hov-1 hover:shadow-xl cursor-pointer flex items-center justify-center gap-1 font-bold duration-300">
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" strokeWidth={2.5} />
                <span>Loading ...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" strokeWidth={2.5} />
                <span>Submit</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePostPage;
