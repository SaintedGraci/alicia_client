import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ResidentLogin from "./pages/residentLogin.jsx";
import ResidentDashboard from "./pages/residentDashboard.jsx";

function App() {
  return (
   <div className="min-h-screen bg-white overflow-x-hidden">
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
         
          
          {/* Legacy route redirects */}
          <Route path="/resident/login" element={<ResidentLogin />} />
  
          {/* Private routes */}
          <Route path="/resident/dashboard" element={<ResidentDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;