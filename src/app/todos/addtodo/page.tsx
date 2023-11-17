import Link from "next/link";
import AddTodoForm from "./addTodoForm";
import { db } from "../../../..";
import { todos } from "../../../../drizzle/schema";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

export async function handleAdd(formData: FormData) {
  "use server";
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();

  if (!title || !description) {
    throw new Error("Data could not be fetched from Form");
  }

  const requ = await db.insert(todos).values({ title, description });

  redirect("/todos");
}
export default function Page() {
    
  return <AddTodoForm handleAdd={handleAdd}></AddTodoForm>;
}
