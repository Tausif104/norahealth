"use client";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { updateAccountByAdmin } from "@/actions/account.action";
import { useState, useEffect, useActionState } from "react";
import { LoaderIcon } from "lucide-react";
import { DatePicker } from "../records/_components/date-picker";

export const UpdateAccountForm = ({ user }) => {
  const params = useParams();
  const id = params.id;
  console.log("userId",user, id);
  
  const [dob, setDob] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [nhsNumber, setNhsNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [open, setOpen] = useState(false);

  const initialState = {
    msg: "",
    success: false,
  };

  const [state, action, loading] = useActionState(
    updateAccountByAdmin,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      setOpen(false);
    }
    state.success = false;
  }, [state.success]);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch(`/api/users/${id}`);
      const user = await response.json();

      if (user.success) {
        setFirstName(user.data.firstName || "");
        setLastName(user.data.lastName || "");
        setDob(user.data.dob ? new Date(user.data.dob) : null);
        setPhoneNumber(user.data.phoneNumber || "");
        setAddress(user.data.address || "");
        setNhsNumber(user.data.nhsNumber || "");
        setZipCode(user.data.zipCode || "");
        setDeliveryAddress(user.data.deliveryAddress || "");
      }
    };
    fetchUserData();
  }, [id]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="outline">
          Edit Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>Edit Account Information</DialogTitle>
            <DialogDescription>Update the user details</DialogDescription>
          </DialogHeader>

          <input type="hidden" name="userId" value={id} />

          <div className="grid gap-4 my-4 sm:grid-cols-2">
            <div className="grid gap-3">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="dob">Date of Birth</Label>
              <DatePicker
                name="dob"
                value={dob}
                onChange={setDob}
                label="Date of Birth"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="nhsNumber">NHS Number</Label>
              <Input
                id="nhsNumber"
                name="nhsNumber"
                placeholder="NHS Number"
                value={nhsNumber}
                onChange={(e) => setNhsNumber(e.target.value)}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="zipCode">Post Code</Label>
              <Input
                id="zipCode"
                name="zipCode"
                placeholder="Post Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>

            <div className="grid gap-3 sm:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="grid gap-3 sm:col-span-2">
              <Label htmlFor="deliveryAddress">Delivery Address</Label>
              <Input
                id="deliveryAddress"
                name="deliveryAddress"
                placeholder="Delivery Address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button className="bg-theme cursor-pointer" type="submit">
              {loading ? (
                <LoaderIcon
                  role="status"
                  aria-label="Loading"
                  className="size-4 animate-spin mx-auto"
                />
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
