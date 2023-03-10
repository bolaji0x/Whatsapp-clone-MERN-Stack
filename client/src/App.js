import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Register, Error, ProtectedRoute } from './pages'
import { SharedLayout, Chat, AddContact } from './pages/dashboard'
import ChatInput from './components/ChatInput'
import { Navbar } from './components'
function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path='/' 
          element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
          }
        >
          <Route index element={<Chat />} />
          <Route path='/addcontact' element={<AddContact />} />
          
        </Route>
        <Route path='/register' element={<Register />} />
        <Route path='/nav' element={<Navbar />} />
        <Route path='/test' element={<ChatInput />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
  )
}

export default App
