/* Dashboard page */

function SortIcon() {
  return (
    <svg width="9" height="13" viewBox="0 0 9 13" style={{ marginLeft: 5, opacity: 0.45, flexShrink: 0, display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M4.5 0L0.5 5h8L4.5 0z" fill="currentColor"/>
      <path d="M4.5 13L0.5 8h8l-4.5 5z" fill="currentColor"/>
    </svg>
  );
}

function DashboardPage({ onNav, preDone = false }) {
  const [sessionTab, setSessionTab] = React.useState('onboarding');
  const [search, setSearch] = React.useState('');

  const sessionTabs = [
    { id: 'onboarding',  label: 'Onboarding' },
    { id: 'session-1',   label: 'Session 1' },
    { id: 'session-2',   label: 'Session 2' },
    { id: 'session-3',   label: 'Session 3' },
    { id: 'session-4',   label: 'Session 4' },
    { id: 'session-5',   label: 'Session 5' },
    { id: 'session-6',   label: 'Session 6' },
    { id: 'impact',      label: 'Impact Assessment' },
  ];

  const tableCols = ['Date', 'Time', 'Expert', 'Action Items', 'Recording', 'Transcript', 'Development Plan'];

  return (
    <div className="dashboard-page">

      {/* ── Sprint Progress ── */}
      <section className="dash-sprint">
        <h2 className="dash-heading">Sprint Progress</h2>
        <p className="dash-sub">You have completed 0 of 6 sessions - lets get started!</p>
        <div className="dash-session-tabs">
          {sessionTabs.map(t => (
            <div
              key={t.id}
              className={'dash-session-tab ' + (sessionTab === t.id ? 'active' : '')}>
              {t.label}
            </div>
          ))}
        </div>
      </section>

      {/* ── Bookings ── */}
      <section className="dash-bookings">
        <div className="dash-bookings-inner">
          <h2 className="dash-heading">Bookings</h2>
          <p className="dash-sub" style={{ marginBottom: 20 }}>
            Don't wait too long, your sessions expire on July 31, 2025.
          </p>
          {preDone ? (
            <>
              <p className="dash-bookings-label">Upcoming Sessions</p>
              <button className="btn btn-primary">Book a Session</button>
            </>
          ) : (
            <>
              <p className="dash-bookings-blocked">Fill out pre-assessment to start booking your sessions</p>
              <button className="btn btn-primary" onClick={() => onNav && onNav('assessments')}>
                Go to Assessments
              </button>
            </>
          )}
        </div>
      </section>

      {/* ── Recent Sessions ── */}
      <section className="dash-recent">
        <div className="dash-recent-header">
          <h2 className="dash-heading" style={{ margin: 0 }}>Recent Sessions</h2>
          <div className="dash-search">
            <I.Search size={14}/>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="dash-search-input"
            />
          </div>
        </div>

        <div className="dash-table-wrap">
          <table className="dash-table">
            <thead>
              <tr>
                {tableCols.map(col => (
                  <th key={col} className="dash-th">
                    {col}<SortIcon/>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={tableCols.length} className="dash-empty">
                  No Recent Sessions
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}

window.DashboardPage = DashboardPage;
