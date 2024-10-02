import { PageContainer } from '@/components/page-container'
import { UserPassword } from '@/components/user-password'
import { UserProfile } from '@/components/user-profile'

import { Groups } from '../groups/groups'

export function Settings() {
  return (
    <>
      <PageContainer title="Configurações" pageTitle="Configurações">
        <div className="flex flex-col gap-4 lg:flex-row">
          <UserProfile />
          <UserPassword />
        </div>
        <Groups />
      </PageContainer>
    </>
  )
}
