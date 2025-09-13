import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';

import UserTable from './components/UserTable';
import UserCard from './components/UserCard';
import SearchToolbar from './components/SearchToolbar';
import Pagination from './components/Pagination';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import Toast from './components/Toast';

const UserDashboard = () => {
  const navigate = useNavigate();

  // Mock user data
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "john_doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      fullName: "John Doe",
      location: "New York, NY",
      createdAt: "2024-01-15T10:30:00Z"
    },
    {
      id: 2,
      username: "sarah_wilson",
      email: "sarah.wilson@example.com",
      phone: "+1 (555) 234-5678",
      fullName: "Sarah Wilson",
      location: "Los Angeles, CA",
      createdAt: "2024-02-20T14:45:00Z"
    },
    {
      id: 3,
      username: "mike_johnson",
      email: "mike.johnson@example.com",
      phone: "+1 (555) 345-6789",
      fullName: "Michael Johnson",
      location: "Chicago, IL",
      createdAt: "2024-03-10T09:15:00Z"
    },
    {
      id: 4,
      username: "emily_brown",
      email: "emily.brown@example.com",
      phone: "+1 (555) 456-7890",
      fullName: "Emily Brown",
      location: "Houston, TX",
      createdAt: "2024-04-05T16:20:00Z"
    },
    {
      id: 5,
      username: "david_garcia",
      email: "david.garcia@example.com",
      phone: "+1 (555) 567-8901",
      fullName: "David Garcia",
      location: "Phoenix, AZ",
      createdAt: "2024-05-12T11:30:00Z"
    },
    {
      id: 6,
      username: "lisa_martinez",
      email: "lisa.martinez@example.com",
      phone: "+1 (555) 678-9012",
      fullName: "Lisa Martinez",
      location: "Philadelphia, PA",
      createdAt: "2024-06-18T13:45:00Z"
    },
    {
      id: 7,
      username: "robert_taylor",
      email: "robert.taylor@example.com",
      phone: "+1 (555) 789-0123",
      fullName: "Robert Taylor",
      location: "San Antonio, TX",
      createdAt: "2024-07-22T08:10:00Z"
    },
    {
      id: 8,
      username: "jennifer_white",
      email: "jennifer.white@example.com",
      phone: "+1 (555) 890-1234",
      fullName: "Jennifer White",
      location: "San Diego, CA",
      createdAt: "2024-08-14T15:25:00Z"
    },
    {
      id: 9,
      username: "chris_anderson",
      email: "chris.anderson@example.com",
      phone: "+1 (555) 901-2345",
      fullName: "Christopher Anderson",
      location: "Dallas, TX",
      createdAt: "2024-09-01T12:40:00Z"
    },
    {
      id: 10,
      username: "amanda_thomas",
      email: "amanda.thomas@example.com",
      phone: "+1 (555) 012-3456",
      fullName: "Amanda Thomas",
      location: "San Jose, CA",
      createdAt: "2024-09-10T17:55:00Z"
    }
  ]);

  // State management
  const [searchFilters, setSearchFilters] = useState({
    username: '',
    email: '',
    location: ''
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt',
    direction: 'desc'
  });
  const [viewMode, setViewMode] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    user: null
  });
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success'
  });

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users?.filter(user => {
      const matchesUsername = user?.username?.toLowerCase()?.includes(searchFilters?.username?.toLowerCase());
      const matchesEmail = user?.email?.toLowerCase()?.includes(searchFilters?.email?.toLowerCase());
      const matchesLocation = user?.location?.toLowerCase()?.includes(searchFilters?.location?.toLowerCase());
      
      return matchesUsername && matchesEmail && matchesLocation;
    });

    // Sort users
    filtered?.sort((a, b) => {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];
      
      if (sortConfig?.key === 'createdAt') {
        const aDate = new Date(aValue);
        const bDate = new Date(bValue);
        return sortConfig?.direction === 'asc' ? aDate - bDate : bDate - aDate;
      }
      
      if (typeof aValue === 'string') {
        return sortConfig?.direction === 'asc' 
          ? aValue?.localeCompare(bValue)
          : bValue?.localeCompare(aValue);
      }
      
      return sortConfig?.direction === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return filtered;
  }, [users, searchFilters, sortConfig]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredAndSortedUsers?.length / usersPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchFilters]);

  // Handlers
  const handleSearchChange = (field, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClearSearch = () => {
    setSearchFilters({
      username: '',
      email: '',
      location: ''
    });
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleEdit = (user) => {
    navigate('/edit-user-form', { state: { user } });
  };

  const handleDeleteClick = (user) => {
    setDeleteModal({
      isOpen: true,
      user
    });
  };

  const handleDeleteConfirm = () => {
    const userToDelete = deleteModal?.user;
    setUsers(prev => prev?.filter(user => user?.id !== userToDelete?.id));
    setDeleteModal({ isOpen: false, user: null });
    showToast(`User "${userToDelete?.fullName}" has been deleted successfully.`, 'success');
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, user: null });
  };

  const showToast = (message, type = 'success') => {
    setToast({
      isVisible: true,
      message,
      type
    });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddUser = () => {
    navigate('/add-user-form');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                User Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage and organize user accounts efficiently
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button
                onClick={handleAddUser}
                iconName="UserPlus"
                iconPosition="left"
                size="lg"
                className="w-full sm:w-auto"
              >
                Add New User
              </Button>
            </div>
          </div>

          {/* Search Toolbar */}
          <SearchToolbar
            searchFilters={searchFilters}
            onSearchChange={handleSearchChange}
            onClearSearch={handleClearSearch}
            totalUsers={users?.length}
            filteredCount={filteredAndSortedUsers?.length}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {/* User Display */}
          {viewMode === 'table' ? (
            <UserTable
              users={filteredAndSortedUsers}
              sortConfig={sortConfig}
              onSort={handleSort}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              currentPage={currentPage}
              usersPerPage={usersPerPage}
            />
          ) : (
            <UserCard
              users={filteredAndSortedUsers}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              currentPage={currentPage}
              usersPerPage={usersPerPage}
            />
          )}

          {/* Pagination */}
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalUsers={filteredAndSortedUsers?.length}
              usersPerPage={usersPerPage}
            />
          </div>
        </div>
      </main>
      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModal?.isOpen}
        user={deleteModal?.user}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
      {/* Toast Notifications */}
      <Toast
        message={toast?.message}
        type={toast?.type}
        isVisible={toast?.isVisible}
        onClose={hideToast}
      />
    </div>
  );
};

export default UserDashboard;