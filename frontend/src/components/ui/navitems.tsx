"use client";

import { cn } from "../../lib/utils";
import { Link } from "lucide-react";
// import { usePathname } from "next/navigation";

export default function NavItems() {
  //   const pathname = usePathname();
  return (
    <div className="flex gap-x-3 ml-4">
      <Link
        className="font-semibold text-sm underline-offset-4 hover:underline"
        href="/chat"
      >
        <span
          className={cn(
            "text-gray-500 hidden sm:flex"
            // pathname === "/chat"
            //   ? "underline text-black underline-offset-4"
            //   : ""
          )}
        >
          Chat
        </span>
      </Link>
    </div>
  );
}
