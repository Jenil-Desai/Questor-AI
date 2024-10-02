import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/protect/ProtectedRoute';
import { AuthProvider } from './hooks/UseAuth';

// Lazy load the components
const HeroSection = lazy(() => import('./pages/HeroSection'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Signup = lazy(() => import('./pages/Signup'));
const Signin = lazy(() => import('./pages/Signin'));
const GenQuesto = lazy(() => import('./pages/GenQuesto'));

const App = () => {
  const routes = [
    { path: '/', element: <HeroSection /> },
    { path: '/dashboard', element: <ProtectedRoute> <Dashboard /></ProtectedRoute> },
    { path: '/signup', element: <Signup /> },
    { path: '/signin', element: <Signin /> },
    { path: '/question-paper-generator', element: <ProtectedRoute><GenQuesto /></ProtectedRoute> },
  ];

  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
