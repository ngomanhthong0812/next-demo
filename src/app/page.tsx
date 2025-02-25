import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  return (
    <div className="flex gap-2">
      <Button asChild>
        <Link href="/chart">Open Chart</Link>
      </Button>
      <Button asChild>
        <Link href={'/table'}>Open Table</Link>
      </Button>
    </div>
  );
}

