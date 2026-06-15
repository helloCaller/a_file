/* Post-Assessment — Part II (4 steps, copy from impact-assessment doc) */

const POST_STEPS = ['Leadership Growth and Impact', 'Expert Match', 'Atrium Feedback', "What's Next"];

const POST_GOALS = [
  { id: 'g1', name: 'Drive operational excellence in HR' },
  { id: 'g2', name: 'Build stronger HR and HR operations acumen' },
  { id: 'g3', name: 'Lead through ambiguity and rapid change' },
];

const PROGRAM_OUTCOMES = [
  { id: 'o1', label: 'Standardized onboarding across three regional teams' },
  { id: 'o2', label: 'Reduced time-to-fill for senior roles by 30%' },
  { id: 'o3', label: 'Launched manager enablement program (12 participants)' },
  { id: 'o4', label: 'Established quarterly HR ops review cadence with leadership' },
];

function PostAssessment({ onExit, onComplete, onSaveDraft }) {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({
    progress: {},
    insight: '',
    roleConfidence: null,
    application: null,
    applicationExample: '',
    outcomesAchieved: [],
    otherOutcome: '',
    stakeholderFeedback: '',
    expertAlignment: null,
    expertChemistry: null,
    expertValue: null,
    nps: null,
    mostValuable: '',
    improvement: '',
    wouldPay: null,
    wouldTestimonial: null,
    testimonial: '',
    testimonialShare: null,
    readyForNext: null,
    // Restructured sprint plan
    planGoals: [
      { id: 'pg-' + Date.now(), name: '', context: '' },
    ],
    planBusinessNeed: '',
    planOutcomes: ['', ''],
    sameExpert: null,
    sameExpertOther: '',
    anythingElse: '',
  });

  const update = (patch) => setData(d => ({ ...d, ...patch }));

  const next = () => {
    if (step < POST_STEPS.length - 1) setStep(s => s + 1);
    else onComplete && onComplete(data);
  };
  const back = () => {
    if (step > 0) setStep(s => s - 1);
    else onExit && onExit();
  };

  const filled = (s) => typeof s === 'string' && s.trim().length > 0;

  const canAdvance = () => {
    if (step === 0) {
      return POST_GOALS.every(g => data.progress[g.id])
        && filled(data.insight)
        && data.roleConfidence
        && data.application
        && filled(data.applicationExample)
        && data.outcomesAchieved.length > 0
        && filled(data.stakeholderFeedback);
    }
    if (step === 1) return data.expertAlignment && data.expertChemistry && data.expertValue;
    if (step === 2) {
      const baseOk = data.nps && filled(data.mostValuable) && filled(data.improvement)
        && data.wouldPay !== null && data.wouldTestimonial !== null;
      if (data.wouldTestimonial === 'yes') {
        return baseOk && filled(data.testimonial) && data.testimonialShare;
      }
      return baseOk;
    }
    if (step === 3) {
      if (!data.readyForNext) return false;
      if (data.readyForNext === 'yes') {
        const goalsOk = data.planGoals.length > 0
          && data.planGoals.every(g => filled(g.name) && filled(g.context));
        const outcomesOk = data.planOutcomes.filter(o => filled(o)).length >= 2;
        const planOk = goalsOk && filled(data.planBusinessNeed) && outcomesOk && data.sameExpert;
        const otherOk = data.sameExpert === 'other' ? filled(data.sameExpertOther) : true;
        return planOk && otherOk;
      }
      return true;
    }
    return true;
  };

  return (
    <div className="card">
        {step === 0 && <div className="context-hint" style={{ marginBottom: 22 }}>
          <I.Info size={16}/>
          <span>
            Your responses and your manager's responses will be combined into a shared report to support an open and transparent conversation about progress and next steps.
          </span>
        </div>}

        <Stepper steps={POST_STEPS} current={step}/>

        {step === 0 && <StepImpact data={data} update={update}/>}
        {step === 1 && <StepExpert data={data} update={update}/>}
        {step === 2 && <StepFeedback data={data} update={update}/>}
        {step === 3 && <StepWhatsNext data={data} update={update}/>}

        <WizardFooter
          onBack={back}
          onNext={next}
          nextLabel={step === POST_STEPS.length - 1 ? 'Submit assessment' : 'Next'}
          nextDisabled={!canAdvance()}
        />
    </div>
  );
}

