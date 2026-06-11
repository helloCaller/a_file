/* Pre-Assessment — Part I (3 steps, copy from impact-assessment doc) */

const PRE_STEPS = ['Goals and Ability', 'Confidence', 'Challenge and Support', 'Anything Else'];
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
        progressConfidence: null,
        biggestChallenge: '',
        roleConfidence: null,
        stayOnTrack: '',
        finalThoughts: '',
      };
    } catch {
      return { abilities: {}, progressConfidence: null, biggestChallenge: '', roleConfidence: null, stayOnTrack: '', finalThoughts: '' };
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

  // All questions required (per latest direction)
  const canAdvance = () => {
    if (step === 0) return DEV_GOALS.every(g => data.abilities[g.id]) && !!data.progressConfidence;
    if (step === 1) return !!data.roleConfidence;
    if (step === 2) return true;
    if (step === 3) return true;
    return true;
  };

  return (
    <div>
      <div className="card">
        <Stepper steps={PRE_STEPS} current={step}/>

        {step === 0 && <StepGoalsAbility data={data} update={update}/>}
        {step === 1 && <StepConfidenceProgress data={data} update={update}/>}
        {step === 2 && <StepConfidenceRole data={data} update={update}/>}
        {step === 3 && <StepFinalThoughts data={data} update={update}/>}

        <WizardFooter
          onBack={back}
          onNext={next}
          nextLabel={step === PRE_STEPS.length - 1 ? 'Submit Pre-assessment' : 'Next'}
          nextDisabled={!canAdvance()}
          autosaveLabel={autosaveLabel}
        />
      </div>
    </div>
  );
}

/* ---------- Step 1 ---------- */
function StepGoalsAbility({ data, update }) {
  const setAbility = (gid, v) => update({ abilities: { ...data.abilities, [gid]: v } });
  return (
    <div>
      <QLabel>How would you rate your current abilities for each development goal?</QLabel>
      <p className="q-help">
        Scale: 1 = No ability yet · 2 = Some ability · 3 = Solid ability · 4 = Strong ability · 5 = Fully confident and skilled
      </p>
      <div className="rating-group">
        {DEV_GOALS.map((g, i) => (
          <div key={g.id} className="rating-group-item">
            <div className="rating-group-item-label">{i + 1}. {g.name}</div>
            <RatingScale
              value={data.abilities[g.id]}
              onChange={(v) => setAbility(g.id, v)}
              compact/>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <QLabel>How confident are you in making progress on these goals right now?</QLabel>
        <p className="q-help">Scale: 1 = Not at all confident · 2 = Slightly confident · 3 = Somewhat confident · 4 = Fairly confident · 5 = Very confident</p>
        <RatingScale
          value={data.progressConfidence}
          onChange={(v) => update({ progressConfidence: v })}
          compact/>
      </div>
    </div>
  );
}

/* ---------- Step 2 ---------- */
function StepConfidenceProgress({ data, update }) {
  return (
    <div>
      <div>
        <QLabel>How confident do you feel in your role today?</QLabel>
        <p className="q-help">Scale: 1 = Not at all confident · 2 = Slightly confident · 3 = Somewhat confident · 4 = Fairly confident · 5 = Very confident</p>
        <RatingScale
          value={data.roleConfidence}
          onChange={(v) => update({ roleConfidence: v })}
          compact/>
      </div>
    </div>
  );
}

/* ---------- Step 3 ---------- */
function StepConfidenceRole({ data, update }) {
  return (
    <div>
      <div>
        <QLabel optional>Is there anything else you'd like to share?</QLabel>
        <textarea
          className="textarea"
          rows="4"
          placeholder={"What's one thing that would help you stay on track during this program sprint?\n\nWhat are any challenges?"}
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

/* ---------- Step 4 ---------- */
function StepFinalThoughts({ data, update }) {
  return (
    <div>
      <QLabel optional>That was a lot — we appreciate everything you shared. Did we miss anything, or is there anything else you'd like to add?</QLabel>
      <textarea
        className="textarea"
        rows="4"
        placeholder="Add anything else here…"
        value={data.finalThoughts}
        onChange={e => update({ finalThoughts: e.target.value })}/>
    </div>
  );
}

window.PreAssessment = PreAssessment;
