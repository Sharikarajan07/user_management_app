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
import apiService from '../../services/apiService';

const UserDashboard = () => {
  const navigate = useNavigate();

  // State management
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // UI State
  const [viewMode, setViewMode] = useState('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [searchFilters, setSearchFilters] = useState({
    username: '',
    email: '',
    location: ''
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt',
    direction: 'desc'
  });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    user: null
  });
  const [toast, setToast] = useState({
    isVisible: false,
    message: '',
    type: 'success'
  });

  // Fetch users from API
  const fetchUsers = async (page = 1, search = '') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiService.getUsers({
        page: page,
        limit: usersPerPage,
        search: search.trim()
      });

      if (response.success) {
        // Transform API data to match frontend expectations
        const transformedUsers = response.data.users.map(user => ({
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          email: user.email,
          phone: user.phoneNumber, // Note: API uses phoneNumber, frontend expects phone
          location: user.location,
          createdAt: user.createdAt
        }));

        setUsers(transformedUsers);
        setTotalUsers(response.data.pagination.totalUsers);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
      setError(err.message || 'Failed to load users');
      showToast('Failed to load users. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Load users on component mount and when page/search changes
  useEffect(() => {
    const searchTerm = Object.values(searchFilters).filter(Boolean).join(' ');
    fetchUsers(currentPage, searchTerm);
  }, [currentPage, usersPerPage]);

  // Search with debounce effect
  useEffect(() => {
    const searchTerm = Object.values(searchFilters).filter(Boolean).join(' ');
    const timeoutId = setTimeout(() => {
      setCurrentPage(1); // Reset to first page on search
      fetchUsers(1, searchTerm);
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchFilters]);

  // Client-side filtering and sorting for current page data
  const filteredAndSortedUsers = useMemo(() => {
    if (!users.length) return [];

    let filtered = [...users];

    // Client-side sorting (for current page only)
    if (sortConfig?.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        
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
    }

    return filtered;
  }, [users, sortConfig]);

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

  const handleDeleteConfirm = async () => {
    const userToDelete = deleteModal?.user;
    try {
      await apiService.deleteUser(userToDelete.id);
      
      // Refresh the current page
      const searchTerm = Object.values(searchFilters).filter(Boolean).join(' ');
      await fetchUsers(currentPage, searchTerm);
      
      setDeleteModal({ isOpen: false, user: null });
      showToast(`User "${userToDelete?.fullName}" has been deleted successfully.`, 'success');
    } catch (error) {
      console.error('Failed to delete user:', error);
      showToast('Failed to delete user. Please try again.', 'error');
    }
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

  // Loading state
  if (loading && !users.length) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading users...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Error state
  if (error && !users.length) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-destructive mb-4">Error: {error}</p>
                <Button onClick={() => fetchUsers(currentPage)}>
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
                Manage and organize user accounts efficiently ({totalUsers} total users)
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
            totalUsers={totalUsers}
            filteredCount={users?.length}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            loading={loading}
          />

          {/* User Display */}
          {viewMode === 'table' ? (
            <UserTable
              users={filteredAndSortedUsers}
              sortConfig={sortConfig}
              onSort={handleSort}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              currentPage={1} // Always 1 since we're using server-side pagination
              usersPerPage={usersPerPage}
              loading={loading}
            />
          ) : (
            <UserCard
              users={filteredAndSortedUsers}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              currentPage={1} // Always 1 since we're using server-side pagination
              usersPerPage={usersPerPage}
              loading={loading}
            />
          )}

          {/* Pagination */}
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalUsers={totalUsers}
              usersPerPage={usersPerPage}
              loading={loading}
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