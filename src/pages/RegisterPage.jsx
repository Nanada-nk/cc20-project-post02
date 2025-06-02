/** @format */

import { Send } from "lucide-react";
import { Mail } from "lucide-react";
import { useState } from "react";
import InputForm from "../components/form/InputForm";
import { PhoneCall } from "lucide-react";
import { KeyRound } from "lucide-react";
import { schemaRegister } from "../validator/schemaRegister";
import * as Yup from "yup";
import authApi from "../api/authApi";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const initialInput = {
  phone: "",
  password: "",
  email: "",
};

function RegisterPage() {
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
      schemaRegister.validateSync(input, { abortEarly: false });

      //api
      const res = await authApi.register(input);
      console.log("res", res.data);

      setInput(initialInput)
      navigate('/login')

      //alert
      toast.success("Register success!!")
    } catch (error) {
      console.log(error);
      toast.error("Register invalid!!")

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
        <h1 className="text-2xl text-fon-1">Register</h1>

        <form onSubmit={handleSubmit} className="space-y-4 pl-2">
          <InputForm
            id="email"
            placeholder="abc@mail.com"
            handleChange={handleChange}
            error={inputError.email}
            value={input.email}
            text="Email"
            icon={Mail}
          />

          <InputForm
            id="phone"
            placeholder="Enter your Phone number 10 digit"
            handleChange={handleChange}
            error={inputError.phone}
            value={input.phone}
            text="Phone Number"
            icon={PhoneCall}
          />

          <InputForm
            id="password"
            placeholder="Enter you password"
            handleChange={handleChange}
            error={inputError.password}
            value={input.password}
            text="password"
            icon={KeyRound}
            type="password"
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

export default RegisterPage;
