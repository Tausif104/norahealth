import Footer from '@/components/global/footer'
import Header from '@/components/global/header'
import 'react-datepicker/dist/react-datepicker.css'

export const metadata = {
  title: 'Admin Panel',
  description: 'Free Oral Contraception, Delivered to Your Door',
}

export default function RootLayout({ children }) {
  return (
    <>
      <main>{children}</main>
    </>
  )
}
