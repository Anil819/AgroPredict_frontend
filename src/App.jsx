import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layouts
import PublicLayout from '@/layouts/PublicLayout';
import DashboardLayout from '@/layouts/DashboardLayout';

// Components
import LoadingSpinner from '@/components/LoadingSpinner';
import ProtectedRoute from '@/components/ProtectedRoute';

// Lazy loaded pages - Public
const Home = React.lazy(() => import('@/pages/Home'));
const Products = React.lazy(() => import('@/pages/Products'));
const Services = React.lazy(() => import('@/pages/Services'));
const About = React.lazy(() => import('@/pages/About'));
const Contact = React.lazy(() => import('@/pages/Contact'));

// Lazy loaded pages - Auth
const Login = React.lazy(() => import('@/pages/Login'));
const Register = React.lazy(() => import('@/pages/Register'));

// Lazy loaded pages - Dashboard Protected
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));
const CropPrediction = React.lazy(() => import('@/pages/CropPrediction'));
const SoilAnalysis = React.lazy(() => import('@/pages/SoilAnalysis'));
const Weather = React.lazy(() => import('@/pages/Weather'));
const DiseaseDetection = React.lazy(() => import('@/pages/DiseaseDetection'));
const YieldPrediction = React.lazy(() => import('@/pages/YieldPrediction'));
const ProfitPrediction = React.lazy(() => import('@/pages/ProfitPrediction'));
const Irrigation = React.lazy(() => import('@/pages/Irrigation'));
const Chatbot = React.lazy(() => import('@/pages/Chatbot'));
const PredictionHistory = React.lazy(() => import('@/pages/PredictionHistory'));
const Reports = React.lazy(() => import('@/pages/Reports'));
const Videos = React.lazy(() => import('@/pages/Videos'));
const Profile = React.lazy(() => import('@/pages/Profile'));
const Settings = React.lazy(() => import('@/pages/Settings'));
const Logout = React.lazy(() => import('@/pages/Logout'));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner fullScreen />}>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected dashboard routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/crop-prediction" element={<CropPrediction />} />
              <Route path="/soil-analysis" element={<SoilAnalysis />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/disease-detection" element={<DiseaseDetection />} />
              <Route path="/yield-prediction" element={<YieldPrediction />} />
              <Route path="/profit-prediction" element={<ProfitPrediction />} />
              <Route path="/irrigation" element={<Irrigation />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/prediction-history" element={<PredictionHistory />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
          </Route>

          {/* 404 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
