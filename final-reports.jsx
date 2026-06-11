/* Final Reports — bento dashboard */

/* ── Helpers ── */
function BentoDualBar({ leaderPre, leaderPost, managerPre, managerPost, max = 5 }) {
  const bar = (pre, post, fill) => {
    const prePct  = (pre  / max) * 100;
    const postPct = (post / max) * 100;
    return (
      <div style={{ position: 'relative', height: 6, background: 'var(--sky-3)', borderRadius: 999, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, width: prePct + '%', background: 'var(--sky-1)' }}/>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: postPct + '%', background: fill, borderRadius: 999 }}/>
      </div>
    );
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      {bar(leaderPre,  leaderPost,  'var(--cobalt)')}
      {bar(managerPre, managerPost, 'rgba(38,0,252,0.32)')}
    </div>
  );
}

function ConfidenceScale({ pre, post, color, max = 5 }) {
  return (
    <div style={{ display: 'flex', gap: 5 }}>
      {Array.from({ length: max }, (_, i) => {
        const v = i + 1;
        const active  = v <= post;
        const wasPre  = v === pre;
        return (
          <div key={i} style={{
            flex: 1, height: 6, borderRadius: 999,
            background: active ? color : wasPre ? 'var(--sky-1)' : 'var(--sky-3)',
          }}/>
        );
      })}
    </div>
  );
}

