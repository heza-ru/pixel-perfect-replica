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
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'Resolved' as const } : t))
    );
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
    <div className="p-6">
      {/* Page header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-light text-foreground">Work Queue</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {openCount} open &middot; {escalatedCount} escalated
          </p>
        </div>
        <Button size="sm">
          <Plus size={14} className="mr-1.5" /> New Task
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded border border-border p-3 mb-4 flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter size={14} />
          <span>Filter:</span>
        </div>
        <select
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
          value={assigneeFilter}
          onChange={(e) => setAssigneeFilter(e.target.value)}
          className="text-sm border border-border rounded px-2 py-1.5 focus:outline-none focus:border-portal-blue bg-white"
        >
          <option value="All">All Assignees</option>
          {ASSIGNEES.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
        <span className="ml-auto text-xs text-muted-foreground">{filtered.length} tasks</span>
      </div>

      {/* Tasks Table */}
      <div className="bg-white rounded border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Task ID</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Request Type</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Member / Entity</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Assigned To</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Priority</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Due Date</th>
              <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-10 text-muted-foreground">
                  No tasks match the current filters.
                </td>
              </tr>
            )}
            {filtered.map((task) => (
              <tr key={task.id} className="border-b hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{task.id}</td>
                <td className="px-4 py-3">{task.requestType}</td>
                <td className="px-4 py-3 font-medium">{task.memberName}</td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariant(task.status)}>{task.status}</Badge>
                </td>
                <td className="px-4 py-3">
                  {assigning === task.id ? (
                    <div className="flex items-center gap-1.5">
                      <select
                        defaultValue={task.assignedTo}
                        onChange={(e) => assignTo(task.id, e.target.value)}
                        className="text-xs border border-border rounded px-1.5 py-1 focus:outline-none focus:border-portal-blue bg-white"
                      >
                        {ASSIGNEES.map((a) => (
                          <option key={a} value={a}>{a}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => setAssigning(null)}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <span
                      className={task.assignedTo === 'Unassigned' ? 'text-muted-foreground italic' : ''}
                    >
                      {task.assignedTo}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={priorityVariant(task.priority)}>{task.priority}</Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{task.dueDate}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {task.status !== 'Resolved' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-portal-blue hover:text-portal-blue"
                          onClick={() => setAssigning(assigning === task.id ? null : task.id)}
                        >
                          Assign
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-portal-green hover:text-portal-green"
                          onClick={() => resolve(task.id)}
                        >
                          Resolve
                        </Button>
                      </>
                    )}
                    {task.status === 'Resolved' && (
                      <span className="text-xs text-muted-foreground italic">Closed</span>
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
