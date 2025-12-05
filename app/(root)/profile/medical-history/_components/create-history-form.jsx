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
import { DatePicker } from './date-picker'
import { createRecordAction } from '@/actions/record.action'
import { useState, useEffect, useActionState } from 'react'
import { loggedInUserAction } from '@/actions/user.action'
import { LoaderIcon } from 'lucide-react'

export const CreateHistoryForm = () => {
  const [userId, setUserId] = useState('')
  const [open, setOpen] = useState(false)

  const initialState = {
    msg: '',
    success: false,
  }

  const [state, action, loading] = useActionState(
    createRecordAction,
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
          Create Medical History
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form action={action}>
          <DialogHeader>
            <DialogTitle>Medical History</DialogTitle>
            <DialogDescription>
              Add these information to add Medical History
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 my-4'>
            <input type='hidden' name='userId' value={userId} />

            <div className='grid gap-3'>
              <Label htmlFor='weight'>History Name</Label>
              <Input
                id='history'
                name='history'
                placeholder='Insert Medical History'
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button
              className='bg-theme cursor-pointer hover:bg-purple-800'
              type='submit'
            >
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
