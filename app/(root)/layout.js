import Footer from '@/components/global/footer'
import Header from '@/components/global/header'

export const metadata = {
  title: 'Home',
  description: 'Free Oral Contraception, Delivered to Your Door',
}

export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      <main className='min-h-screen'>{children}</main>
      <Footer />
    </>
  )
}
