import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center">
      <p>The Page could not be found</p>
      <Link href="/">
        <p>Go to Home</p>
      </Link>
    </div>
  );
}
