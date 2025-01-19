
import './App.css'
import { BrowserRouter as Router, Route, Routes, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Sidebar from './components/navbar/Sidebar'
import AllFoods from './pages/AllFoods'
import Kitchen from './pages/Kitchen'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Chat from './pages/Chat'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import { ROLES } from './enums/RolesEnum'
import toast, { Toaster } from 'react-hot-toast';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Sidebar />,
      // loader: rootLoader,
      children: [
        {
          path: "/",
          element: <Dashboard />,
          // loader: teamLoader,
        },
        {
          path: "/login",
          element: <Login />,
          // loader: teamLoader,
        },

      ],
    },
  ]);

  return (
    // <RouterProvider router={router} />
    <Router>
      <Toaster
        position="top-center" // Adjust position as needed
        reverseOrder={false} // Optional: controls toast stacking
      />
      <Routes>
        <Route path={'/'} element={<Sidebar />}>
          {/* <Route path={'/'} element={
            <ProtectedRoute  component={Dashboard} roles={[ROLES.DELIVERY_PERSONEL]} />}
            /> */}
          <Route path={'/'} element={<Dashboard />} />
          <Route path={'login'} element={<Login />} />
          <Route path={'register'} element={<Register />} />
          <Route path={'kitchen'} element={<Kitchen />} />
          <Route path={'all-food'} element={<AllFoods />} />
          <Route path={'chat'} element={<Chat />} />
          <Route path={'forgot-password'} element={<ForgotPassword />} />
          <Route path={'reset-password/:uid/:token'} element={<ResetPassword />} />
        </Route>
      </Routes>
    </Router>

    // <Router>
    //   <Routes>
    //     <Route path={'/'} element={<Sidebar />}>
    //       <Route path={'/'} element={<Dashboard/>}/>
    //       <Route path={'login'} element={<Login />} />
    //       <Route path={'register'} element={<Register />} />
    //       <Route path={'kitchen'} element={<Kitchen />}/>
    //       <Route path={'all-food'} element={<AllFoods />} />
    //       <Route path={'chat'} element={<Chat />} />
    //       <Route path={'forgot-password'} element={<ForgotPassword/>}/>
    //       <Route path={'reset-password/:uid/:token'} element={<ResetPassword/>} />
    //     </Route>
    //   </Routes>
    // </Router>
  )
}

export default App
