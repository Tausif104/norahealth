"use client";

import { useEffect, useRef, useState, startTransition } from "react";
import { useActionState } from "react";
import { toast } from "sonner";
import { forgotPasswordAction } from "@/actions/user.action";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordDialog({ open, onClose }) {
  const initial = { msg: "", success: false };
  const [state, formAction, loading] = useActionState(forgotPasswordAction, initial);

  const lastMsgRef = useRef("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!state.msg) return;

    if (state.msg !== lastMsgRef.current) {
      lastMsgRef.current = state.msg;
      state.success ? toast.success(state.msg) : toast.warning(state.msg);
    }

    if (state.success) {
      setEmail("");
      lastMsgRef.current = "";
      onClose();
    }
  }, [state.msg, state.success, onClose]);

  const submitEmail = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.set("email", email);

    startTransition(() => {
      formAction(fd);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogDescription>
            Enter your email and we’ll send you a reset link.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitEmail} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-theme cursor-pointer">
              {loading ? "Sending..." : "Send Link"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
