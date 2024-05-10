import Bottombar from '@/components/shared/Bottombar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import Topbar from '@/components/shared/Topbar'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'

const RootLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when component mounts
  }, [pathname]);

  return (
    <div className='md:w-[90vw] xl:w-[70vw] max-md:w-full mx-auto md:flex'>
      <Topbar />
      <LeftSidebar />

      <section className='flex flex-1 md:h-screen min-h-[80vh]'>
        <Outlet />
      </section>


      <Bottombar />
    </div>
  )
}

export default RootLayout