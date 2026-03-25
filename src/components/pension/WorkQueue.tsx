import { useState } from 'react';
import { Plus, Filter } from 'lucide-react';
import { NavigateFn } from '@/types/navigation';
import { workTasks, WorkTask } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface WorkQueueProps {
  navigate: NavigateFn;
}

const priorityVariant = (p: WorkTask['priority']): 'default' | 'secondary' | 'destructive' | 'outline' => {
  if (p === 'High') return 'destructive';
  if (p === 'Medium') return 'default';
  return 'outline';
};

const statusVariant = (s: WorkTask['status']): 'default' | 'secondary' | 'destructive' | 'outline' => {
  if (s === 'Resolved') return 'secondary';
  if (s === 'Escalated') return 'destructive';
  if (s === 'In Progress') return 'default';
  return 'outline';
};

const ASSIGNEES = ['Unassigned', 'Sarah Collins', 'Mike Chen', 'Jake Rivera', 'Amy Park'];

const WorkQueue = ({ navigate: _navigate }: WorkQueueProps) => {
  const [tasks, setTasks] = useState<WorkTask[]>(workTasks);
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [assigneeFilter, setAssigneeFilter] = useState('All');
  const [assigning, setAssigning] = useState<string | null>(null);

  const filtered = tasks.filter((t) => {
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    const matchesAssignee = assigneeFilter === 'All' || t.assignedTo === assigneeFilter;
    return matchesStatus && matchesPriority && matchesAssignee;
  });

  const resolve = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status: 'Resolved' as const } : t)));
  };

  const assignTo = (id: string, assignee: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, assignedTo: assignee, status: assignee === 'Unassigned' ? t.status : ('In Progress' as const) }
          : t
      )
    );
    setAssigning(null);
  };

  const openCount = tasks.filter((t) => t.status === 'Open').length;
  const escalatedCount = tasks.filter((t) => t.status === 'Escalated').length;

  return (
    <div id="work-queue-page" data-testid="work-queue-page" className="p-6">

      {/* Page header */}
      <div id="work-queue-header" className="flex items-center justify-between mb-5">
        <div>
          <h1 id="work-queue-title" className="text-2xl font-light text-foreground">Work Queue</h1>
          <p id="work-queue-subtitle" aria-live="polite" className="text-sm text-muted-foreground mt-0.5">
            {openCount} open &middot; {escalatedCount} escalated
          </p>
        </div>
        <Button
          id="work-queue-new-task-btn"
          aria-label="Create a new task"
          data-testid="new-task-btn"
          size="sm"
        >
          <Plus size={14} className="mr-1.5" aria-hidden="true" /> New Task
        </Button>
      </div>

      {/* Filters */}
      <div id="work-queue-filters" role="search" aria-label="Filter tasks" className="bg-white rounded border border-border p-3 mb-4 flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter size={14} aria-hidden="true" />
          <span>Filter:</span>
        </div>
        <select
          id="work-queue-status-filter"
          aria-label="Filter tasks by status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-sm border border-border rounded px-2 py-1.5 focus:outline-none focus:border-portal-blue bg-white"
        >
          <option value="All">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Escalated">Escalated</option>
          <option value="Resolved">Resolved</option>
        </select>
        <select
          id="work-queue-priority-filter"
          aria-label="Filter tasks by priority"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="text-sm border border-border rounded px-2 py-1.5 focus:outline-none focus:border-portal-blue bg-white"
        >
          <option value="All">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <select
          id="work-queue-assignee-filter"
          aria-label="Filter tasks by assignee"
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
          className="text-sm border border-border rounded px-2 py-1.5 focus:outline-none focus:border-portal-blue bg-white"
        >
          <option value="All">All Assignees</option>
          {ASSIGNEES.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
        <span
          id="work-queue-results-count"
          aria-live="polite"
          aria-label={`${filtered.length} tasks found`}
          className="ml-auto text-xs text-muted-foreground"
        >
          {filtered.length} tasks
        </span>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded border border-border overflow-hidden">
        <table id="tasks-table" role="table" aria-label="Work queue tasks" className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Task ID</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Request Type</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Member / Entity</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Assigned To</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Priority</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Due Date</th>
              <th scope="col" className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr id="tasks-table-empty">
                <td colSpan={8} className="text-center py-10 text-muted-foreground">No tasks match the current filters.</td>
              </tr>
            )}
            {filtered.map((task) => (
              <tr
                key={task.id}
                id={`task-row-${task.id}`}
                data-testid={`task-row-${task.id}`}
                aria-label={`Task ${task.id}: ${task.requestType} for ${task.memberName}`}
                className="border-b hover:bg-muted/20 transition-colors"
              >
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{task.id}</td>
                <td className="px-4 py-3">{task.requestType}</td>
                <td className="px-4 py-3 font-medium">{task.memberName}</td>
                <td className="px-4 py-3">
                  <Badge
                    id={`task-status-badge-${task.id}`}
                    aria-label={`Task status: ${task.status}`}
                    variant={statusVariant(task.status)}
                  >
                    {task.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  {assigning === task.id ? (
                    <div id={`task-assign-dropdown-${task.id}`} className="flex items-center gap-1.5">
                      <select
                        id={`task-assignee-select-${task.id}`}
                        aria-label={`Assign task ${task.id} to a team member`}
                        defaultValue={task.assignedTo}
                        onChange={(e) => assignTo(task.id, e.target.value)}
                        className="text-xs border border-border rounded px-1.5 py-1 focus:outline-none focus:border-portal-blue bg-white"
                      >
                        {ASSIGNEES.map((a) => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                      <button
                        id={`task-assign-cancel-${task.id}`}
                        aria-label="Cancel assignment"
                        onClick={() => setAssigning(null)}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <span
                      id={`task-assignee-${task.id}`}
                      className={task.assignedTo === 'Unassigned' ? 'text-muted-foreground italic' : ''}
                    >
                      {task.assignedTo}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    id={`task-priority-badge-${task.id}`}
                    aria-label={`Priority: ${task.priority}`}
                    variant={priorityVariant(task.priority)}
                  >
                    {task.priority}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{task.dueDate}</td>
                <td className="px-4 py-3">
                  <div id={`task-actions-${task.id}`} className="flex items-center gap-2">
                    {task.status !== 'Resolved' && (
                      <>
                        <Button
                          id={`task-assign-btn-${task.id}`}
                          aria-label={`Assign task ${task.id}`}
                          data-testid={`task-assign-btn-${task.id}`}
                          variant="ghost" size="sm"
                          className="h-7 text-xs text-portal-blue hover:text-portal-blue"
                          onClick={() => setAssigning(assigning === task.id ? null : task.id)}
                        >
                          Assign
                        </Button>
                        <Button
                          id={`task-resolve-btn-${task.id}`}
                          aria-label={`Resolve task ${task.id}`}
                          data-testid={`task-resolve-btn-${task.id}`}
                          variant="ghost" size="sm"
                          className="h-7 text-xs text-portal-green hover:text-portal-green"
                          onClick={() => resolve(task.id)}
                        >
                          Resolve
                        </Button>
                      </>
                    )}
                    {task.status === 'Resolved' && (
                      <span id={`task-closed-label-${task.id}`} className="text-xs text-muted-foreground italic">Closed</span>
                    )}
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

export default WorkQueue;
