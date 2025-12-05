'use client'
import * as React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export default function DateField({
  label,
  placeholder = 'Select date',
  selected,
  onChange,
  className = '',
  id,
  bg,
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className={cn('relative', className)}>
      {label && (
        <label htmlFor={id} className='block text-base mb-2 text-[#0D060C]'>
          {label}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={id}
            className={cn(
              `${bg} placeholder:text-[#3A3D42] !w-full 
              py-[15px] md:py-[17px] pl-[16px] pr-[40px] rounded-[6px]
              text-left  focus:outline-none focus:ring-2 
              focus:ring-[#3A3D42]/50`,
              !selected && 'text-[#3A3D42]'
            )}
          >
            {selected ? format(selected, 'dd MMMM yyyy') : placeholder}
            <CalendarIcon className='absolute right-3 bottom-3.5 md:bottom-4.5 w-5 h-5 text-[#3A3D42] pointer-events-none' />
          </button>
        </PopoverTrigger>

        <PopoverContent className='p-0' align='start'>
          <Calendar
            mode='single'
            selected={selected}
            captionLayout='dropdown'
            onSelect={(date) => {
              onChange(date)
              setOpen(false)
            }}
            initialFocus
            className='w-full'
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
