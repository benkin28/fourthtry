import Link from "next/link";

export default function AddTodoForm(props:{handleAdd:(formData:FormData)=>void}) {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <form className="flex flex-col items-center w-[60rem] h-[60rem] bg-gray-400 overflow-y-auto rounded-[3rem]" action={props.handleAdd}>
        <h1 className="text-5xl font-serif font-bold text-white mt-8">
          Add ToDo
        </h1>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-[80%] bg-gray-400 text-white placeholder:text-white h-[5rem] text-3xl mt-4 mb-4"
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-[80%] bg-gray-400 text-white placeholder:text-white overflow-auto h-[40rem] text-3xl"
        />
        <button
          type="submit"
          className="w-[8rem] h-[3rem] bg-gray-300 rounded-xl hover:border-cyan-400 hover:border-2 mt-8"
        >
          Submit
        </button>
      </form>

      <Link
        href="/todos"
        className="w-[8rem] h-[3rem] bg-gray-300 rounded-xl hover:border-cyan-400 hover:border-2 flex flex-col items-center justify-center mt-8"
      >
        <p>Go back Home</p>
      </Link>
    </div>
  );
}