/* ── Data ── */
const SPRINT_REPORTS = [
  {
    id: 'sprint-4',
    name: 'Sprint 4',
    submitted: 'May 20, 2026',
    duration: 'Feb – May 2026',
    totalHours: 6,
    expert: 'Mac Gebara',
    expertInitials: 'MG',
    expertTitle: 'Fmr. VP People',

    leaderQuote: "Learning to stop solving problems for my team has been the hardest and most valuable shift. Once I stepped back, ownership moved in ways I didn't expect.",
    managerQuote: "The change in how Sarah shows up in leadership meetings is noticeable. She's asking more questions and holding space — that's made the whole team more effective.",
    leaderProgramFeedback: "Having Mac challenge my default instinct to jump in was uncomfortable at first, but it's the shift that's had the most lasting impact on my team.",
    managerProgramFeedback: "The program gave Sarah a structured way to reflect on patterns that were hard to name before. That reflection is showing up in her leadership.",

    summaryStats: [
      { label: 'Avg. goal progress', value: '4.3 / 5', delta: '+2.0' },
      { label: 'Role confidence', value: '4 / 5', delta: '+2' },
      { label: 'Outcomes achieved', value: '2 of 3' },
      { label: 'Atrium NPS', value: '8 / 10' },
    ],

    goals: [
      { name: 'Drive operational excellence in HR',          leaderPre: 2, leaderPost: 4, managerPre: 2, managerPost: 4 },
      { name: 'Build stronger HR and HR operations acumen',  leaderPre: 2, leaderPost: 4, managerPre: 2, managerPost: 3 },
      { name: 'Lead through ambiguity and rapid change',     leaderPre: 3, leaderPost: 5, managerPre: 3, managerPost: 4 },
    ],

    leaderRoleConfidence:  { pre: 2, post: 4 },
    managerRoleConfidence: { pre: 2, post: 4 },

    leaderOutcomes: [
      'Implemented quarterly HR ops dashboard with regional leads',
      'Completed HR operations certification program with team of six',
    ],
    managerOutcomes: [
      'Implemented quarterly HR ops dashboard with regional leads',
      'Completed HR operations certification with team of six',
    ],

    expertRatings: [
      { label: 'Expert alignment',          leader: 5, manager: 5, max: 5  },
      { label: 'Value of mentorship',        leader: 5, manager: 5, max: 5  },
      { label: 'Likelihood to recommend',   leader: 8, manager: 9, max: 10 },
    ],

    nextSprintThemes: ['Delegation', 'Executive presence', 'Scale', 'Influence'],
    nextSprintGoals:  [
      'Scale HR operations through regional expansion',
      'Build executive presence and stakeholder influence',
    ],
    nextSprintExpert:  'Mac Gebara',
    nextSprintKickoff: 'Fri, Jun 6',
  },
  {
    id: 'sprint-3',
    name: 'Sprint 3',
    submitted: 'Apr 7, 2026',
    duration: 'Jan – Apr 2026',
    totalHours: 6,
    expert: 'Mac Gebara',
    expertInitials: 'MG',
    expertTitle: 'Fmr. VP People',

    leaderQuote: "The biggest shift was learning to ship a decision at 70% confidence instead of waiting for 100%. My team noticed within two weeks.",
    managerQuote: "Sarah stepped up at the Q1 offsite by leading the HR strategy sessions. She came prepared, held her own, and brought people to a shared understanding. That's not a small thing.",
    leaderProgramFeedback: "Drawing on Mac's external perspective helped me reflect on challenges I couldn't clearly see from the inside. Our discussions exposed where I needed more clarity.",
    managerProgramFeedback: "Building Sarah's confidence in owning such a large portfolio of work was the real unlock this sprint.",

    summaryStats: [
      { label: 'Avg. goal progress', value: '4.3 / 5', delta: '+2.0' },
      { label: 'Role confidence', value: '5 / 5', delta: '+3' },
      { label: 'Outcomes achieved', value: '3 of 4' },
      { label: 'Atrium NPS', value: '9 / 10' },
    ],

    goals: [
      { name: 'Drive operational excellence in HR',          leaderPre: 2, leaderPost: 4, managerPre: 2, managerPost: 4 },
      { name: 'Build stronger HR and HR operations acumen',  leaderPre: 3, leaderPost: 4, managerPre: 3, managerPost: 4 },
      { name: 'Lead through ambiguity and rapid change',     leaderPre: 2, leaderPost: 5, managerPre: 2, managerPost: 4 },
    ],

    leaderRoleConfidence:  { pre: 2, post: 5 },
    managerRoleConfidence: { pre: 2, post: 4 },

    leaderOutcomes: [
      'Standardized onboarding across three regional teams',
      'Launched manager enablement program (12 participants)',
      'Established quarterly HR ops review cadence with leadership',
    ],
    managerOutcomes: [
      'Standardized onboarding across three regional teams',
      'Launched manager enablement program (12 participants)',
      'Established quarterly HR ops review cadence with leadership',
    ],

    expertRatings: [
      { label: 'Expert alignment',         leader: 5, manager: 5,  max: 5  },
      { label: 'Value of mentorship',       leader: 5, manager: 5,  max: 5  },
      { label: 'Likelihood to recommend',  leader: 9, manager: 10, max: 10 },
    ],

    nextSprintThemes: ['Delegation', 'Scalability', 'People', 'Operations'],
    nextSprintGoals:  [
      'Scale HR operations through regional expansion',
      'Develop direct reports as independent leaders',
    ],
    nextSprintExpert:  'Mac Gebara',
    nextSprintKickoff: 'Fri, Apr 25',
  },
  {
    id: 'sprint-2',
    name: 'Sprint 2',
    submitted: 'Feb 18, 2026',
    duration: 'Oct – Feb 2026',
    totalHours: 5,
    expert: 'Mac Gebara',
    expertInitials: 'MG',
    expertTitle: 'Fmr. VP People',

    leaderQuote: "I stopped filling every silence in leadership meetings. The discomfort taught me more about my team than any 1:1 ever had.",
    managerQuote: "Sarah is beginning to delegate more intentionally, trusting her team to take on work rather than absorbing everything herself. This is a meaningful shift.",
    leaderProgramFeedback: "Mac's questions helped me see that holding back wasn't weakness — it was creating space for my team to grow into.",
    managerProgramFeedback: "The structured reflection each session forced Sarah to name patterns she'd been operating by unconsciously. That's valuable work.",

    summaryStats: [
      { label: 'Avg. goal progress', value: '3.3 / 5', delta: '+1.7' },
      { label: 'Role confidence', value: '3 / 5', delta: '+2' },
      { label: 'Outcomes achieved', value: '2 of 3' },
      { label: 'Atrium NPS', value: '8 / 10' },
    ],

    goals: [
      { name: 'Drive operational excellence in HR',          leaderPre: 1, leaderPost: 3, managerPre: 1, managerPost: 3 },
      { name: 'Build stronger HR and HR operations acumen',  leaderPre: 1, leaderPost: 3, managerPre: 1, managerPost: 3 },
      { name: 'Lead through ambiguity and rapid change',     leaderPre: 2, leaderPost: 4, managerPre: 2, managerPost: 3 },
    ],

    leaderRoleConfidence:  { pre: 1, post: 3 },
    managerRoleConfidence: { pre: 1, post: 3 },

    leaderOutcomes: [
      'Redesigned the HR onboarding process for new managers',
      'Introduced monthly HR operations metrics review with leadership',
    ],
    managerOutcomes: [
      'Redesigned the HR onboarding process for new managers',
      'Introduced monthly HR operations metrics review with leadership',
    ],

    expertRatings: [
      { label: 'Expert alignment',         leader: 4, manager: 4, max: 5  },
      { label: 'Value of mentorship',       leader: 5, manager: 4, max: 5  },
      { label: 'Likelihood to recommend',  leader: 8, manager: 8, max: 10 },
    ],

    nextSprintThemes: ['Accountability', 'Standards', 'Process', 'Communication'],
    nextSprintGoals:  [
      'Build a culture of accountability across the HR team',
      'Standardize HR operations across regional offices',
    ],
    nextSprintExpert:  'Mac Gebara',
    nextSprintKickoff: 'Fri, Mar 6',
  },
  {
    id: 'sprint-1',
    name: 'Sprint 1',
    submitted: 'Jan 6, 2026',
    duration: 'Sep – Jan 2026',
    totalHours: 5,
    expert: 'Sarah Chen',
    expertInitials: 'SC',
    expertTitle: 'Fmr. Chief People Officer',

    leaderQuote: "Leadership isn't about having all the answers — it's about creating space for the right questions to surface.",
    managerQuote: "Sarah is carrying herself with more confidence and has genuinely stepped into ownership of her role in a way that feels different from before.",
    leaderProgramFeedback: "Sarah Chen's experience as a CPO brought a perspective I couldn't have found internally. The external lens was exactly what I needed.",
    managerProgramFeedback: "The program gave Sarah a strong foundation and clear language for the development work ahead.",

    summaryStats: [
      { label: 'Avg. goal progress', value: '2.3 / 5', delta: '+1.0' },
      { label: 'Role confidence', value: '2 / 5', delta: '+1' },
      { label: 'Outcomes achieved', value: '1 of 3' },
      { label: 'Atrium NPS', value: '7 / 10' },
    ],

    goals: [
      { name: 'Drive operational excellence in HR',          leaderPre: 1, leaderPost: 2, managerPre: 1, managerPost: 2 },
      { name: 'Build stronger HR and HR operations acumen',  leaderPre: 1, leaderPost: 2, managerPre: 1, managerPost: 2 },
      { name: 'Lead through ambiguity and rapid change',     leaderPre: 1, leaderPost: 3, managerPre: 1, managerPost: 3 },
    ],

    leaderRoleConfidence:  { pre: 1, post: 2 },
    managerRoleConfidence: { pre: 1, post: 2 },

    leaderOutcomes: [
      'Completed stakeholder mapping exercise with senior HR team',
    ],
    managerOutcomes: [
      'Completed stakeholder mapping exercise with senior HR team',
    ],

    expertRatings: [
      { label: 'Expert alignment',         leader: 4, manager: 4, max: 5 },
      { label: 'Value of mentorship',       leader: 4, manager: 4, max: 5 },
      { label: 'Likelihood to recommend',  leader: 7, manager: 7, max: 10 },
    ],

    nextSprintThemes: ['Foundation', 'Relationships', 'Communication', 'Planning'],
    nextSprintGoals:  [
      'Establish HR operational baseline across all teams',
      'Build stakeholder relationships with business unit leaders',
    ],
    nextSprintExpert:  'Mac Gebara',
    nextSprintKickoff: 'Fri, Jan 23',
  },
];

