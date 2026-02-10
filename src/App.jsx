import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ResidentLogin from "./pages/residentLogin.jsx";
import ResidentDashboard from "./pages/residentDashboard.jsx";
import RequestDocuments from "./pages/RequestDocuments.jsx";

function App() {
  return (
   <div className="min-h-screen bg-white overflow-x-hidden">
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/resident-login" element={<ResidentLogin />} />
          
          {/* Legacy route redirects */}
          <Route path="/resident/login" element={<ResidentLogin />} />
  
          {/* Private routes for residents */}
          <Route path="/resident-dashboard" element={<ResidentDashboard />} />
          <Route path="/request-documents" element={<RequestDocuments />} />
          
          {/* Legacy routes */}
          <Route path="/resident/dashboard" element={<ResidentDashboard />} />
          <Route path="/resident/request-documents" element={<RequestDocuments />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;