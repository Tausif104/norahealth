'use client'

import { useState } from 'react'
import { ChevronDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export function DatePicker({ label, value, onChange, name = 'date' }) {
  const [open, setOpen] = useState(false)
  const serializedValue = value instanceof Date && !Number.isNaN(value.getTime())
    ? value.toISOString()
    : ''

  return (
    <div className='flex flex-col gap-3 '>
      <Label htmlFor={name} className='px-1'>
        {label}
      </Label>
      <input type='hidden' name={name} value={serializedValue} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            id={name}
            className='w-full justify-between font-normal'
            type='button'
          >
            {value ? value.toLocaleDateString() : 'Select date'}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
          <Calendar
            mode='single'
            selected={value}
            captionLayout='dropdown'
            onSelect={(date) => {
              onChange(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
