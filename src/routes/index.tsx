import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider/useAuth';
import { Login } from '../pages/Login';
import { Task } from '../pages/Task';
import { Template } from '../components/Template';

const LoginLayout = () => {
  const user = useAuth().getCurrentUser();

  if (user) {
    return <Navigate to="/tasks" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  )
}

const ProtectedRoute = () => {
  const user = useAuth().getCurrentUser();

  if (!user) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <Template>
        <Outlet />
      </Template>
    </>
  )
};

const RoutesApp = () => {
  const user = useAuth().getCurrentUser();

  return (
    <>
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/tasks" element={<Task />} />
        </Route>

        <Route path="*" element={user ? (
          <Template>
            <Task />
          </Template>
        ) : (
          <Login />
        )} />
      </Routes>
    </>
  )
}

export { RoutesApp };