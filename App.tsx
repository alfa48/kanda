import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { SubjectDetail } from './pages/SubjectDetail';
import { TopicView } from './pages/TopicView';

// Simple placeholder for Register
const Register = () => <div className="p-4">Página de Registo (Placeholder)</div>;

// Simple placeholder for Profile
const Profile = () => <div className="p-4">Página de Perfil (Placeholder)</div>;

// Simple placeholder for Subjects List
const SubjectsList = () => <Navigate to="/dashboard" replace />;

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subjects" element={<SubjectsList />} />
        <Route path="/subject/:id" element={<SubjectDetail />} />
        <Route path="/topic/:disciplineId/:moduleId/:topicId" element={<TopicView />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
