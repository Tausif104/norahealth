"use client";

import { useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useActionState } from "react";
import { toast } from "sonner";
import { resetPasswordAction } from "@/actions/user.action";


export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();

  const token = useMemo(() => params.get("token") || "", [params]);

  const initial = { msg: "", success: false };
  const [state, action, loading] = useActionState(resetPasswordAction, initial);

  useEffect(() => {
    if (!state.msg) return;
    state.success ? toast.success(state.msg) : toast.warning(state.msg);

    if (state.success) router.push("/login");
  }, [state.msg, state.success, router]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl p-6 shadow">
        <h1 className="text-xl font-semibold">Reset Password</h1>
        <p className="text-sm text-gray-600 mt-1">
          Enter a new password for your account.
        </p>

        <form action={action} className="space-y-4 mt-6">
          <input type="hidden" name="token" value={token} />

          <input
            name="password"
            type="password"
            placeholder="New password"
            className="w-full bg-[#F6F5F4] px-4 py-3 rounded-md"
            required
          />

          <input
            name="confirm"
            type="password"
            placeholder="Confirm new password"
            className="w-full bg-[#F6F5F4] px-4 py-3 rounded-md"
            required
          />

          <button
            type="submit"
            disabled={loading || !token}
            className="w-full bg-theme text-white py-3 rounded-full disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

          {!token && (
            <p className="text-sm text-red-600">
              Invalid reset link. Please request a new one.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
