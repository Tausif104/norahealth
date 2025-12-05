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

export const CreateRecordForm = () => {
  const [userId, setUserId] = useState('')
  const [bpCheck, setbpCheck] = useState(null)
  const [whCheck, setWHCheck] = useState(null)
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
          Create Record
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form action={action}>
          <DialogHeader>
            <DialogTitle>Health Record</DialogTitle>
            <DialogDescription>
              Add these information to add Medical Record
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 my-4'>
            <input type='hidden' name='userId' value={userId} />

            <div className='grid gap-3'>
              <Label htmlFor='weight'>Weight</Label>
              <Input id='weight' name='weight' placeholder='Weight' />
            </div>

            <div className='grid gap-3'>
              <Label htmlFor='height'>Height</Label>
              <Input id='height' name='height' placeholder='Height' />
            </div>

            <input
              type='hidden'
              name='lwhcheck'
              value={whCheck ? whCheck : ''}
            />
            <DatePicker
              name='lwhcheck'
              value={whCheck}
              onChange={setWHCheck}
              label='Last (W/H) Check'
            />

            <div className='grid gap-3'>
              <Label htmlFor='bp'>Blood Pressure</Label>
              <Input id='bp' name='bp' placeholder='Blood Pressure' />
            </div>

            <input
              type='hidden'
              name='lbpcheck'
              value={bpCheck ? bpCheck : ''}
            />
            <DatePicker
              onChange={setbpCheck}
              value={bpCheck}
              name='lbpcheck'
              label='Last BP Check'
            />
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
