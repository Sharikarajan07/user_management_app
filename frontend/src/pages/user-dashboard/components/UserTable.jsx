import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserTable = ({ 
  users, 
  sortConfig, 
  onSort, 
  onEdit, 
  onDelete,
  currentPage,
  usersPerPage 
}) => {
  const getSortIcon = (column) => {
    if (sortConfig?.key !== column) {
      return <Icon name="ArrowUpDown" size={16} className="ml-1 opacity-50" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={16} className="ml-1 text-primary" />
      : <Icon name="ArrowDown" size={16} className="ml-1 text-primary" />;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const startIndex = (currentPage - 1) * usersPerPage;
  const displayedUsers = users?.slice(startIndex, startIndex + usersPerPage);

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => onSort('username')}
                  className="flex items-center hover:text-primary transition-fast"
                >
                  Username
                  {getSortIcon('username')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => onSort('email')}
                  className="flex items-center hover:text-primary transition-fast"
                >
                  Email
                  {getSortIcon('email')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => onSort('phone')}
                  className="flex items-center hover:text-primary transition-fast"
                >
                  Phone Number
                  {getSortIcon('phone')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => onSort('fullName')}
                  className="flex items-center hover:text-primary transition-fast"
                >
                  Full Name
                  {getSortIcon('fullName')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => onSort('location')}
                  className="flex items-center hover:text-primary transition-fast"
                >
                  Location
                  {getSortIcon('location')}
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => onSort('createdAt')}
                  className="flex items-center hover:text-primary transition-fast"
                >
                  Created Time
                  {getSortIcon('createdAt')}
                </button>
              </th>
              <th className="text-center p-4 font-medium text-foreground w-24">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers?.map((user, index) => (
              <tr 
                key={user?.id} 
                className={`border-b border-border hover:bg-muted/50 transition-fast ${
                  index % 2 === 0 ? 'bg-background' : 'bg-surface'
                }`}
              >
                <td className="p-4 text-foreground font-medium">
                  {user?.username}
                </td>
                <td className="p-4 text-muted-foreground">
                  {user?.email}
                </td>
                <td className="p-4 text-muted-foreground">
                  {user?.phone}
                </td>
                <td className="p-4 text-foreground">
                  {user?.fullName}
                </td>
                <td className="p-4 text-muted-foreground">
                  {user?.location}
                </td>
                <td className="p-4 text-muted-foreground">
                  {formatDate(user?.createdAt)}
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(user)}
                      className="w-8 h-8 text-primary hover:bg-primary/10"
                    >
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(user)}
                      className="w-8 h-8 text-error hover:bg-error/10"
                    >
                      <Icon name="Trash2" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {displayedUsers?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No users found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or add a new user.</p>
        </div>
      )}
    </div>
  );
};

export default UserTable;