/* Completion + Results view */

function CompletionView({ kind, onBack, onStartNext }) {
  const firstSessionBooked = false; // set to true when a session is scheduled

  // kind: 'pre' or 'post'
  if (kind === 'pre') {
    return (
      <div className="success-screen">
          <div className="success-icon">
            <I.Check size={36}/>
          </div>
          <h2 className="success-title serif">Pre-assessment captured.</h2>
          <p className="success-sub">
            Your responses will be combined with your manager's into a shared report at the end of the sprint to support an open and transparent conversation about progress and next steps.
          </p>

          <div className="summary-grid">
            <div className="summary-tile">
              <div className="lbl">Sprint</div>
              <div className="val small">Sprint 4</div>
            </div>
            <div className="summary-tile">
              <div className="lbl">First session</div>
              {firstSessionBooked
                ? <div className="val small">Fri, Feb 27</div>
                : <button className="btn btn-primary" style={{ marginTop: 8, fontSize: 13, padding: '7px 16px' }}>Book now</button>
              }
            </div>
            <div className="summary-tile">
              <div className="lbl">Expert</div>
              <div className="val small">Mac Gebara</div>
            </div>
          </div>

      </div>
    );
  }

  // POST confirmation
  if (kind === 'post') {
    return (
      <div className="success-screen">
        <div className="success-icon">
          <I.Check size={36}/>
        </div>
        <h2 className="success-title serif">Post-assessment captured.</h2>
        <p className="success-sub">
          Your responses will be combined with your manager's into a shared report to support an open and transparent conversation about your progress and next steps.
        </p>
        <div className="summary-grid">
          <div className="summary-tile">
            <div className="lbl">Sprint</div>
            <div className="val small">Sprint 3</div>
          </div>
          <div className="summary-tile">
            <div className="lbl">Submitted</div>
            <div className="val small">Apr 7, 2026</div>
          </div>
          <div className="summary-tile">
            <div className="lbl">Expert</div>
            <div className="val small">Mac Gebara</div>
          </div>
        </div>
      </div>
    );
  }
}

