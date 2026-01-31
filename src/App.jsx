import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LoginPage from './pages/login.jsx';
import RegisterPage from './pages/register.jsx'; // Assuming you have this now

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-md p-4 flex justify-center space-x-6">
          <Link 
            to="/login" 
            className="text-blue-600 hover:text-blue-800 font-semibold transition duration-200"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="text-blue-600 hover:text-blue-800 font-semibold transition duration-200"
          >
            Register
          </Link>
        </nav>

        {/* Main Content Area */}
        <main className="container mx-auto mt-10 px-4">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
            {/* Redirect root path to login */}
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;