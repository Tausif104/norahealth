"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export default function LogoutMenuItem() {
  const { pending } = useFormStatus();

  return (
    <DropdownMenuItem asChild disabled={pending}>
      <button
        type='submit'
        className='w-full text-left flex items-center gap-2'
        disabled={pending}
      >
        {pending && <Loader2 className='h-4 w-4 animate-spin' />}
        {pending ? "Logging out..." : "Log Out"}
      </button>
    </DropdownMenuItem>
  );
}
