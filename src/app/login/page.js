'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Form from "@/components/login/Form";

export default function Index() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard"); // Redirect to a dashboard or home page
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <main className="flex justify-center items-center h-[80vh] px-5 sm:px-10">
        <p>Loading...</p>
      </main>
    );
  }
  if(status === 'authenticated'){
    return <main className="flex justify-center items-center h-[80vh] px-5 sm:px-10">
        <p>Loading...</p>
      </main>
  }
  return (
    <main className="flex justify-center items-center h-[80vh] px-5 sm:px-10">
      <Form />
    </main>
  );
}
