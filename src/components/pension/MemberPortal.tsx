import { useState } from 'react';
import { Search, UserPlus, Filter } from 'lucide-react';
import { NavigateFn } from '@/types/navigation';
import { members, Member } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MemberPortalProps {
  navigate: NavigateFn;
  filterType?: 'retirement';
}

const statusVariant = (status: Member['status']): 'default' | 'secondary' | 'destructive' | 'outline' => {
  if (status === 'Active') return 'secondary';
  if (status === 'Retired') return 'default';
  return 'outline';
};

const MemberPortal = ({ navigate, filterType }: MemberPortalProps) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [planFilter, setPlanFilter] = useState('All');

  const baseTitle = filterType === 'retirement' ? 'Retirement & Benefits' : 'Member Portal';
  const baseSubtitle = filterType === 'retirement'
    ? 'Members with active retirement applications'
    : 'All registered plan members';

  const filtered = members.filter((m) => {
    const matchesSearch =
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.id.toLowerCase().includes(search.toLowerCase()) ||
      m.employer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || m.status === statusFilter;
    const matchesPlan = planFilter === 'All' || m.planType === planFilter;
    const matchesType =
      !filterType ||
      filterType !== 'retirement' ||
      m.applications.some((a) => a.type === 'Retirement');
    return matchesSearch && matchesStatus && matchesPlan && matchesType;
  });

  return (
    <div id="member-portal-page" data-testid="member-portal-page" className="p-6">

      {/* Page header */}
      <div id="member-portal-header" className="flex items-center justify-between mb-6">
        <div>
          <h1 id="member-portal-title" className="text-2xl font-light text-foreground">{baseTitle}</h1>
          <p id="member-portal-subtitle" className="text-sm text-muted-foreground mt-0.5">{baseSubtitle}</p>
        </div>
        <Button
          id="member-add-btn"
          aria-label="Add a new member"
          size="sm"
        >
          <UserPlus size={14} className="mr-1.5" aria-hidden="true" /> Add Member
        </Button>
      </div>

      {/* Filters */}
      <div id="member-filters-bar" role="search" aria-label="Filter members" className="bg-white rounded border border-border p-3 mb-4 flex items-center gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input
            id="member-search-input"
            type="search"
            aria-label="Search by name, ID, or employer"
            placeholder="Search by name, ID, or employer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-sm border border-border rounded focus:outline-none focus:border-portal-blue"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter size={14} aria-hidden="true" />
          <span>Filter:</span>
        </div>
        <select
          id="member-status-filter"
          aria-label="Filter by member status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm border border-border rounded px-2 py-1.5 focus:outline-none focus:border-portal-blue bg-white"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Retired">Retired</option>
        </select>
        <select
          id="member-plan-filter"
          aria-label="Filter by plan type"
          value={planFilter}
          onChange={(e) => setPlanFilter(e.target.value)}
          className="text-sm border border-border rounded px-2 py-1.5 focus:outline-none focus:border-portal-blue bg-white"
        >
          <option value="All">All Plan Types</option>
          <option value="Defined Benefit">Defined Benefit</option>
          <option value="Defined Contribution">Defined Contribution</option>
        </select>
        <span id="member-results-count" aria-live="polite" aria-label={`${filtered.length} members found`} className="ml-auto text-xs text-muted-foreground">
          {filtered.length} members
        </span>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded border border-border overflow-hidden">
        <table id="members-table" role="table" aria-label="Members list" className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th scope="col" className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Member ID</th>
              <th scope="col" className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Full Name</th>
              <th scope="col" className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Employer</th>
              <th scope="col" className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Plan Type</th>
              <th scope="col" className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
              <th scope="col" className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Join Date</th>
              <th scope="col" className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr id="members-table-empty">
                <td colSpan={7} className="text-center py-10 text-muted-foreground">
                  No members match the current filters.
                </td>
              </tr>
            )}
            {filtered.map((member) => (
              <tr
                key={member.id}
                id={`member-row-${member.id}`}
                data-testid={`member-row-${member.id}`}
                aria-label={`Member: ${member.name}`}
                className="border-b hover:bg-muted/20 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{member.id}</td>
                <td className="px-4 py-3 font-medium">{member.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{member.employer}</td>
                <td className="px-4 py-3 text-muted-foreground">{member.planType}</td>
                <td className="px-4 py-3">
                  <Badge
                    id={`member-status-${member.id}`}
                    aria-label={`Status: ${member.status}`}
                    variant={statusVariant(member.status)}
                  >
                    {member.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{member.joinDate}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Button
                      id={`member-view-profile-btn-${member.id}`}
                      aria-label={`View profile for ${member.name}`}
                      data-testid={`view-profile-btn-${member.id}`}
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => navigate('member-profile', member.id)}
                    >
                      View Profile
                    </Button>
                    <Button
                      id={`member-refund-btn-${member.id}`}
                      aria-label={`Start refund application for ${member.name}`}
                      data-testid={`refund-btn-${member.id}`}
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs text-portal-blue hover:text-portal-blue"
                      onClick={() => navigate('refund-flow', member.id)}
                    >
                      Refund
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberPortal;
