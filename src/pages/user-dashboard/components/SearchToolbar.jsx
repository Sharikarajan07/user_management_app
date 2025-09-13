import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchToolbar = ({ 
  searchFilters, 
  onSearchChange, 
  onClearSearch, 
  totalUsers, 
  filteredCount,
  viewMode,
  onViewModeChange 
}) => {
  const hasActiveFilters = searchFilters?.username || searchFilters?.email || searchFilters?.location;

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search Inputs */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="search"
            placeholder="Search by username..."
            value={searchFilters?.username}
            onChange={(e) => onSearchChange('username', e?.target?.value)}
            className="w-full"
          />
          
          <Input
            type="search"
            placeholder="Search by email..."
            value={searchFilters?.email}
            onChange={(e) => onSearchChange('email', e?.target?.value)}
            className="w-full"
          />
          
          <Input
            type="search"
            placeholder="Search by location..."
            value={searchFilters?.location}
            onChange={(e) => onSearchChange('location', e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Clear Search */}
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearSearch}
              iconName="X"
              iconPosition="left"
              className="whitespace-nowrap"
            >
              Clear
            </Button>
          )}

          {/* View Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('table')}
              className="px-3 py-1.5 h-8"
            >
              <Icon name="Table" size={16} />
            </Button>
            <Button
              variant={viewMode === 'card' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('card')}
              className="px-3 py-1.5 h-8"
            >
              <Icon name="Grid3X3" size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Results Count */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon name="Users" size={16} className="mr-2" />
          <span>
            Showing {filteredCount} of {totalUsers} users
            {hasActiveFilters && (
              <span className="ml-2 px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
                Filtered
              </span>
            )}
          </span>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Icon name="Filter" size={14} className="mr-1" />
            Active filters applied
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchToolbar;