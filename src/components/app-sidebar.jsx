import React from "react";
import { 
  Home, 
  FileText, 
  Bell, 
  User, 
  Settings, 
  LogOut,
  Building 
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", icon: Home, href: "/resident/dashboard" },
  { title: "Documents", icon: FileText, href: "/resident/documents" },
  { title: "Notifications", icon: Bell, href: "/resident/notifications" },
  { title: "Profile", icon: User, href: "/resident/profile" },
  { title: "Settings", icon: Settings, href: "/resident/settings" },
];

export function AppSidebar({ isOpen = true, onLogout }) {
  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${
      isOpen ? 'w-64' : 'w-16'
    } flex flex-col h-full`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Building className="text-white" size={16} />
          </div>
          {isOpen && (
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
          <button
            key={item.title}
            className="w-full flex items-center gap-3 p-3 rounded-lg mb-1 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <item.icon size={20} />
            {isOpen && <span className="font-medium">{item.title}</span>}
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          {isOpen && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
}