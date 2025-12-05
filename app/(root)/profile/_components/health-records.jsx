'use client'

import React from 'react'
import { ArrowRight, PanelLeft, Pill, Plus, X } from 'lucide-react'
import DateField from '@/components/global/DateField'
import { useProfile } from '@/lib/profileContext'

export default function HealthRecords() {
  const { setMenuOpen } = useProfile()
  const [lastCheckDate, setLastCheckDate] = React.useState(null)
  const [lastBpDate, setLastBpDate] = React.useState(null)

  const [weight, setWeight] = React.useState('')
  const [height, setHeight] = React.useState('')
  const [bloodPressure, setBloodPressure] = React.useState('')

  const [medications] = React.useState([
    'Lisinopril 10mg daily',
    'Ibuprofen 200mg when needed',
  ])

  // medical history as tags
  const [medicalHistory, setMedicalHistory] = React.useState([
    'Asthma',
    'Diabetes Type 2',
    'Allergic Rhinitis',
  ])
  const [showHistoryInput, setShowHistoryInput] = React.useState(false)
  const [newHistoryValue, setNewHistoryValue] = React.useState('')

  const historyLimit = 10

  const handleHistoryKeyDown = (e) => {
    // comma or Enter
    if (e.keyCode === 188 || e.keyCode === 13) {
      e.preventDefault()
      let tag = e.target.value?.trim()

      if (tag) {
        if (medicalHistory.length < historyLimit) {
          if (!medicalHistory.includes(tag)) {
            setMedicalHistory((prev) => [...prev, tag])
          }
        } else {
          // use your existing toast system if you have one
          // toast.warning("Tag limit reached.");
          console.warn('Tag limit reached')
        }
      }

      e.target.value = ''
    }
  }

  const removeHistoryItem = (index) => {
    setMedicalHistory((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className='flex-1 space-y-6 p-[24px] md:p-[50px]'>
      {/* Header */}
      <div className='flex items-center gap-[50px]'>
        <button
          onClick={() => setMenuOpen(true)}
          className='md:hidden w-[40px] h-[40px]  items-center gap-2 bg-[#d67b0e] text-white flex justify-center rounded-full'
        >
          <PanelLeft />
        </button>
        <h2 className='text-[#0D060C] text-[20px] md:text-[24px] font-semibold'>
          Health Profile
        </h2>
      </div>

      <form className='space-y-8'>
        {/* ===== TOP GRID ===== */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          {/* Weight */}
          <div className='md:col-span-1'>
            <label
              htmlFor='weight'
              className='block text-base mb-2 text-[#0D060C]'
            >
              Weight
            </label>
            <input
              id='weight'
              type='text'
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder='Kg/stones/pounds'
              className='bg-white border border-[#EEE0CF] text-black w-full py-[17px] px-[16px] rounded-[6px]'
            />
          </div>

          {/* Height */}
          <div className='md:col-span-1'>
            <label
              htmlFor='height'
              className='block text-base mb-2 text-[#0D060C]'
            >
              Height
            </label>
            <input
              id='height'
              type='text'
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder='Cm/feet/inches'
              className='bg-white border border-[#EEE0CF] text-black w-full py-[17px] px-[16px] rounded-[6px]'
            />
          </div>

          {/* Last Checked Date */}
          <div className='md:col-span-2'>
            <DateField
              id='lastCheckDate'
              label='Last Checked Date'
              selected={lastCheckDate}
              onChange={setLastCheckDate}
              placeholder='27 October 2025'
              className=''
              bg='bg-white border border-[#EEE0CF] text-black'
            />
          </div>

          <div className='md:col-span-2'>
            <label
              htmlFor='bloodPressure'
              className='block text-base mb-2 text-[#0D060C]'
            >
              Blood Pressure
            </label>
            <input
              id='height'
              type='text'
              value={bloodPressure}
              onChange={(e) => setBloodPressure(e.target.value)}
              placeholder='120/80 mmHg – Normal'
              className='bg-white border border-[#EEE0CF] text-black w-full py-[17px] px-[16px] rounded-[6px]'
            />
          </div>
          <div className='md:col-span-2'>
            <DateField
              id='lastBpDate'
              label='Last Blood Pressure Date'
              selected={lastBpDate}
              onChange={setLastBpDate}
              placeholder='28 November 2025'
              className=''
              bg='bg-white border border-[#EEE0CF] text-black'
            />
          </div>
        </div>

        {/* Add New Record button (1 col, same row) */}
        <div className='flex items-end'>
          <button
            type='button'
            className='cursor-pointer text-white inline-block bg-theme text-[16px] font-medium py-4 px-9 rounded-full hover:bg-[#491F40] transition group duration-300 sm:w-auto w-full'
          >
            <span className='flex items-center justify-center'>
              <span>Add New Record</span>
              <span className='ml-2  group-hover:rotate-0 transition duration-300'>
                <Plus className='w-4 h-4' />
              </span>
            </span>
          </button>
        </div>

        {/* ===== BOTTOM GRID ===== */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Current medical history */}
          <div className='space-y-4'>
            <h3 className='text-[#0D060C] text-[16px] font-semibold'>
              Current medical history
            </h3>

            <div className='border border-[#EEE0CF] rounded-[8px] p-4 bg-white'>
              <div className='flex flex-wrap items-center gap-2'>
                {medicalHistory.map((tag, index) => (
                  <span
                    key={index}
                    className='inline-flex items-center gap-2 bg-[#F6F0E6] text-[#3A3D42] text-sm px-3 py-1.5 rounded-full'
                  >
                    {tag}
                    <button
                      type='button'
                      onClick={() => removeHistoryItem(index)}
                      aria-label={`Remove ${tag}`}
                    >
                      <X className='w-3 h-3' />
                    </button>
                  </span>
                ))}

                {/* ➕ Add new chip button */}
                {!showHistoryInput && (
                  <button
                    type='button'
                    onClick={() => setShowHistoryInput(true)}
                    className='bg-[#d67b0e] text-white w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold hover:bg-[#b8680b] transition'
                    aria-label='Add new medical history'
                  >
                    +
                  </button>
                )}

                {/* input only visible when adding */}
                {showHistoryInput && (
                  <input
                    autoFocus
                    type='text'
                    className='min-w-[140px] bg-white border border-[#EEE0CF] outline-none text-sm text-[#3A3D42] py-[6px] px-[8px] rounded-[6px]'
                    maxLength={200}
                    value={newHistoryValue}
                    placeholder='Press Enter to add'
                    onChange={(e) => setNewHistoryValue(e.target.value)}
                    onBlur={() => setShowHistoryInput(false)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        const value = newHistoryValue.trim()

                        if (value && !medicalHistory.includes(value)) {
                          setMedicalHistory([...medicalHistory, value])
                        }

                        setNewHistoryValue('')
                        setShowHistoryInput(false)
                      }
                    }}
                  />
                )}
              </div>
            </div>

            {/* Save Button */}
            <button
              type='submit'
              className='text-white inline-block bg-theme text-[16px] font-medium py-4 px-9 rounded-full hover:bg-[#491F40] transition group duration-300 sm:w-auto w-full'
            >
              <span className='flex items-center justify-center'>
                <span>Save Now</span>
                <span className='ml-2 -rotate-45 group-hover:rotate-0 transition duration-300'>
                  <ArrowRight />
                </span>
              </span>
            </button>
          </div>

          {/* Current medications */}
          <div className='space-y-4'>
            <h3 className='text-[#0D060C] text-[16px] font-semibold'>
              Current medications
            </h3>

            <div className='bg-white border border-[#EEE0CF] rounded-[12px] p-4'>
              {medications.map((med, index) => (
                <div key={med}>
                  <div className='flex items-center gap-3 py-2'>
                    {/* Pill icon */}
                    <div>
                      <Pill className='w-5 h-5 text-[#d67b0e]' />
                    </div>

                    <p className=' text-[#0D060C] font-medium '>{med}</p>
                  </div>

                  {/* divider except last item */}
                  {index < medications.length - 1 && (
                    <div className='border-t border-[#EEE0CF]'></div>
                  )}
                </div>
              ))}
            </div>

            <button
              type='button'
              className='cursor-pointer text-white inline-block bg-theme text-[16px] font-medium py-4 px-9 rounded-full hover:bg-[#491F40] transition group duration-300 sm:w-auto w-full'
            >
              <span className='flex items-center justify-center'>
                <span>Add Medications</span>
                <span className='ml-2  group-hover:rotate-0 transition duration-300'>
                  <Plus className='w-4 h-4' />
                </span>
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
