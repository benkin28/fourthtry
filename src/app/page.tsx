import Image from "next/image";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export default function Home() {
  redirect("/todos");
  return <div></div>;
}
