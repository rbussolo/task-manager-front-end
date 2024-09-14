import { Helmet } from 'react-helmet-async'

import { UserPassword } from '@/components/user-password'
import { UserProfile } from '@/components/user-profile'

import { Groups } from '../groups/groups'

export function Settings() {
  return (
    <>
      <Helmet title="Configurações" />

      <div className="flex flex-col w-full h-full">
        <div className="p-10 flex flex-col justify-center bg-slate-200 min-h-[150px]">
          <h3 className="text-3xl">Configurações</h3>
        </div>

        <div className="p-10 flex flex-col gap-4">
          <div className="flex flex-col gap-4 lg:flex-row">
            <UserProfile />
            <UserPassword />
          </div>
          <Groups />
        </div>
      </div>
    </>
  )
}
