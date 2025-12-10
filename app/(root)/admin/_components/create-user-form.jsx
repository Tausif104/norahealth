'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createUserAction } from '@/actions/admin.action'
import { useState, useEffect, useActionState } from 'react'
import { LoaderIcon } from 'lucide-react'

export const CreateUserForm = () => {
  const [open, setOpen] = useState(false)

  const initialState = {
    msg: '',
    success: false,
  }

  const [state, action, loading] = useActionState(
    createUserAction,
    initialState
  )

  useEffect(() => {
    if (state.success) {
      setOpen(false)
    }
    state.success = false
  }, [state.success])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='cursor-pointer' variant='outline'>
          Create User
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form action={action}>
          <DialogHeader>
            <DialogTitle>Create User</DialogTitle>
            <DialogDescription>
              Add these information to add a new user.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 my-4'>
            <div className='grid gap-3'>
              <Label htmlFor='weight'>Email</Label>
              <Input id='email' name='email' placeholder='Email' />
            </div>

            <div className='grid gap-3'>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' name='password' placeholder='Password' />
            </div>

            <div className='grid gap-3'>
              <Label htmlFor='password'>Make Admin</Label>
              <Select id='isAdmin' name='isAdmin'>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Make Admin' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Make Admin</SelectLabel>
                    <SelectItem value='true'>Yes</SelectItem>
                    <SelectItem value='false'>No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button className='bg-theme cursor-pointer ' type='submit'>
              {loading ? (
                <LoaderIcon
                  role='status'
                  aria-label='Loading'
                  className='size-4 animate-spin mx-auto'
                />
              ) : (
                'Save'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