function PostResultsReport({ onBack }) {
  // Simulated pre/post comparison data
  const goals = [
    { name: 'Goal #1: Drive operational excellence in HR', pre: 2, post: 4 },
    { name: 'Goal #2: Build stronger HR and HR operations acumen', pre: 3, post: 4 },
    { name: 'Goal #3: Lead through ambiguity and rapid change', pre: 2, post: 5 },
  ];
  const outcomes = [
    'Outcome #1: Standardized onboarding across three regional teams',
    'Outcome #3: Launched manager enablement program (12 participants)',
    'Outcome #4: Established quarterly HR ops review cadence with leadership',
  ];
  const insightQuote = "The biggest shift was learning to ship a decision at 70% confidence instead of waiting for 100%. My team noticed within two weeks.";

  return (
    <div>
      <div className="main-header">
        <div>
          <h1 className="main-title">Sprint 3 · Impact report</h1>
          <p className="main-subtitle">Submitted Apr 7, 2026</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary" onClick={onBack}>
            <I.ChevronLeft size={16}/> Back
          </button>
          <button className="btn btn-secondary">
            <I.Doc size={16}/> Share with manager
          </button>
        </div>
      </div>

      {/* Hero: user's own insight as the headline */}
      <div className="card" style={{ background: 'var(--black)', color: 'var(--white)', padding: 44, marginBottom: 16, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 90% 20%, rgba(38,0,252,0.5), transparent 55%)', pointerEvents: 'none' }}/>
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.65, marginBottom: 14 }}>
            Sprint 3 · Your most valuable insight
          </div>
          <h2 className="serif" style={{ fontSize: 40, margin: 0, lineHeight: 1.15, letterSpacing: '-0.02em', maxWidth: 820 }}>
            “{insightQuote}”
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 36 }}>
            <SummaryStat label="Avg. goal progress" value="4.3 / 5" delta="+2.0"/>
            <SummaryStat label="Role confidence" value="5 / 5" delta="+3"/>
            <SummaryStat label="Outcomes achieved" value="3 of 4" />
            <SummaryStat label="Atrium NPS" value="9 / 10" />
          </div>
        </div>
      </div>

      {/* Goal progress */}
      <div className="card" style={{ padding: 32, marginBottom: 16 }}>
        <h3 style={{ fontSize: 20, margin: '0 0 6px', letterSpacing: '-0.01em', fontWeight: 600 }}>Goal progress</h3>
        <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 24px' }}>
          Pre-assessment ability vs. end-of-sprint progress.
        </p>

        {goals.map((g, i) => {
          const delta = g.post - g.pre;
          return (
            <div key={i} style={{ marginBottom: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 }}>
                <div style={{ fontWeight: 500, fontSize: 15 }}>{g.name}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>
                  <span>{g.pre} → </span>
                  <span style={{ color: delta >= 0 ? 'var(--cobalt)' : '#c00', fontWeight: 600 }}>{g.post}</span>
                  <span style={{ marginLeft: 8, color: delta >= 0 ? 'var(--cobalt)' : '#c00' }}>
                    {delta >= 0 ? '+' : ''}{delta}
                  </span>
                </div>
              </div>
              <GoalBar pre={g.pre} post={g.post}/>
            </div>
          );
        })}
      </div>

      {/* Outcomes */}
      <div className="card" style={{ padding: 32, marginBottom: 16 }}>
        <h3 style={{ fontSize: 20, margin: '0 0 6px', letterSpacing: '-0.01em', fontWeight: 600 }}>Outcomes achieved</h3>
        <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 16px' }}>
          From your development plan.
        </p>
        {outcomes.map((o, i) => (
          <div key={i} style={{
            display: 'flex', gap: 12, alignItems: 'flex-start',
            padding: '14px 0', borderBottom: i < outcomes.length - 1 ? '1px solid var(--border)' : 'none'
          }}>
            <div style={{ width: 24, height: 24, borderRadius: 999, background: 'var(--sky-1)', color: 'var(--cobalt)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: 'none', marginTop: 2 }}>
              <I.Check size={14}/>
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.5 }}>{o}</div>
          </div>
        ))}
      </div>

      {/* Expert + What's Next */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="card" style={{ padding: 32 }}>
          <h3 style={{ fontSize: 20, margin: '0 0 14px', letterSpacing: '-0.01em', fontWeight: 600 }}>Expert match</h3>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 18 }}>
            <div style={{ width: 44, height: 44, borderRadius: 999, background: 'var(--cobalt)', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>MG</div>
            <div>
              <div style={{ fontWeight: 600 }}>Mac Gebara</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Fmr. VP People</div>
            </div>
          </div>
          {[
            { label: 'Experience alignment', v: 5 },
            { label: 'Chemistry & trust', v: 5 },
            { label: 'Mentorship value', v: 5 },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
              <span style={{ fontSize: 14 }}>{r.label}</span>
              <span style={{ display: 'flex', gap: 3 }}>
                {Array.from({ length: 5 }, (_, j) => (
                  <I.Star key={j} size={14} fill={j < r.v ? 'var(--cobalt)' : 'transparent'} stroke="var(--cobalt)"/>
                ))}
              </span>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: 32, background: 'var(--sky-1)' }}>
          <h3 style={{ fontSize: 20, margin: '0 0 10px', letterSpacing: '-0.01em', fontWeight: 600 }}>What's next</h3>
          <p style={{ fontSize: 14, lineHeight: 1.55, margin: '0 0 20px', color: 'rgba(0,0,0,0.7)' }}>
            You've planned Sprint 4 focused on scaling HR operations through a regional expansion. Kickoff session: <strong>Fri, Feb 27</strong>.
          </p>
          <button className="btn btn-primary">
            See Sprint 4 plan <I.ArrowRight size={16}/>
          </button>
        </div>
      </div>
    </div>
  );
}

function SummaryStat({ label, value, delta }) {
  return (
    <div style={{ padding: 20, background: 'rgba(255,255,255,0.05)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.65, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em' }}>
        {value}
        {delta && <span style={{ fontSize: 14, color: '#7af7c2', marginLeft: 8, fontWeight: 500 }}>{delta}</span>}
      </div>
    </div>
  );
}

function GoalBar({ pre, post, max = 5 }) {
  const prePct = (pre / max) * 100;
  const postPct = (post / max) * 100;
  const regression = post < pre;

  if (regression) {
    // Show a 'dropped' segment in red between post (end of cobalt) and pre (end of underlay)
    return (
      <div style={{ position: 'relative', height: 12, background: 'var(--sky-3)', borderRadius: 999, overflow: 'hidden' }}>
        {/* baseline underlay */}
        <div style={{ position: 'absolute', inset: 0, left: 0, width: prePct + '%', background: 'var(--sky-1)' }}/>
        {/* regression slice (red, between post and pre) */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: postPct + '%', width: (prePct - postPct) + '%', background: 'rgba(204,0,0,0.18)' }}/>
        {/* current post (cobalt) */}
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: postPct + '%', background: 'var(--cobalt)', borderRadius: 999 }}/>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', height: 12, background: 'var(--sky-3)', borderRadius: 999, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, left: 0, width: prePct + '%', background: 'var(--sky-1)' }}/>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: postPct + '%', background: 'var(--cobalt)', borderRadius: 999 }}/>
    </div>
  );
}

window.CompletionView = CompletionView;
