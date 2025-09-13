import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserDashboard from './pages/user-dashboard';
import AddUserForm from './pages/add-user-form';
import EditUserForm from './pages/edit-user-form';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AddUserForm />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/add-user-form" element={<AddUserForm />} />
        <Route path="/edit-user-form" element={<EditUserForm />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
