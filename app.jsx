/* Atrium Assessments — App root */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#2600fc",
  "background": "sky",
  "displayFont": "newsreader"
}/*EDITMODE-END*/;

const BG_PRESETS = {
  sky: { '--sky-3': '#eff3fc', '--sky-4': '#f6f8fd' },
  beige: { '--sky-3': '#faf4ed', '--sky-4': '#fbf6ef' },
  white: { '--sky-3': '#ffffff', '--sky-4': '#fafafa' },
};

const FONT_PRESETS = {
  newsreader: "'Newsreader', 'Source Serif 4', Georgia, serif",
  archivo: "'Archivo', system-ui, sans-serif",
};

function App() {
  const [view, setView] = React.useState('assessments');
  const [tab, setTab] = React.useState('pre');
  const [preDone, setPreDone] = React.useState(false);
  const [postLocked, setPostLocked] = React.useState(true);
  const [postDone, setPostDone] = React.useState(false);
  const [resetKey, setResetKey] = React.useState(0);
  const [toast, setToast] = React.useState(null);
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Console toggle for testing: unlockPost() / lockPost()
  React.useEffect(() => {
    window.unlockPost = () => setPostLocked(false);
    window.lockPost   = () => setPostLocked(true);
    return () => { delete window.unlockPost; delete window.lockPost; };
  }, []);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--cobalt', t.accent);
    const bg = BG_PRESETS[t.background] || BG_PRESETS.sky;
    Object.entries(bg).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
    document.body.style.background = bg['--sky-3'];
    const serifElems = document.querySelectorAll('.serif');
    serifElems.forEach(el => {
      el.style.fontFamily = FONT_PRESETS[t.displayFont] || FONT_PRESETS.newsreader;
      el.style.fontWeight = t.displayFont === 'archivo' ? '700' : '600';
    });
  }, [t, tab]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };
  const handleSaveDraft = () => showToast('Draft saved · resume any time');

  return (
    <div className="app" data-screen-label={view}>
      <Sidebar current={view} onNav={(id) => setView(id)}/>
      <main className="main">

        {view === 'assessments' && (
          <>
            <div className="main-header">
              <h1 className="main-title">Assessments</h1>
            </div>

            <div className="sprint-context">
              <span className="sprint-context-name">Sprint 4</span>
              <span className="sprint-context-sep">·</span>
              <span className="sprint-context-expert">with Mac Gebara</span>
            </div>

            <div className="assessment-tabs">
              <button
                className={'assessment-tab ' + (tab === 'pre' ? 'active' : '')}
                onClick={() => setTab('pre')}>
                Pre-assessment
              </button>
              <button
                className={'assessment-tab ' + (tab === 'post' ? 'active' : '')}
                onClick={() => setTab('post')}>
                Post-assessment
              </button>
            </div>

            {tab === 'pre' && (
              preDone
                ? <CompletionView kind="pre" onBack={() => { setPreDone(false); setResetKey(k => k + 1); }}/>
                : <PreAssessment
                    key={'pre-' + resetKey}
                    onComplete={() => setPreDone(true)}/>
            )}

            {tab === 'post' && (
              postLocked
                ? <LockedAssessment/>
                : postDone
                  ? <CompletionView kind="post" onBack={() => setPostDone(false)}/>
                  : <PostAssessment
                      key={'post-' + resetKey}
                      onComplete={() => setPostDone(true)}
                      onSaveDraft={handleSaveDraft}/>
            )}
          </>
        )}

        {view === 'final-reports' && <FinalReportsPage/>}

        <AssessmentsTweaks t={t} setTweak={setTweak}/>
      </main>

      {toast && (
        <div className="save-toast">
          <I.Check size={14}/> {toast}
        </div>
      )}
    </div>
  );
}

function LockedAssessment() {
  return (
    <div className="card locked-assessment">
      <div className="locked-assessment-icon">
        <I.Lock size={26}/>
      </div>
      <h3 className="locked-assessment-title">Available at sprint end</h3>
      <p className="locked-assessment-sub">
        Your post assessment unlocks when Sprint 4 wraps up. You'll reflect on your progress, capture impact, and plan what's next.
      </p>
    </div>
  );
}

function AssessmentsTweaks({ t, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="Color">
        <TweakColor
          label="Accent"
          value={t.accent}
          onChange={(v) => setTweak('accent', v)}
          options={['#2600fc', '#0a0a14', '#0066ff', '#7c3aed']}/>
        <TweakRadio
          label="Background"
          value={t.background}
          onChange={(v) => setTweak('background', v)}
          options={[
            { value: 'sky', label: 'Sky' },
            { value: 'beige', label: 'Beige' },
            { value: 'white', label: 'White' },
          ]}/>
      </TweakSection>
      <TweakSection title="Type">
        <TweakRadio
          label="Display font"
          value={t.displayFont}
          onChange={(v) => setTweak('displayFont', v)}
          options={[
            { value: 'newsreader', label: 'Serif' },
            { value: 'archivo', label: 'Sans' },
          ]}/>
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
