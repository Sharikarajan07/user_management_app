import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserCard = ({ users, onEdit, onDelete, currentPage, usersPerPage }) => {
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

  if (displayedUsers?.length === 0) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-8 text-center">
        <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-foreground mb-2">No users found</h3>
        <p className="text-muted-foreground">Try adjusting your search criteria or add a new user.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayedUsers?.map((user) => (
        <div
          key={user?.id}
          className="bg-card rounded-lg border border-border shadow-elevation-1 p-6 hover:shadow-elevation-2 transition-normal"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                <Icon name="User" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg">
                  {user?.fullName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  @{user?.username}
                </p>
              </div>
            </div>
            <div className="flex space-x-1">
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
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-sm">
              <Icon name="Mail" size={16} className="text-muted-foreground mr-2 flex-shrink-0" />
              <span className="text-muted-foreground truncate">{user?.email}</span>
            </div>
            
            <div className="flex items-center text-sm">
              <Icon name="Phone" size={16} className="text-muted-foreground mr-2 flex-shrink-0" />
              <span className="text-muted-foreground">{user?.phone}</span>
            </div>
            
            <div className="flex items-center text-sm">
              <Icon name="MapPin" size={16} className="text-muted-foreground mr-2 flex-shrink-0" />
              <span className="text-muted-foreground">{user?.location}</span>
            </div>
            
            <div className="flex items-center text-sm pt-2 border-t border-border">
              <Icon name="Calendar" size={16} className="text-muted-foreground mr-2 flex-shrink-0" />
              <span className="text-muted-foreground text-xs">
                Created: {formatDate(user?.createdAt)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCard;