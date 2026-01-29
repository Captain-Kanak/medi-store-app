import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      <Button asChild className="cursor-pointer">
        <Link href={"/"}>Home</Link>
      </Button>
    </div>
  );
}
