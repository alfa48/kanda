
import React, { useState, useEffect } from 'react';
import { Menu, X, Home, BookOpen, User, LogOut, MessageCircle, PenTool, BarChart2, Users } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine if we are in "Teacher Mode" based on the URL for this demo
  const isTeacherRoute = location.pathname.startsWith('/teacher');

  const studentNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <Home size={20} /> },
    { path: '/subjects', label: 'Disciplinas', icon: <BookOpen size={20} /> },
    { path: '/chat', label: 'Mensagens', icon: <MessageCircle size={20} /> },
    { path: '/profile', label: 'Perfil', icon: <User size={20} /> },
  ];

  const teacherNavItems = [
    { path: '/teacher', label: 'Visão Geral', icon: <BarChart2 size={20} /> },
    { path: '/teacher/profile', label: 'Meu Perfil Pro', icon: <User size={20} /> },
    { path: '/teacher/students', label: 'Meus Alunos', icon: <Users size={20} /> },
    { path: '/chat', label: 'Mensagens', icon: <MessageCircle size={20} /> }, // Shared chat
  ];

  const navItems = isTeacherRoute ? teacherNavItems : studentNavItems;

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-carbon-gray10">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-carbon-gray100 text-white flex flex-col transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-12 flex items-center px-4 bg-carbon-gray90 border-b border-carbon-gray80">
          <span className="font-mono font-bold text-lg tracking-wider text-white">
            KANDA<span className="text-carbon-blue">.</span>
            {isTeacherRoute && <span className="text-xs ml-2 font-sans bg-carbon-gray80 px-1 rounded text-gray-300">PROF</span>}
          </span>
          <button className="ml-auto md:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-6 flex flex-col">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`flex items-center px-4 py-3 text-sm font-medium transition-colors border-l-4
                      ${isActive 
                        ? 'bg-carbon-gray80 border-carbon-blue text-white' 
                        : 'border-transparent text-gray-300 hover:bg-carbon-gray90 hover:text-white'
                      }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Role Switcher for Demo */}
          <div className="mt-auto px-4 pt-6 pb-2 border-t border-carbon-gray80">
             <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">Acesso Rápido (Demo)</p>
             {!isTeacherRoute ? (
                 <Link 
                    to="/teacher"
                    className="flex items-center px-3 py-2 text-xs font-medium rounded bg-carbon-gray80 text-gray-300 hover:text-white hover:bg-carbon-blue transition-colors mb-2"
                 >
                    <PenTool size={14} className="mr-2"/>
                    Ir para Área do Professor
                 </Link>
             ) : (
                <Link 
                    to="/dashboard"
                    className="flex items-center px-3 py-2 text-xs font-medium rounded bg-carbon-gray80 text-gray-300 hover:text-white hover:bg-carbon-blue transition-colors mb-2"
                 >
                    <BookOpen size={14} className="mr-2"/>
                    Ir para Área do Aluno
                 </Link>
             )}
          </div>
        </nav>

        <div className="p-4 border-t border-carbon-gray80">
           <button 
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
           >
             <LogOut size={18} className="mr-3" />
             Sair
           </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Bar (Mobile) */}
        <header className="md:hidden h-12 bg-carbon-gray100 text-white flex items-center px-4 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <span className="ml-4 font-bold">KANDA {isTeacherRoute && '(Prof)'}</span>
        </header>

        <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
};
