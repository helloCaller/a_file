/* Assessments list view — sprints as one entity with two phases */

function ListView({ onStartPre, onStartPost, onViewResults }) {
  const [tab, setTab] = React.useState('all');

  // Each sprint = one entity. Baseline and Impact are phases.
  const sprints = [
    {
      id: 'sprint-4', name: 'Sprint 4', status: 'current',
      meta: 'Active · with Mac Gebara',
      baseline: { state: 'due', label: 'Start baseline', action: 'pre' },
      impact: { state: 'locked', label: 'Available at sprint end' },
    },
    {
      id: 'sprint-3', name: 'Sprint 3', status: 'current',
      meta: 'Wrapping up · with Mac Gebara',
      baseline: { state: 'done', date: 'Jan 6', action: 'results' },
      impact: { state: 'draft', label: 'Resume — 3 of 4 done', action: 'post' },
    },
    {
      id: 'sprint-2', name: 'Sprint 2', status: 'complete',
      meta: 'Completed Dec 18, 2025 · with Mac Gebara',
      baseline: { state: 'done', date: 'Oct 12', action: 'results' },
      impact: { state: 'done', date: 'Dec 18', action: 'results' },
    },
    {
      id: 'sprint-1', name: 'Sprint 1', status: 'complete',
      meta: 'Completed Sep 22, 2025 · with Sarah Chen',
      baseline: { state: 'done', date: 'Jul 9', action: 'results' },
      impact: { state: 'done', date: 'Sep 22', action: 'results' },
    },
  ];

  const filtered = sprints.filter(s => {
    if (tab === 'all') return true;
    if (tab === 'open') return s.status === 'current';
    if (tab === 'complete') return s.status === 'complete';
    return true;
  });

  const phaseClick = (phase) => {
    if (phase.state === 'locked') return;
    if (phase.action === 'pre') onStartPre();
    else if (phase.action === 'post') onStartPost();
    else if (phase.action === 'results') onViewResults();
  };

  return (
    <div>
      <div className="list-tabs">
        <span className="list-filter-label">
          <I.AdjustmentsH size={15}/> Filter
        </span>
        <div className="list-filter-group">
          {[
            { id: 'all', label: 'All sprints' },
            { id: 'open', label: 'Current' },
            { id: 'complete', label: 'Completed' },
          ].map(t => (
            <button key={t.id}
                    className={'list-tab ' + (tab === t.id ? 'active' : '')}
                    onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.map(sprint => (
        <SprintCard key={sprint.id} sprint={sprint} onPhase={phaseClick}/>
      ))}
    </div>
  );
}

function SprintCard({ sprint, onPhase }) {
  const tagCls = sprint.status === 'current' ? 'current' : 'complete';
  const tagLabel = sprint.status === 'current' ? 'Current' : 'Completed';

  return (
    <div className="sprint-card">
      <div className="sprint-card-head">
        <div>
          <div className="sprint-name">{sprint.name}</div>
          <div className="sprint-meta">{sprint.meta}</div>
        </div>
        <div className={'sprint-tag ' + tagCls}>{tagLabel}</div>
      </div>

      <div className="phase-rail">
        <Phase phase={sprint.baseline} kind="baseline" onClick={() => onPhase(sprint.baseline)}/>
        <Phase phase={sprint.impact} kind="impact" onClick={() => onPhase(sprint.impact)}/>
      </div>
    </div>
  );
}

function Phase({ phase, kind, onClick }) {
  const isLocked = phase.state === 'locked';
  const iconCls = phase.state;
  const Icon = phase.state === 'done' ? I.Check
              : phase.state === 'locked' ? I.Lock
              : phase.state === 'draft' ? I.Clock
              : phase.state === 'due' ? I.ArrowRight
              : I.ArrowRight;

  const label = kind === 'baseline' ? 'Part I · Pre-Assessment' : 'Part II · Post-Assessment';
  const stateText = kind === 'baseline' ? 'Baseline' : 'Impact';
  const stateDisplay = phase.state === 'done' && phase.date ? `${stateText} - Completed on ${phase.date}` : stateText;
  const actionLabel = phase.state === 'done' ? 'View' : phase.label;

  const cls = 'phase' + (isLocked ? ' locked' : '');

  return (
    <div className={cls} onClick={isLocked ? undefined : onClick}>
      <div className={'phase-icon ' + iconCls}>
        <Icon size={18}/>
      </div>
      <div className="phase-body">
        <div className="phase-label">{label}</div>
        <div className="phase-state">{stateDisplay}</div>
        <div className={'phase-action ' + (isLocked ? 'muted' : '')}>
          {actionLabel}
          {!isLocked && <I.ChevronRight size={13}/>}
        </div>
      </div>
    </div>
  );
}

window.ListView = ListView;
