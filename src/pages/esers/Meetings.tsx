import { Button } from '@/components/ui/button';

const meetings = [
  { id: 'M-001', title: 'Annual Employer Conference', date: '2024-11-15', time: '9:00 AM', location: 'Sacramento Convention Center', type: 'Conference', registered: true },
  { id: 'M-002', title: 'Payroll System Training', date: '2024-11-20', time: '1:00 PM', location: 'Webinar — Zoom', type: 'Training', registered: false },
  { id: 'M-003', title: 'SERS Benefits Orientation', date: '2024-12-05', time: '10:00 AM', location: 'SERS Headquarters, Sacramento', type: 'Orientation', registered: false },
  { id: 'M-004', title: 'Q1 2025 Employer Briefing', date: '2025-01-14', time: '2:00 PM', location: 'Webinar — Teams', type: 'Briefing', registered: false },
];

const Meetings = () => (
  <div id="esers-meetings-page" className="p-6">
    <h1 className="text-2xl font-light text-foreground mb-1">Meetings / Conferences</h1>
    <p className="text-sm text-muted-foreground mb-5">View and register for upcoming employer meetings and SERS-sponsored events.</p>

    <div className="grid grid-cols-1 gap-4">
      {meetings.map((meeting) => (
        <div key={meeting.id} id={`meeting-card-${meeting.id}`} className="bg-white border rounded shadow-sm p-5 flex items-start gap-5">
          {/* Date block */}
          <div className="flex-shrink-0 w-16 text-center">
            <div className="bg-portal-blue text-white rounded-t px-2 py-1 text-xs font-semibold uppercase">
              {new Date(meeting.date).toLocaleString('default', { month: 'short' })}
            </div>
            <div className="border border-t-0 rounded-b px-2 py-2">
              <div className="text-2xl font-bold text-foreground">{new Date(meeting.date).getDate()}</div>
              <div className="text-xs text-muted-foreground">{new Date(meeting.date).getFullYear()}</div>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-foreground">{meeting.title}</h2>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span>{meeting.time}</span>
                  <span>·</span>
                  <span>{meeting.location}</span>
                  <span>·</span>
                  <span
                    className="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-800"
                    aria-label={`Event type: ${meeting.type}`}
                  >
                    {meeting.type}
                  </span>
                </div>
              </div>
              <Button
                id={`meeting-register-${meeting.id}`}
                variant={meeting.registered ? 'outline' : 'default'}
                size="sm"
                className={`text-xs h-7 flex-shrink-0 ${!meeting.registered ? 'bg-portal-green hover:bg-portal-green/90 text-white' : ''}`}
                aria-label={meeting.registered ? `Unregister from ${meeting.title}` : `Register for ${meeting.title}`}
              >
                {meeting.registered ? 'Registered ✓' : 'Register'}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Meetings;
