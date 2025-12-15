'use client'

import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const AdminNavigation = ({ userId }) => {
  const path = usePathname()
  console.log('PATH:', path)
  return (
    <>
      <ButtonGroup>
        <ButtonGroup className='hidden sm:flex'>
          <Button variant='outline' size='icon' aria-label='Go Back' asChild>
            <Link href='/admin'>
              <ArrowLeftIcon />
            </Link>
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button
            variant={
              path.toString() === `/admin/${userId}/records`
                ? 'default'
                : 'outline'
            }
            asChild
          >
            <Link href={`/admin/${userId}/records`}>Medical Records</Link>
          </Button>
          <Button
            variant={
              path.toString() === `/admin/${userId}/history`
                ? 'default'
                : 'outline'
            }
            asChild
          >
            <Link href={`/admin/${userId}/history`}>Medical History</Link>
          </Button>
          <Button
            variant={
              path.toString() === `/admin/${userId}/medications`
                ? 'default'
                : 'outline'
            }
            asChild
          >
            <Link href={`/admin/${userId}/medications`}>Medications</Link>
          </Button>
          <Button
            variant={
              path.toString() === `/admin/${userId}/orders`
                ? 'default'
                : 'outline'
            }
            asChild
          >
            <Link href={`/admin/${userId}/orders`}>Orders</Link>
          </Button>
        </ButtonGroup>
      </ButtonGroup>
    </>
  )
}

export default AdminNavigation
