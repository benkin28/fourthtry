import Link from "next/link";
import { db } from "../../..";
import { todos } from "../../../drizzle/schema";
export const dynamic = "force-dynamic";

async function getToDos() {
  return await db.select().from(todos);
}

export default async function Page() {
  const ToDos = await getToDos();
  if (ToDos) {
    return (
      <div className="w-screen h-screen bg-white flex flex-col items-center ">
        <h1 className="font-serif font-bold text-4xl mt-8 mb-8 ">My ToDos:</h1>
        {ToDos.map((elem) => (
          <Link
            key={elem.id}
            href={`/todos/${elem.id}`}
            className="flex-col flex items-center justify-center overflow-auto"
          >
            <p className="h-[4rem] w-[30rem] rounded-xl bg-gray-400 text-white text-2xl mb-4 text-center flex items-center justify-center overflow-x-auto">
              {elem.title}
            </p>
          </Link>
        ))}
        <Link href="/todos/addtodo">Add ToDo</Link>
      </div>
    );
  } else {
    throw new Error("ToDos could not be fetched");
  }
}
