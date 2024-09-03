import logo from '@/assets/user_no_image.png'

import { HeaderMenu } from './header-menu'

export function Header() {
  return (
    <div className="w-[300px] flex flex-col border-r-slate-200 border-r">
      <div className="pt-4 pb-4 flex flex-col gap-2 items-center border-b border-b-slate-200">
        <img
          src={logo}
          alt="user"
          className="rounded-full w-[150px] h-[150px] border bg-white"
        />
        <div className="flex flex-col items-center">
          <span className="font-bold">Rodrigo Bussolo</span>
          <span className="text-sm">rbussolo91@gmail.com</span>
        </div>
      </div>
      <div className="h-full">
        <HeaderMenu />
      </div>
    </div>
  )
}
