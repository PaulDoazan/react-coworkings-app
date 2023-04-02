import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Register, Error, Landing } from './pages';
import { AddCoworking, AllCoworkings, Profile, SharedLayout, ProtectedRoute } from './pages/dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AllCoworkings />}></Route>
          <Route path='add-coworking' element={<AddCoworking />}></Route>
          <Route path='profile' element={<Profile />}></Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
