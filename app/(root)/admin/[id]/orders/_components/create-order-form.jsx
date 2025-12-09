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
import { createOrderByAdmin } from '@/actions/order.action'
import { useState, useEffect, useActionState } from 'react'
import { LoaderIcon } from 'lucide-react'
import { useParams } from 'next/navigation'

export const CreateOrderForm = () => {
  const [open, setOpen] = useState(false)

  const params = useParams()
  const id = params.id

  const initialState = {
    msg: '',
    success: false,
  }

  const [state, action, loading] = useActionState(
    createOrderByAdmin,
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
          Create Order
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form action={action}>
          <DialogHeader>
            <DialogTitle>Order</DialogTitle>
            <DialogDescription>
              Add these information to add Order
            </DialogDescription>
          </DialogHeader>
          <input type='hidden' name='userId' value={id} />
          <div className='grid gap-4 my-4'>
            <div className='grid gap-3'>
              <Label htmlFor='medicineName'>Medicine Name</Label>
              <Input
                id='medicineName'
                name='medicineName'
                placeholder='Insert Medicine Name'
              />
            </div>
            <div className='grid gap-3'>
              <Label htmlFor='trackingId'>Tracking ID</Label>
              <Input
                id='trackingId'
                name='trackingId'
                placeholder='EX: #XH45333A4825NR'
              />
            </div>

            <div className='grid gap-3'>
              <Label htmlFor='status'>Status</Label>
              <Select id='status' name='status'>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value='clinicalreview'>
                      Under Clinical Review
                    </SelectItem>
                    <SelectItem value='posted'>
                      Posted Via Royal Mail
                    </SelectItem>
                    <SelectItem value='delivered'>Delivered</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
