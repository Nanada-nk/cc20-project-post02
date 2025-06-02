/** @format */



function InputForm({
  error,
  text,
  icon: Icon,
  handleChange,
  value,
  placeholder,
  type = "text",
  id,
}) {
  return (
    <div className="flex flex-col gap-1">

      
      <label
        className="flex items-center gap-1 text-fon-1 cursor-pointer w-fit"
        htmlFor={id}>
        <Icon className="w-5 h-5 text-pri-1" strokeWidth={2.5} /> {text}
      </label>
     


      <input
        className={`text-sm text-fon-2 px-4 py-2 w-full  bg-hov-1 rounded-2xl ${
          error ? "outline-1 outline-red-500" : "outline-0"
        } `}
        id={id}
        onChange={handleChange}
        value={value}
        type={type}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

export default InputForm;
