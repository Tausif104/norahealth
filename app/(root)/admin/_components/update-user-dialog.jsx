"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { updateUserRoleAction } from "@/actions/admin.action";
import { updateUserPasswordAction } from "@/actions/user.action";

export function UpdateUserDialog({ open, setOpen, user, admin }) {
  const [role, setRole] = React.useState(user.role);
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setRole(user.role);
      setPassword("");
    }
  }, [open, user]);

  const actorRole = admin?.role;
  const isSelf = admin?.id === user.id;

  const canEditRole =
    !isSelf &&
    (actorRole === "SUPERADMIN" ||
      (actorRole === "ADMIN" && user.role !== "SUPERADMIN"));

  const allowedRoles =
    actorRole === "SUPERADMIN"
      ? ["PATIENT", "AUTHOR", "ADMIN"]
      : actorRole === "ADMIN"
      ? ["PATIENT", "AUTHOR"]
      : [];

  const handleUpdate = async () => {
    try {
      setLoading(true);

      if (canEditRole && role !== user.role) {
        const res = await updateUserRoleAction({
          userId: user.id,
          newRole: role,
        });

        if (!res.success) {
          toast.error(res.message);
          return;
        }
      }

      if (password.length > 0) {
        await updateUserPasswordAction({
          userId: user.id,
          password,
        });
      }

      toast.success("User updated successfully");
      setOpen(false);
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
        </DialogHeader>

        {/* ROLE */}
        {canEditRole && (
          <div className='space-y-2'>
            <label className='text-sm font-medium'>Role</label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {allowedRoles.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* PASSWORD */}
        <div className='space-y-2'>
          <label className='text-sm font-medium'>New Password</label>
          <Input
            type='password'
            placeholder='Leave empty to keep unchanged'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant='outline' onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={loading}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
