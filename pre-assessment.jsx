/* Pre-Assessment — Part I */

const PRE_STEPS = ['Goals and Confidence', 'Support'];
const PRE_DRAFT_KEY = 'atrium-pre-assessment-draft';

const DEV_GOALS = [
  { id: 'g1', name: 'Drive operational excellence in HR' },
  { id: 'g2', name: 'Build stronger HR and HR operations acumen' },
  { id: 'g3', name: 'Lead through ambiguity and rapid change' },
];

function PreAssessment({ onExit, onComplete }) {
  const [step, setStep] = React.useState(0);
  const [autosaveLabel, setAutosaveLabel] = React.useState(null);
  const isMounted = React.useRef(false);

  const [data, setData] = React.useState(() => {
    try {
      const saved = localStorage.getItem(PRE_DRAFT_KEY);
      return saved ? JSON.parse(saved) : {
        abilities: {},
        roleConfidence: null,
        stayOnTrack: '',
      };
    } catch {
      return { abilities: {}, roleConfidence: null, stayOnTrack: '' };
    }
  });

  // Autosave on data change, skip initial mount
  React.useEffect(() => {
    if (!isMounted.current) { isMounted.current = true; return; }
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(PRE_DRAFT_KEY, JSON.stringify(data));
        setAutosaveLabel('Draft autosaved');
        setTimeout(() => setAutosaveLabel(null), 2000);
      } catch {}
    }, 800);
    return () => clearTimeout(timer);
  }, [data]);

  const update = (patch) => setData(d => ({ ...d, ...patch }));

  const next = () => {
    if (step < PRE_STEPS.length - 1) setStep(s => s + 1);
    else {
      try { localStorage.removeItem(PRE_DRAFT_KEY); } catch {}
      onComplete && onComplete(data);
    }
  };
  const back = () => {
    if (step > 0) setStep(s => s - 1);
    else onExit && onExit();
  };

  const canAdvance = () => {
    if (step === 0) return DEV_GOALS.every(g => data.abilities[g.id]) && !!data.roleConfidence;
    return true;
  };

  return (
    <div>
      <div className="card">
        {autosaveLabel && (
          <span className="card-autosave">
            <I.Check size={13}/> {autosaveLabel}
          </span>
        )}
        <Stepper steps={PRE_STEPS} current={step}/>

        {step === 0 && <StepGoalsConfidence data={data} update={update}/>}
        {step === 1 && <StepSupport data={data} update={update}/>}

        <WizardFooter
          onBack={back}
          onNext={next}
          nextLabel={step === PRE_STEPS.length - 1 ? 'Submit Pre-assessment' : 'Next'}
          nextDisabled={!canAdvance()}
        />
      </div>
    </div>
  );
}

/* ---------- Step 1: Goals and Confidence ---------- */
function StepGoalsConfidence({ data, update }) {
  const setAbility = (gid, v) => update({ abilities: { ...data.abilities, [gid]: v } });
  return (
    <div>
      <div className="context-hint" style={{ marginBottom: 22 }}>
        <I.Info size={16}/>
        <span>
          Your responses and your manager's responses will be combined into a shared report at the end of the sprint to support an open and transparent conversation about progress and next steps.
        </span>
      </div>

      <QLabel>How would you rate your current abilities for each goal?</QLabel>
      <div className="rating-group">
        {DEV_GOALS.map((g, i) => (
          <div key={g.id} className="rating-group-item">
            <div className="rating-group-item-label">{i + 1}. {g.name}</div>
            <RatingScale
              value={data.abilities[g.id]}
              onChange={(v) => setAbility(g.id, v)}
              vertical labels={SCALES.ABILITY}/>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <QLabel>How confident do you feel in your role today?</QLabel>
        <RatingScale
          value={data.roleConfidence}
          onChange={(v) => update({ roleConfidence: v })}
          vertical labels={SCALES.CONFIDENCE}/>
      </div>
    </div>
  );
}

/* ---------- Step 2: Support ---------- */
function StepSupport({ data, update }) {
  return (
    <div>
      <div>
        <QLabel optional>Is there anything else you'd like to share?</QLabel>
        <textarea
          className="textarea"
          rows="4"
          placeholder="What's one thing that would help you stay on track during this sprint?"
          value={data.stayOnTrack}
          onChange={e => update({ stayOnTrack: e.target.value })}/>
      </div>

      <div className="context-hint" style={{ marginTop: 24 }}>
        <I.Info size={16}/>
        <span>
          At the end of your program sprint, you'll complete a post-assessment to track progress, capture impact, and uncover new areas to keep your development personalized and outcome-driven.
        </span>
      </div>
    </div>
  );
}

window.PreAssessment = PreAssessment;
