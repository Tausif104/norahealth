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
import { createMedicationByAdminAction } from '@/actions/medication.action'
import { useState, useEffect, useActionState } from 'react'
import { LoaderIcon } from 'lucide-react'
import { useParams } from 'next/navigation'

export const CreateMedicationForm = () => {
  const [open, setOpen] = useState(false)

  const params = useParams()
  const id = params.id

  const initialState = {
    msg: '',
    success: false,
  }

  const [state, action, loading] = useActionState(
    createMedicationByAdminAction,
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
          <input type='hidden' name='userId' value={id} />
          <div className='grid gap-4 my-4'>
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
