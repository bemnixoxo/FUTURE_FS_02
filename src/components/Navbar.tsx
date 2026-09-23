import React from 'react';
import {
  Search,
  Plus,
  LayoutGrid,
  List,
  Filter,
  RefreshCw,
  LogOut,
  User as UserIcon,
} from 'lucide-react';
import { DisplayMode, ViewTab, User } from '../types/crm';

interface NavbarProps {
  currentTab: ViewTab;
  displayMode: DisplayMode;
  onToggleDisplayMode: (mode: DisplayMode) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  onOpenNewLead: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  totalLeads: number;
  user: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  displayMode,
  onToggleDisplayMode,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onOpenNewLead,
  onRefresh,
  isRefreshing,
  totalLeads,
  user,
  onLogout,
}) => {
  const getBreadcrumbTitle = () => {
    switch (currentTab) {
      case 'pipeline':
        return 'Inbound Leads Pipeline';
      case 'analytics':
        return 'Conversion Analytics';
      case 'form-simulator':
        return 'Website Contact Form Simulator';
      case 'embed-api':
        return 'Embed Code & Integration Webhooks';
      case 'docs':
        return 'Architecture & Documentation';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="h-16 px-6 bg-white border-b border-neutral-200 flex items-center justify-between gap-4 sticky top-0 z-20">
      {/* Zone 1: Breadcrumbs & Context */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-xs font-medium text-neutral-400">ApexCRM</span>
        <span className="text-neutral-300">/</span>
        <h1 className="text-sm font-semibold text-neutral-900 truncate">
          {getBreadcrumbTitle()}
        </h1>
        {currentTab === 'pipeline' && (
          <span className="text-xs text-neutral-500 font-mono tabular-nums ml-2">
            ({totalLeads} total)
          </span>
        )}
      </div>

      {/* Zone 2: Search & Filter (Only on Pipeline view) */}
      {currentTab === 'pipeline' ? (
        <div className="flex-1 max-w-md flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name, email, company, inquiry..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:bg-white transition-all"
            />
          </div>

          <div className="relative shrink-0">
            <select
              value={statusFilter}
              onChange={(e) => onStatusFilterChange(e.target.value)}
              aria-label="Filter leads by pipeline status"
              className="appearance-none pl-3 pr-7 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-700 hover:bg-neutral-100/70 focus:outline-none focus:ring-1 focus:ring-neutral-900 cursor-pointer transition-colors"
            >
              <option value="all">All Statuses</option>
              <option value="new">New (Uncontacted)</option>
              <option value="contacted">Contacted</option>
              <option value="in_progress">In Progress</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
            <Filter className="w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      ) : (
        <div className="flex-1" />
      )}

      {/* Zone 3: Actions & Controls */}
      <div className="flex items-center gap-2 shrink-0">
        {currentTab === 'pipeline' && (
          <div className="flex items-center bg-neutral-100 p-0.5 rounded-lg border border-neutral-200">
            <button
              onClick={() => onToggleDisplayMode('kanban')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                displayMode === 'kanban'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="Kanban Board View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onToggleDisplayMode('table')}
              className={`p-1.5 rounded-md text-xs font-medium transition-colors ${
                displayMode === 'table'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="Data Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          title="Refresh leads"
          className="p-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>

        <button
          onClick={onOpenNewLead}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-sm transition-colors whitespace-nowrap"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Lead</span>
        </button>

        {user && (
          <div className="flex items-center gap-2 pl-2 border-l border-neutral-200 ml-1">
            <div className="hidden sm:flex items-center gap-2">
              <img
                src={user.avatarUrl || '/src/assets/images/admin_avatar_1790137823737.jpg'}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover border border-neutral-200"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="%23888" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
                }}
              />
              <div className="text-left text-xs leading-tight">
                <div className="font-semibold text-neutral-800 max-w-[100px] truncate">{user.name}</div>
                <div className="text-[10px] text-neutral-400 capitalize">{user.role}</div>
              </div>
            </div>

            <button
              onClick={onLogout}
              title="Sign Out of CRM"
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-neutral-600 hover:text-rose-600 hover:bg-rose-50 border border-neutral-200 hover:border-rose-200 rounded-lg transition-colors whitespace-nowrap"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
