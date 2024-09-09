import { Route, Routes } from 'react-router-dom'

import { AppLayout } from '@/pages/_layout/app'
import { AuthLayout } from '@/pages/_layout/auth'
import { Group } from '@/pages/app/group/group'
import { Settings } from '@/pages/app/settings/settings'
import { Tasks } from '@/pages/app/tasks/tasks'
import { SignIn } from '@/pages/auth/sign-in'
import { SignUp } from '@/pages/auth/sign-up'

const RoutesApp = () => {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/group/:id?" element={<Group />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  )
}

export { RoutesApp }
