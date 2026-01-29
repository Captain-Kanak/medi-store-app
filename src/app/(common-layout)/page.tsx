import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default async function Home() {
  const { data: session } = await authClient.getSession();

  console.log({ session });

  return (
    <>
      <h1>Home</h1>

      <Button>Click Me</Button>
    </>
  );
}
