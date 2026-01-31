import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CustomerDashboard() {
  return (
    <div>
      <h1>Customer Dashboard</h1>

      <Button asChild className="cursor-pointer">
        <Link href={"/"}>Home</Link>
      </Button>
    </div>
  );
}
