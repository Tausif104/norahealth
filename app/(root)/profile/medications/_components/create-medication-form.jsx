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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createMedicationAction } from '@/actions/medication.action'
import { useState, useEffect, useActionState } from 'react'
import { loggedInUserAction } from '@/actions/user.action'
import { LoaderIcon } from 'lucide-react'

export const CreateMedicationForm = () => {
  const [userId, setUserId] = useState('')
  const [open, setOpen] = useState(false)

  const initialState = {
    msg: '',
    success: false,
  }

  const [state, action, loading] = useActionState(
    createMedicationAction,
    initialState
  )

  useEffect(() => {
    const fetchUser = async () => {
      const payload = await loggedInUserAction()
      setUserId(payload?.payload?.id)
    }
    fetchUser()
  }, [])

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
          Create Medication
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form action={action}>
          <DialogHeader>
            <DialogTitle>Medication</DialogTitle>
            <DialogDescription>
              Add these information to add Medication
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 my-4'>
            <input type='hidden' name='userId' value={userId} />

            <div className='grid gap-3'>
              <Label htmlFor='weight'>Medication Label</Label>
              <Input
                id='medication'
                name='medication'
                placeholder='Insert Medication Label'
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button className='bg-theme cursor-pointer' type='submit'>
              {loading ? (
                <LoaderIcon
                  role='status'
                  aria-label='Loading'
                  className='size-4 animate-spin mx-auto'
                />
              ) : (
                'Create'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
