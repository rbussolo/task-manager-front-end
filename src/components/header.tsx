import { useQuery } from '@tanstack/react-query'
import { AlignJustify } from 'lucide-react'
import { useState } from 'react'

import { getProfile } from '@/api/get-profile'
import logo from '@/assets/user_no_image.png'

import { HeaderMenu } from './header-menu'
import { Skeleton } from './ui/skeleton'

export function Header() {
  const [showMenu, setShowMenu] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  })

  function handleShowMenu() {
    setShowMenu(!showMenu)
  }

  const userLogo = data?.urlImage ?? logo

  return (
    <div className={`w-[60px] md:w-[300px] transition-all`}>
      <div
        className={`relative h-full md:static md:w-[300px] flex flex-col border-r-slate-200 border-r bg-white transition-all ${showMenu ? 'w-[300px]' : 'w-[60px]'}`}
      >
        <div
          onClick={handleShowMenu}
          className="flex justify-center items-center pt-4 pb-4 cursor-pointer md:hidden hover:bg-slate-100"
        >
          <AlignJustify />
        </div>
        <div
          className={`pt-4 pb-4 md:flex flex flex-col gap-2 items-center border-b border-b-slate-200 ${showMenu ? '' : 'hidden'}`}
        >
          <img
            src={userLogo}
            alt="user"
            className="rounded-full w-[150px] h-[150px] border bg-white"
          />
          <div className="flex flex-col items-center overflow-hidden text-nowrap">
            {isLoading ? (
              <>
                <Skeleton className="w-40 h-6" />
                <Skeleton className="w-40 h-5" />
              </>
            ) : (
              <>
                <span className="font-bold">{data?.name}</span>
                <span className="text-sm">{data?.email}</span>
              </>
            )}
          </div>
        </div>
        <div className="h-full">
          <HeaderMenu expanded={showMenu} />
        </div>
      </div>
    </div>
  )
}
