/* Sidebar / app shell */

function AtriumLogo({ size = 28 }) {
  // 16-ray starburst, matches the Atrium icon in the screenshots
  const rays = [];
  const n = 16;
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2;
    const x1 = 12 + Math.cos(angle) * 4;
    const y1 = 12 + Math.sin(angle) * 4;
    const x2 = 12 + Math.cos(angle) * 10;
    const y2 = 12 + Math.sin(angle) * 10;
    rays.push(<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>);
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ color: 'var(--cobalt)' }}>
      {rays}
    </svg>
  );
}

function Sidebar({ current, onNav }) {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: I.Dashboard },
    { id: 'agendas', label: 'Agendas', icon: I.Agenda },
    { id: 'assessments', label: 'Assessments', icon: I.Assessment },
    { id: 'history', label: 'Sprint History', icon: I.History },
    { id: 'final-reports', label: 'Final Reports', icon: I.Doc },
  ];
  return (
    <aside className="sidebar">
      <div className="logo">
        <AtriumLogo size={32} />
        <span>Atrium</span>
      </div>
      <div className="greeting">Hi, Alex!</div>
      <nav>
        {items.map(it => (
          <React.Fragment key={it.id}>
            <button className={'nav-item ' + (current === it.id ? 'active' : '')}
                    onClick={() => onNav && onNav(it.id)}>
              <it.icon size={18}/>
              <span>{it.label}</span>
            </button>
            {it.children && it.children.map(child => (
              <button key={child.id} className={'nav-item nav-item-child ' + (current === child.id ? 'active' : '')}
                      onClick={() => onNav && onNav(child.id)}>
                <child.icon size={16}/>
                <span>{child.label}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </nav>
      <div className="nav-spacer"/>
      <nav>
        <button className="nav-item">
          <I.Logout size={18}/>
          <span>Sign Out</span>
        </button>
      </nav>
    </aside>
  );
}

/* ---------- Step indicator (progress bar) ---------- */
function Stepper({ steps, current }) {
  const pct = ((current + 1) / steps.length) * 100;
  const next = steps[current + 1];
  return (
    <div className="stepper">
      <div className="stepper-meta">
        <div>
          <span className="current">{steps[current]}</span>
        </div>
        <div>
          Step {current + 1} of {steps.length}
          {next && <span style={{ marginLeft: 8 }}>· Up next: {next}</span>}
        </div>
      </div>
      <div className="stepper-track">
        <div className="stepper-fill" style={{ width: pct + '%' }}/>
      </div>
    </div>
  );
}

/* ---------- Centralised scale label arrays ---------- */
const SCALES = {
  ABILITY:    ['No ability yet', 'Some ability', 'Solid ability', 'Strong ability', 'Fully confident and skilled in this area'],
  CONFIDENCE: ['Not at all confident', 'Slightly confident', 'Somewhat confident', 'Fairly confident', 'Very confident'],
  PROGRESS:   ['No progress', 'Some progress', 'Good progress', 'Significant progress', 'Fully achieved'],
  AGREEMENT:  ['Not at all', 'Slightly', 'Somewhat', 'Fairly', 'Absolutely'],
  FREQUENCY:  ['Rarely', 'Occasionally', 'Sometimes', 'Often', 'Consistently'],
  ALIGNMENT:  ['Not aligned', 'Slightly aligned', 'Somewhat aligned', 'Well aligned', 'Perfect match'],
  STRENGTH:   ['Weak', 'Developing', 'Moderate', 'Good', 'Strong'],
  VALUE:      ['Not valuable', 'Slightly valuable', 'Somewhat valuable', 'Quite valuable', 'Extremely valuable'],
};

/* ---------- Rating scale ---------- */
function RatingScale({ value, onChange, max = 5, lowLabel, highLabel, compact, anchored, vertical, labels }) {
  if (vertical && labels) {
    return (
      <div className="rating-vertical">
        {labels.map((label, i) => {
          const n = i + 1;
          return (
            <button
              key={n}
              className={'rating-vertical-row ' + (value === n ? 'selected' : '')}
              onClick={() => onChange(n)}>
              <span className={'rating-btn compact ' + (value === n ? 'selected' : '')}>{n}</span>
              <span className="rating-vertical-label">{label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  const wide = max > 5;
  const buttons = (
    <div className={'rating ' + (wide ? 'wide' : '')}>
      {Array.from({ length: max }, (_, i) => i + 1).map(n => (
        <button
          key={n}
          className={'rating-btn ' + (compact ? 'compact ' : '') + (value === n ? 'selected' : '')}
          onClick={() => onChange(n)}>
          {n}
        </button>
      ))}
    </div>
  );

  if (anchored && (lowLabel || highLabel)) {
    return (
      <div className="rating-anchored">
        <div className="anchor">{lowLabel}</div>
        {buttons}
        <div className="anchor right">{highLabel}</div>
      </div>
    );
  }

  return (
    <div>
      {buttons}
      {(lowLabel || highLabel) && (
        <div className="rating-legend">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>
      )}
    </div>
  );
}

/* ---------- Segmented (Yes/No) ---------- */
function Segmented({ value, onChange, options }) {
  return (
    <div className="segmented">
      {options.map(opt => (
        <button key={opt.value}
                className={'segmented-btn ' + (value === opt.value ? 'selected' : '')}
                onClick={() => onChange(opt.value)}>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

/* ---------- Required label ---------- */
function QLabel({ children, optional }) {
  return (
    <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>
      {children}
      {optional && <span className="optional">(optional)</span>}
    </div>
  );
}

/* ---------- Wizard footer with autosave indicator ---------- */
function WizardFooter({ onBack, onNext, nextLabel = 'Next', nextDisabled, primary = true }) {
  return (
    <div className="wizard-footer">
      <div className="wizard-footer-left">
        <button className="btn btn-secondary" onClick={onBack}>
          <I.ChevronLeft size={16}/> Previous
        </button>
      </div>
      <button
        className={'btn ' + (primary ? 'btn-primary' : 'btn-secondary')}
        onClick={onNext}
        disabled={nextDisabled}>
        {nextLabel} <I.ChevronRight size={16}/>
      </button>
    </div>
  );
}

Object.assign(window, { Sidebar, Stepper, RatingScale, SCALES, Segmented, QLabel, WizardFooter, AtriumLogo });
