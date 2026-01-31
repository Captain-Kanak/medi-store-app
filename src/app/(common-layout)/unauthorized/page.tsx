import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div>
      <h1>Unauthorized</h1>

      <Button asChild className="cursor-pointer">
        <Link href={"/"}>Return to Home</Link>
      </Button>
    </div>
  );
}
