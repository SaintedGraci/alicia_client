import { useState, useEffect } from "react";
import { 
  Home, 
  FileText, 
  Bell, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import municipalityLogo from '../assets/alicia.jpg';
import { Link } from "react-router-dom";
import axios from "axios";

export default function ResidentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pending: 0,
    processing: 0,
    completed: 0,
    total: 0
  });
  const [recentRequests, setRecentRequests] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [residentData, setResidentData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('userId');
      
      if (!userId) {
        navigate('/resident-login');
        return;
      }

      // Fetch resident data
      const residentResponse = await axios.get(`http://localhost:5000/api/resident/user/${userId}`);
      const resident = residentResponse.data.data;
      setResidentData(resident);

      // Fetch document requests
      const requestsResponse = await axios.get(`http://localhost:5000/api/document-requests/resident/${resident.id}`);
      const requests = requestsResponse.data.data || [];

      // Calculate stats
      const pending = requests.filter(r => r.status === 'pending').length;
      const processing = requests.filter(r => r.status === 'processing').length;
      const completed = requests.filter(r => ['completed', 'ready'].includes(r.status)).length;

      setStats({
        pending,
        processing,
        completed,
        total: requests.length
      });

      // Get recent requests (last 5)
      setRecentRequests(requests.slice(0, 5));

      // Fetch notifications
      try {
        const notifResponse = await axios.get(`http://localhost:5000/api/notifications/user/${userId}`);
        const notifs = notifResponse.data.data || [];
        setNotifications(notifs.slice(0, 5));
      } catch (error) {
        console.log('No notifications yet');
      }

    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('residentToken');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-orange-600" size={16} />;
      case 'processing':
        return <AlertCircle className="text-blue-600" size={16} />;
      case 'completed':
      case 'ready':
        return <CheckCircle className="text-green-600" size={16} />;
      case 'rejected':
        return <XCircle className="text-red-600" size={16} />;
      default:
        return <Clock className="text-gray-600" size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-600';
      case 'processing':
        return 'bg-blue-100 text-blue-600';
      case 'completed':
      case 'ready':
        return 'bg-green-100 text-green-600';
      case 'rejected':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    return date.toLocaleDateString();
  };

  const menuItems = [
    { title: "Dashboard", icon: Home, href: "/resident-dashboard", active: true },
    { title: "Request Documents", icon: FileText, href: "/request-documents" },
    { title: "Notifications", icon: Bell, href: "/resident-notifications" },
    { title: "Profile", icon: User, href: "/resident-profile" },
    { title: "Settings", icon: Settings, href: "/resident-settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-16'
      } flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden">
              <img 
                src={municipalityLogo} 
                alt="Municipality Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            {sidebarOpen && (
              <div>
                <h2 className="font-bold text-sm text-gray-800">Municipality</h2>
                <p className="text-xs text-gray-500">Resident Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-2">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className={`w-full flex items-center gap-3 p-3 rounded-lg mb-1 transition-colors ${
                item.active 
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="font-medium">{item.title}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Resident Portal</span>
                <ChevronRight size={16} />
                <span className="text-gray-800 font-medium">Dashboard</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User size={16} className="text-blue-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Welcome back{residentData ? `, ${residentData.first_name}` : ''}!
            </h1>
            <p className="text-gray-600">Manage your documents and stay updated with municipal services.</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Pending</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.pending}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="text-orange-600" size={24} />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Processing</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.processing}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <AlertCircle className="text-blue-600" size={24} />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Completed</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.completed}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="text-green-600" size={24} />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Total Requests</p>
                      <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                    </div>
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <FileText className="text-indigo-600" size={24} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">Recent Requests</h2>
                  <Link 
                    to="/request-documents"
                    className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    New Request →
                  </Link>
                </div>
                <div className="p-6">
                  {recentRequests.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                      <p className="text-gray-500 mb-4">No document requests yet</p>
                      <Link
                        to="/request-documents"
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                      >
                        <FileText size={16} className="mr-2" />
                        Request a Document
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentRequests.map((request) => (
                        <div key={request.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200">
                            {getStatusIcon(request.status)}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{request.document_type}</p>
                            <p className="text-sm text-gray-500">
                              {request.request_type === 'barangay' ? 'Barangay' : 'Municipal'} • {formatDate(request.created_at)}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Notifications */}
              {notifications.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Recent Notifications</h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3">
                      {notifications.map((notif) => (
                        <div key={notif.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <Bell size={16} className="text-indigo-600 mt-1" />
                          <div className="flex-1">
                            <p className="font-medium text-gray-800 text-sm">{notif.title}</p>
                            <p className="text-sm text-gray-600">{notif.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{formatDate(notif.created_at)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}