/* ---------- Step 1: Impact (Growth + Behavior + Outcomes) ---------- */
function StepImpact({ data, update }) {
  const toggle = (id) => {
    const s = new Set(data.outcomesAchieved);
    s.has(id) ? s.delete(id) : s.add(id);
    update({ outcomesAchieved: [...s] });
  };
  return (
    <div>
      <InlineQ>
        <QLabel>Did you make progress on your development goals?</QLabel>
        <div className="rating-group">
          {POST_GOALS.map((g, i) => (
            <div key={g.id} className="rating-group-item">
              <div className="rating-group-item-label">{i + 1}. {g.name}</div>
              <RatingScale
                value={data.progress[g.id]}
                onChange={(v) => update({ progress: { ...data.progress, [g.id]: v } })}
                vertical labels={SCALES.PROGRESS}/>
            </div>
          ))}
        </div>
      </InlineQ>

      <InlineQ>
        <QLabel>What are the most valuable skills, insights, or mindset shifts you gained?</QLabel>
        <textarea
          className="textarea"
          rows="3"
          placeholder="Write a sentence or two…"
          value={data.insight}
          onChange={e => update({ insight: e.target.value })}/>
      </InlineQ>

      <InlineQ>
        <QLabel>Do you feel more confident in your role?</QLabel>
        <RatingScale
          value={data.roleConfidence}
          onChange={(v) => update({ roleConfidence: v })}
          vertical labels={SCALES.AGREEMENT}/>
      </InlineQ>
    </div>
  );
}

function InlineQ({ children }) {
  return <div style={{ marginTop: 28 }}>{children}</div>;
}

/* ---------- Step 2: Expert match ---------- */
function StepExpert({ data, update }) {
  const fields = [
    { key: 'expertAlignment', label: "How well did Mac's experience align with what you needed?", scale: SCALES.ALIGNMENT },
    { key: 'expertChemistry', label: 'How strong was the chemistry and trust between you and Mac?', scale: SCALES.STRENGTH },
    { key: 'expertValue', label: 'How valuable was the mentorship, coaching, and guidance Mac provided?', scale: SCALES.VALUE },
  ];
  return (
    <div>
      <div style={{
        display: 'flex', gap: 14, alignItems: 'center', padding: 16, background: 'var(--sky-4)',
        borderRadius: 16, marginBottom: 28
      }}>
        <div style={{
          width: 48, height: 48, borderRadius: 999, background: 'var(--cobalt)', color: 'white',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 600,
          letterSpacing: '-0.02em'
        }}>MG</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 15 }}>Your expert · Mac Gebara</div>
          <div style={{ fontSize: 13, color: 'var(--muted)' }}>Fmr. VP People · 12 sessions this sprint</div>
        </div>
      </div>

      {fields.map((f) => (
        <InlineQ key={f.key}>
          <QLabel>{f.label}</QLabel>
          <RatingScale
            value={data[f.key]}
            onChange={(v) => update({ [f.key]: v })}
            vertical labels={f.scale}/>
        </InlineQ>
      ))}
    </div>
  );
}

