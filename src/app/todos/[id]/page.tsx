import { db } from "../../../..";
import { todos } from "../../../../drizzle/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import DescriptionCard from "./descriptionCard";
export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: number } }) {
  async function getTodo() {
    const temp = await db.select().from(todos).where(eq(todos.id, params.id));
    return await temp[0];
  }

  async function handleDelete() {
    "use server";
    const requ = await db.delete(todos).where(eq(todos.id, params.id));

    redirect("/todos");
  }

  async function handleEdit(formData: FormData) {
    "use server";

    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();

    if (!title || !description) {
      throw new Error("Data could not be fetched from Form");
    }

    const requ = await db
      .update(todos)
      .set({ title, description })
      .where(eq(todos.id, params.id));

    redirect(`/todos/${params.id}`);
  }

  async function handleStatus(status: string) {
    "use server";
    if (status !== "DONE" && status !== "PENDING") {
      throw new Error("The status is not valid");
    }
    const newStatus = status === "DONE" ? "PENDING" : "DONE";

    const requ = await db
      .update(todos)
      .set({ status: newStatus })
      .where(eq(todos.id, params.id));
  }

  const toDo = await getTodo();

  return (
    <DescriptionCard
      toDo={toDo}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      handleStatus={handleStatus}
    />
  );
}
