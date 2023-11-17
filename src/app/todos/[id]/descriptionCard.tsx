"use client";
import { ToDo } from "../../../../drizzle/schema";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DescriptionCard(props: {
  toDo: ToDo;
  handleDelete: () => void;
  handleEdit: (formData: FormData) => void;
  handleStatus: (status: string) => void;
}) {
  if (props.toDo && props.toDo.date) {
    const [onEdit, setOnEdit] = useState(false);
    const [newToDo, setNewTodo] = useState(props.toDo);
    const router = useRouter();
    if (!onEdit) {
      const date = new Date(props.toDo.date.toString()).toDateString();

      return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col items-center w-[60rem] min-h-[30rem] bg-gray-400 resize-y rounded-[3rem]">
            <h1 className="text-4xl font-serif font-bold mt-8 mb-8">
              ToDo: {props.toDo.title}
            </h1>
            <p className="w-[80%] bg-gray-400 placeholder:text-white overflow-auto h-[40rem] text-3xl text-center">
              {props.toDo.description}
            </p>
            <form
              className="flex flex-col items-center justify-center mb-4 resize-y"
              action={async () => props.handleStatus(String(props.toDo.status))}
              onSubmit={() => {
                setTimeout(() => router.refresh(), 100);
              }}
            >
              <p>{props.toDo.status === "DONE" ? "PENDING" : "DONE"}</p>
              <button
                type="submit"
                className="w-[6rem] min-h-[2rem] bg-gray-300 rounded-xl hover:border-cyan-400 hover:border-2 mt-8 self-center justify-self-center resize-y"
              >
                Change Status
              </button>
            </form>
            <p className="font-serif text-2xl">{date}</p>
            <form action={props.handleDelete} className="block">
              <button
                type="submit"
                className="w-[6rem] h-[2rem] bg-gray-300 rounded-xl hover:border-cyan-400 hover:border-2 mt-4"
              >
                Delete
              </button>
            </form>
            <button
              onClick={() => setOnEdit(!onEdit)}
              className="w-[6rem] h-[2rem] bg-gray-300 rounded-xl hover:border-cyan-400 hover:border-2 mt-4"
            >
              Edit
            </button>
            <Link
              href="/todos"
              className="w-[6rem] min-h-[2rem] bg-gray-300 rounded-xl hover:border-cyan-400 hover:border-2 mt-4 resize-y mb-4 text-center"
            >
              Go back Home
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
          <form
            className="flex flex-col items-center w-[60rem] h-[60rem] bg-gray-400 overflow-y-auto rounded-[3rem]"
            action={props.handleEdit}
            onSubmit={() => {
              setTimeout(() => {
                setOnEdit(!onEdit);
                router.refresh();
              }, 100);
            }}
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newToDo.title}
              onChange={(e) =>
                setNewTodo({ ...newToDo, title: e.target.value })
              }
              className="w-[80%] bg-gray-400 text-white placeholder:text-white h-[5rem] text-3xl mt-4 mb-4"
            />
            <textarea
              name="description"
              placeholder="Description"
              value={newToDo.description}
              onChange={(e) =>
                setNewTodo({ ...newToDo, description: e.target.value })
              }
              className="w-[80%] bg-gray-400 text-white placeholder:text-white overflow-auto h-[40rem] text-3xl"
            />
            <button
              type="submit"
              className="w-[8rem] h-[3rem] bg-gray-300 rounded-xl hover:border-cyan-400 hover:border-2 mt-8"
            >
              Submit
            </button>
          </form>
        </div>
      );
    }
  } else {
    throw new Error("Error while fetching ToDo");
  }
}