/* ---------- Step 3: Feedback ---------- */
function StepFeedback({ data, update }) {
  return (
    <div>
      <InlineQ>
        <QLabel>How likely are you to recommend Atrium to a colleague or peer?</QLabel>
        <p className="q-help">Scale: 1 = Not likely · 10 = Very likely</p>
        <RatingScale
          value={data.nps}
          onChange={(v) => update({ nps: v })}
          max={10} compact/>
      </InlineQ>

      <InlineQ>
        <QLabel>What aspect of the program was most valuable to you?</QLabel>
        <textarea className="textarea" rows="3"
          placeholder="Write a sentence or two…"
          value={data.mostValuable}
          onChange={e => update({ mostValuable: e.target.value })}/>
      </InlineQ>

      <InlineQ>
        <QLabel>What's one thing we could do to improve your experience with Atrium?</QLabel>
        <textarea className="textarea" rows="3"
          placeholder="Write a sentence or two…"
          value={data.improvement}
          onChange={e => update({ improvement: e.target.value })}/>
      </InlineQ>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 28 }}>
        <div>
          <QLabel>Would you pay for Atrium with your own money?</QLabel>
          <Segmented
            value={data.wouldPay}
            onChange={(v) => update({ wouldPay: v })}
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}/>
        </div>
        <div>
          <QLabel>Would you be open to sharing a testimonial?</QLabel>
          <Segmented
            value={data.wouldTestimonial}
            onChange={(v) => update({ wouldTestimonial: v })}
            options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}/>
        </div>
      </div>

      {data.wouldTestimonial === 'yes' && (
        <div style={{
          background: 'var(--beige-2)', borderRadius: 16, padding: 22, marginTop: 24
        }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
            <I.MessageQuote size={20}/>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Testimonial</div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 14 }}>
            Thank you for taking the time to share a testimonial — we really appreciate it!
          </div>

          <QLabel>Share your testimonial</QLabel>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 10 }}>
            What changed as a result of this experience? Think about any shifts in mindset, leadership approach, team performance, or business outcomes. Specifics are gold.
          </div>
          <textarea className="textarea" rows="4"
            placeholder="In your own words…"
            value={data.testimonial}
            onChange={e => update({ testimonial: e.target.value })}/>

          <div style={{ marginTop: 18 }}>
            <QLabel>Can we share your testimonial on social media?</QLabel>
            {[
              { id: 'rooftops', label: 'Yes, shout it from the rooftops and tag me!' },
              { id: 'anon', label: 'Yes, but please keep it anonymous.' },
              { id: 'private', label: "No, let's keep this just between us." },
            ].map(opt => (
              <div key={opt.id}
                   className={'choice ' + (data.testimonialShare === opt.id ? 'selected' : '')}
                   onClick={() => update({ testimonialShare: opt.id })}>
                <div className="choice-box radio"/>
                <div>{opt.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Step 4: What's Next ---------- */
function StepWhatsNext({ data, update }) {
  const readyOptions = [
    { id: 'yes', label: "Yes, let's do it!" },
    { id: 'no', label: "No, I'm good for now." },
    { id: 'unsure', label: "I'm not sure, still taking it all in." },
  ];
  const expertOptions = [
    { id: 'continue', label: 'Continue working with the same Expert' },
    { id: 'new', label: 'Explore a new Expert based on new goals or priorities' },
    { id: 'other', label: 'Other' },
  ];

  // Plan handlers
  const updateGoal = (id, patch) => {
    update({
      planGoals: data.planGoals.map(g => g.id === id ? { ...g, ...patch } : g)
    });
  };
  const addGoal = () => {
    if (data.planGoals.length >= 3) return;
    update({
      planGoals: [...data.planGoals, { id: 'pg-' + Date.now(), name: '', context: '' }]
    });
  };
  const removeGoal = (id) => {
    if (data.planGoals.length <= 1) return;
    update({ planGoals: data.planGoals.filter(g => g.id !== id) });
  };
  const updateOutcome = (idx, v) => {
    const next = [...data.planOutcomes];
    next[idx] = v;
    update({ planOutcomes: next });
  };
  const addOutcome = () => {
    if (data.planOutcomes.length >= 6) return;
    update({ planOutcomes: [...data.planOutcomes, ''] });
  };
  const removeOutcome = (idx) => {
    if (data.planOutcomes.length <= 2) return;
    update({ planOutcomes: data.planOutcomes.filter((_, i) => i !== idx) });
  };

  return (
    <div>
      <InlineQ>
        <QLabel>Are you ready for your next Atrium sprint?</QLabel>
        <div style={{ marginTop: 8 }}>
          {readyOptions.map(opt => (
            <div key={opt.id}
                 className={'choice ' + (data.readyForNext === opt.id ? 'selected' : '')}
                 onClick={() => update({ readyForNext: opt.id })}>
              <div className="choice-box radio"/>
              <div>{opt.label}</div>
            </div>
          ))}
        </div>
      </InlineQ>

      {data.readyForNext === 'yes' && (
        <div style={{ marginTop: 28, padding: 28, background: 'var(--sky-4)', borderRadius: 18 }}>
          <div style={{ fontSize: 19, fontWeight: 600, marginBottom: 4, letterSpacing: '-0.005em' }}>
            Sprint planning
          </div>
          <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 22, lineHeight: 1.5 }}>
            This helps us understand your focus for the next sprint, what the business needs most right now, and what success should look like.
          </div>

          {/* Section 1: Development goals */}
          <div className="plan-section">
            <div className="plan-section-head">
              <span className="plan-section-num">01 —</span>
              <span className="plan-section-title">Development goals</span>
            </div>
            <p className="plan-section-help">
              What feels most important to improve, navigate, or lead differently over the next sprint? Share 1–3 goals and any relevant context.
            </p>

            <div className="plan-current-tile">
              <strong>From your last sprint</strong>
              <div style={{ marginTop: 4 }}>Drive operational excellence in HR · Build stronger HR ops acumen · Lead through ambiguity</div>
              <div style={{ marginTop: 8, fontStyle: 'italic' }}>You can continue building on previous goals, evolve them, or shift to something new.</div>
            </div>

            {data.planGoals.map((g, i) => (
              <div key={g.id} className="plan-goal">
                <div className="plan-goal-head">
                  <span className="plan-goal-num">Goal {i + 1}</span>
                  {data.planGoals.length > 1 && (
                    <button className="plan-goal-delete" onClick={() => removeGoal(g.id)}>
                      Remove
                    </button>
                  )}
                </div>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>What do you want to achieve?</div>
                <input
                  type="text"
                  className="text-input"
                  placeholder="e.g. Lead a major initiative more effectively · Improve communication in executive meetings · Build a stronger operating rhythm for the team"
                  value={g.name}
                  onChange={e => updateGoal(g.id, { name: e.target.value })}/>

                <div style={{ fontSize: 14, fontWeight: 500, marginTop: 14, marginBottom: 8 }}>Context</div>
                <textarea
                  className="textarea"
                  rows="3"
                  style={{ minHeight: 88 }}
                  placeholder="What's happening right now that's driving this? What feels challenging, high stakes, or important to get right?"
                  value={g.context}
                  onChange={e => updateGoal(g.id, { context: e.target.value })}/>
              </div>
            ))}

            {data.planGoals.length < 3 && (
              <button className="plan-add" onClick={addGoal}>
                <I.Plus size={14}/> Add another goal
              </button>
            )}
          </div>

          {/* Section 2: Aligned with business needs */}
          <div className="plan-section">
            <div className="plan-section-head">
              <span className="plan-section-num">02 —</span>
              <span className="plan-section-title">Aligned with business needs</span>
            </div>
            <p className="plan-section-help">Why does this matter right now?</p>
            <textarea
              className="textarea"
              rows="4"
              placeholder="What is happening across the business, team, or broader market that makes this important now? e.g. rapid growth · shifting priorities · market pressure · restructuring · new leadership expectations · scaling challenges · operational gaps"
              value={data.planBusinessNeed}
              onChange={e => update({ planBusinessNeed: e.target.value })}/>
          </div>

          {/* Section 3: Impact & outcomes */}
          <div className="plan-section">
            <div className="plan-section-head">
              <span className="plan-section-num">03 —</span>
              <span className="plan-section-title">Impact and outcomes</span>
            </div>
            <p className="plan-section-help">
              What would you want to see by the end of the next sprint? Add at least 2 outcomes.
            </p>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 14, lineHeight: 1.5 }}>
              The strongest outcomes are tied to real work: projects, decisions, processes, change, team dynamics, relationships, or business priorities.
            </div>

            {data.planOutcomes.map((o, i) => {
              const placeholders = [
                'Example: A key project is delivered on time with clearer ownership and alignment',
                'Example: Leadership meetings become more focused, confident, and effective',
              ];
              return (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 6, color: 'var(--muted)' }}>
                    Outcome {i + 1}
                  </div>
                  <div className="plan-outcome">
                    <span className="bullet"/>
                    <input
                      type="text"
                      className="text-input"
                      placeholder={placeholders[i] || 'Write your outcome…'}
                      value={o}
                      onChange={e => updateOutcome(i, e.target.value)}/>
                    {data.planOutcomes.length > 2 && (
                      <button className="plan-goal-delete" onClick={() => removeOutcome(i)}>
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {data.planOutcomes.length < 6 && (
              <button className="plan-add" onClick={addOutcome}>
                <I.Plus size={14}/> Add another outcome
              </button>
            )}
          </div>

          {/* Section 4: Expert match */}
          <div className="plan-section">
            <div className="plan-section-head">
              <span className="plan-section-num">04 —</span>
              <span className="plan-section-title">Expert match</span>
            </div>
            <p className="plan-section-help">What would you like to do for the next sprint?</p>
            {expertOptions.map(opt => (
              <div key={opt.id}
                   className={'choice ' + (data.sameExpert === opt.id ? 'selected' : '')}
                   onClick={() => update({ sameExpert: opt.id })}>
                <div className="choice-box radio"/>
                <div style={{ flex: 1 }}>
                  {opt.label}
                  {opt.id === 'other' && data.sameExpert === 'other' && (
                    <input
                      type="text"
                      className="text-input"
                      style={{ marginTop: 10 }}
                      placeholder="Tell us more…"
                      value={data.sameExpertOther}
                      onChange={e => update({ sameExpertOther: e.target.value })}
                      onClick={e => e.stopPropagation()}/>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <InlineQ>
        <QLabel optional>That was a lot — we appreciate everything you shared. Did we miss anything, or is there anything else you'd like to add?</QLabel>
        <textarea className="textarea" rows="3"
          placeholder="Write anything else…"
          value={data.anythingElse}
          onChange={e => update({ anythingElse: e.target.value })}/>
      </InlineQ>
    </div>
  );
}

window.PostAssessment = PostAssessment;
