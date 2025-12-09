"use client";

import { useEffect, useState, startTransition, useRef } from "react";
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
  const initial = { msg: "", success: false, step: 1 };

  const [state, formAction, loading] = useActionState(
    forgotPasswordAction,
    initial
  );
  const lastMsgRef = useRef("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  useEffect(() => {
    // don't show empty messages
    if (!state.msg) return;

    // only show each unique message once
    if (state.msg !== lastMsgRef.current) {
      lastMsgRef.current = state.msg;
      if (state.success) toast.success(state.msg);
      else toast.warning(state.msg);
    }

    state.msg = "";

    // if password updated (step 3) close and reset fields
    if (state.step === 3) {
      // reset local fields and lastMsg so subsequent actions can show same message again if needed
      setEmail("");
      setPassword("");
      setConfirm("");
      lastMsgRef.current = "";
      onClose();
      state.msg = "";
    }
  }, [state.msg, state.success, state.step, onClose]);

  // Step 1 submit — call action inside startTransition
  const submitEmail = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.set("step", "1");
    fd.set("email", email);

    // Call the server action inside startTransition to avoid the warning
    startTransition(() => {
      // don't await directly — let the hook update state, and useEffect reacts to state.msg
      formAction(fd);
    });
  };

  // Step 2 submit — same pattern
  const submitPassword = (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.set("step", "2");
    fd.set("email", email);
    fd.set("password", password);
    fd.set("confirm", confirm);

    startTransition(() => {
      formAction(fd);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            {state.step === 1
              ? "Enter your email to verify your account."
              : "Enter your new password below."}
          </DialogDescription>
        </DialogHeader>

        {state.step === 1 && (
          <form onSubmit={submitEmail} className='space-y-4'>
            <Input
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <DialogFooter>
              <Button variant='outline' type='button' onClick={onClose}>
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={loading}
                className='bg-theme cursor-pointer'
              >
                {loading ? "Checking..." : "Next"}
              </Button>
            </DialogFooter>
          </form>
        )}

        {state.step === 2 && (
          <form onSubmit={submitPassword} className='space-y-4'>
            <Input
              type='password'
              placeholder='New password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Input
              type='password'
              placeholder='Confirm password'
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />

            <DialogFooter>
              <Button variant='outline' type='button' onClick={onClose}>
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={loading}
                className='bg-theme cursor-pointer'
              >
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