/* ── Page ── */
function FinalReportsPage() {
  const [selectedId, setSelectedId] = React.useState('sprint-4');
  const report = SPRINT_REPORTS.find(r => r.id === selectedId);

  return (
    <div>
      <div className="main-header">
        <h1 className="main-title">Final Reports</h1>
      </div>
      <div className="reports-layout">

        {/* Left sidebar */}
        <div className="reports-sidebar">
          <div className="reports-sidebar-title">Sprints</div>
          <div className="reports-sidebar-divider"/>
          {SPRINT_REPORTS.map(sprint => (
            <button
              key={sprint.id}
              className={'reports-sprint-item ' + (selectedId === sprint.id ? 'active' : '')}
              onClick={() => setSelectedId(sprint.id)}>
              <div className="reports-sprint-avatar">{sprint.expertInitials}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{sprint.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{sprint.expert}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Right panel */}
        <div className="reports-content">
          {report && <SprintReport report={report}/>}
        </div>

      </div>
    </div>
  );
}

/* ── Bento Report ── */
function SprintReport({ report }) {
  const LEADER_COLOR  = 'var(--cobalt)';
  const MANAGER_COLOR = 'rgba(38,0,252,0.38)';

  // Shared label style — black on white cards, cobalt on sky-1 cards
  const cardLabel = (onBlue) => ({
    fontSize: 11, fontWeight: 600,
    textTransform: 'uppercase', letterSpacing: '0.08em',
    marginBottom: 16,
    color: onBlue ? 'var(--cobalt)' : 'var(--black)',
  });

  return (
    <div>
      {/* Minimal header */}
      <div style={{ marginBottom: 20 }}>
        <h2 className="reports-content-title">{report.name} · Final Report</h2>
        <p style={{ fontSize: 13, color: 'var(--muted)', margin: 0 }}>Submitted {report.submitted}</p>
      </div>

      {/* Bento grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>

        {/* ── Hero quote (×3) ── */}
        <div className="card" style={{ gridColumn: 'span 3', padding: '36px 40px' }}>
          <div style={cardLabel(false)}>Leader · Most valuable insight</div>
          <h2 className="serif" style={{ fontSize: 28, margin: '0 0 28px', lineHeight: 1.2, letterSpacing: '-0.02em', maxWidth: 680, color: 'var(--black)' }}>
            "{report.leaderQuote}"
          </h2>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 22, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {report.summaryStats.map((s, i) => (
              <div key={i} style={{
                background: 'var(--sky-4)', borderRadius: 14, padding: 18,
                display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
              }}>
                {/* Fixed-height label row — pins value to same Y across all tiles */}
                <div style={{
                  height: 34, display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                  fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase',
                  letterSpacing: '0.06em', lineHeight: 1.3, marginBottom: 8,
                }}>{s.label}</div>
                <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>{s.value}</div>
                {/* Fixed-height delta row */}
                <div style={{ height: 20, marginTop: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {s.delta && <span style={{ fontSize: 12, color: 'var(--cobalt)', fontWeight: 500 }}>{s.delta}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Engagement (×1) ── */}
        <div className="card" style={{ gridColumn: 'span 1', padding: 28 }}>
          <div style={cardLabel(false)}>Engagement</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 22 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 999, background: 'var(--cobalt)',
              color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 600, fontSize: 14, flex: 'none',
            }}>
              {report.expertInitials}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{report.expert}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>{report.expertTitle}</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3 }}>Duration</div>
              <div style={{ fontWeight: 500, fontSize: 13 }}>{report.duration}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 3 }}>Hours completed</div>
              <div style={{ fontWeight: 700, fontSize: 32, letterSpacing: '-0.03em', lineHeight: 1 }}>{report.totalHours}</div>
            </div>
          </div>
        </div>

        {/* ── Goal progress (×3) ── */}
        <div className="card" style={{ gridColumn: 'span 3', padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
            <div>
              <div style={cardLabel(false)}>Goal progress</div>
              <p style={{ fontSize: 12, color: 'var(--muted)', margin: '-10px 0 0' }}>Pre-assessment ability vs. end-of-sprint</p>
            </div>
            <div style={{ display: 'flex', gap: 14, fontSize: 11, color: 'var(--muted)', paddingTop: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 20, height: 5, borderRadius: 999, background: LEADER_COLOR }}/>
                Leader
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 20, height: 5, borderRadius: 999, background: MANAGER_COLOR }}/>
                Manager
              </div>
            </div>
          </div>
          {report.goals.map((g, i) => {
            const lDelta = g.leaderPost  - g.leaderPre;
            const mDelta = g.managerPost - g.managerPre;
            return (
              <div key={i} style={{ marginBottom: i < report.goals.length - 1 ? 20 : 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 9 }}>
                  <div style={{ fontWeight: 500, fontSize: 14 }}>{g.name}</div>
                  <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--muted)', whiteSpace: 'nowrap', marginLeft: 16 }}>
                    <span>
                      {g.leaderPre} → <strong style={{ color: LEADER_COLOR }}>{g.leaderPost}</strong>
                      <span style={{ color: LEADER_COLOR, marginLeft: 4 }}>+{lDelta}</span>
                    </span>
                    <span>
                      {g.managerPre} → <strong style={{ color: 'rgba(38,0,252,0.6)' }}>{g.managerPost}</strong>
                      <span style={{ color: 'rgba(38,0,252,0.6)', marginLeft: 4 }}>+{mDelta}</span>
                    </span>
                  </div>
                </div>
                <BentoDualBar
                  leaderPre={g.leaderPre}   leaderPost={g.leaderPost}
                  managerPre={g.managerPre} managerPost={g.managerPost}/>
              </div>
            );
          })}
        </div>

        {/* ── Role confidence (×1) ── */}
        <div className="card" style={{ gridColumn: 'span 1', padding: 28 }}>
          <div style={cardLabel(false)}>Role confidence</div>
          <p style={{ fontSize: 12, color: 'var(--muted)', margin: '-10px 0 20px' }}>Start of sprint → end</p>
          {[
            { label: 'Leader',  color: LEADER_COLOR,  ...report.leaderRoleConfidence  },
            { label: 'Manager', color: MANAGER_COLOR, ...report.managerRoleConfidence },
          ].map((item, i) => {
            const delta = item.post - item.pre;
            return (
              <div key={i} style={{
                marginBottom: i === 0 ? 20 : 0,
                paddingBottom: i === 0 ? 20 : 0,
                borderBottom: i === 0 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 8 }}>{item.label}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 10 }}>
                  <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em' }}>{item.post}</span>
                  <span style={{ fontSize: 12, color: item.color, fontWeight: 600 }}>+{delta}</span>
                  <span style={{ fontSize: 11, color: 'var(--muted)' }}>from {item.pre}</span>
                </div>
                <ConfidenceScale pre={item.pre} post={item.post} color={item.color}/>
              </div>
            );
          })}
        </div>

        {/* ── Leader outcomes (×2) ── */}
        <div className="card" style={{ gridColumn: 'span 2', padding: 28 }}>
          <div style={cardLabel(false)}>Leader · Outcomes achieved</div>
          {report.leaderOutcomes.map((o, i) => (
            <div key={i} style={{
              display: 'flex', gap: 10, alignItems: 'flex-start',
              padding: '12px 0',
              borderBottom: i < report.leaderOutcomes.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{ width: 20, height: 20, borderRadius: 999, background: 'var(--sky-1)', color: LEADER_COLOR, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', marginTop: 1 }}>
                <I.Check size={11}/>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.5 }}>{o}</div>
            </div>
          ))}
        </div>

        {/* ── Manager outcomes (×2) ── */}
        <div className="card" style={{ gridColumn: 'span 2', padding: 28 }}>
          <div style={cardLabel(false)}>Manager · Outcomes achieved</div>
          {report.managerOutcomes.map((o, i) => (
            <div key={i} style={{
              display: 'flex', gap: 10, alignItems: 'flex-start',
              padding: '12px 0',
              borderBottom: i < report.managerOutcomes.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <div style={{ width: 20, height: 20, borderRadius: 999, background: 'var(--sky-1)', color: LEADER_COLOR, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none', marginTop: 1 }}>
                <I.Check size={11}/>
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.5 }}>{o}</div>
            </div>
          ))}
        </div>

        {/* ── Leader program feedback (sky-1, ×2) ── */}
        <div className="card" style={{ gridColumn: 'span 2', padding: 32, background: 'var(--sky-1)' }}>
          <div style={cardLabel(true)}>Leader · Program feedback</div>
          <p className="serif" style={{ fontSize: 20, lineHeight: 1.45, letterSpacing: '-0.01em', margin: 0, color: 'var(--black)' }}>
            "{report.leaderProgramFeedback}"
          </p>
        </div>

        {/* ── Manager observation (×2) ── */}
        <div className="card" style={{ gridColumn: 'span 2', padding: 32 }}>
          <div style={cardLabel(false)}>Manager · Observation</div>
          <p className="serif" style={{ fontSize: 20, lineHeight: 1.45, letterSpacing: '-0.01em', margin: 0, color: 'var(--black)' }}>
            "{report.managerQuote}"
          </p>
        </div>

        {/* ── Expert match (×2) ── */}
        <div className="card" style={{ gridColumn: 'span 2', padding: 28 }}>
          <div style={cardLabel(false)}>Expert match</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 999, background: 'var(--cobalt)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 14, flex: 'none' }}>
              {report.expertInitials}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{report.expert}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>{report.expertTitle}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 14, fontSize: 11, color: 'var(--muted)', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 999, background: LEADER_COLOR }}/>
              Leader
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 999, background: MANAGER_COLOR }}/>
              Manager
            </div>
          </div>
          {report.expertRatings.map((r, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '12px 0',
              borderBottom: i < report.expertRatings.length - 1 ? '1px solid var(--border)' : 'none',
            }}>
              <span style={{ fontSize: 13 }}>{r.label}</span>
              <div style={{ display: 'flex', gap: 4, alignItems: 'center', fontSize: 13, fontWeight: 600 }}>
                <span style={{ color: LEADER_COLOR }}>{r.leader}/{r.max}</span>
                <span style={{ color: 'var(--border)', fontSize: 16, fontWeight: 300 }}>·</span>
                <span style={{ color: 'rgba(38,0,252,0.55)' }}>{r.manager}/{r.max}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── What's next (sky-1, ×2) ── */}
        <div className="card" style={{ gridColumn: 'span 2', padding: 28, background: 'var(--sky-1)' }}>
          <div style={cardLabel(true)}>What's next</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
            {report.nextSprintThemes.map((t, i) => (
              <span key={i} style={{
                fontSize: 11, padding: '4px 10px', borderRadius: 999,
                background: 'rgba(38,0,252,0.08)', color: 'var(--cobalt)', fontWeight: 500,
              }}>{t}</span>
            ))}
          </div>
          {report.nextSprintGoals.map((g, i) => (
            <div key={i} style={{
              fontSize: 13, lineHeight: 1.55, color: 'var(--black)',
              paddingLeft: 12, borderLeft: '2px solid var(--cobalt)',
              marginBottom: i < report.nextSprintGoals.length - 1 ? 10 : 0,
            }}>{g}</div>
          ))}
          <div style={{ marginTop: 22, paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Expert</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--black)' }}>{report.nextSprintExpert}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Kickoff</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--black)' }}>{report.nextSprintKickoff}</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

window.FinalReportsPage = FinalReportsPage;
