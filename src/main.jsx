import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, CheckCheck, ChevronDown, Clipboard, Copy, Feather, Heart, Instagram, Linkedin, Menu, MessageCircle, RefreshCw, Send, Sparkles, WandSparkles, X as XIcon, Zap } from 'lucide-react'
import './style.css'

const demoCaptions = [
  { text: 'College days: 10% attendance, 100% memories!', tags: ['#CollegeLife', '#Memories'], emojis: '😂🎓' },
  { text: 'Came for the fest, stayed for the food and friends!', tags: ['#CollegeFest', '#GoodVibes'], emojis: '🎉' },
  { text: 'Assignments can wait. The fest cannot!', tags: ['#StudentLife', '#FestMode'], emojis: '😎🔥' },
  { text: "Making memories that won't appear in the syllabus.", tags: ['#CollegeDiaries', '#BestDays'], emojis: '📸✨' },
  { text: 'Friends, music, chaos… just another legendary college day!', tags: ['#CampusLife', '#Unforgettable'], emojis: '🤝🎶' },
]
const toneText = {
  Funny: ['My plans for productivity got outvoted by a very good time.', 'Proof that the best plans sometimes begin with absolutely no plan.', 'I came, I saw, I made it slightly more chaotic.'],
  Professional: ['A meaningful moment, made even better in great company.', 'Progress is always worth celebrating together.', 'Ideas grow stronger when people come together.'],
  Casual: ['Just one of those days you wish could last a little longer.', 'A good day, good people, and nowhere else to be.', 'Saving this one for the memory bank.'],
  Motivational: ['Show up, find your people, and make the moment count.', 'Every great memory starts with saying yes to the moment.', 'Make today a story worth telling tomorrow.'],
  Inspirational: ['Some moments remind you how much brighter life is together.', 'The memories we make today become our favorite stories tomorrow.', 'When we come together, ordinary days become extraordinary.'],
  Witty: ['A little out of office, a lot on the guest list.', 'Living proof that a good time needs no agenda.', 'The group chat finally delivered on its promises.'],
}
const hashtags = {
  Instagram: ['#GoodVibes', '#LifeLately', '#MomentsLikeThese'], Facebook: ['#GoodTimes', '#FriendsAndFamily', '#MakingMemories'],
  LinkedIn: ['#Community', '#Teamwork', '#GrowthMindset'], X: ['#GoodTimes', '#TheLittleThings', '#LifeUpdate'],
}
const platforms = [
  { name: 'Instagram', Icon: Instagram }, { name: 'Facebook', Icon: MessageCircle }, { name: 'LinkedIn', Icon: Linkedin }, { name: 'X', Icon: XIcon },
]
const tones = ['Funny', 'Professional', 'Casual', 'Motivational', 'Inspirational', 'Witty']

function makeCaptions(topic, tone, platform, count, includeTags, includeEmojis) {
  if (topic.toLowerCase().includes('college') && tone === 'Funny' && platform === 'Instagram') {
    return demoCaptions.slice(0, count).map(item => ({ ...item, tags: includeTags ? item.tags : [], emojis: includeEmojis ? item.emojis : '' }))
  }
  const base = toneText[tone]
  const subject = topic.trim().replace(/[.!?]+$/, '')
  return Array.from({ length: count }, (_, i) => ({
    text: `${base[i % base.length]}${i >= base.length ? ' ' + subject.charAt(0).toLowerCase() + subject.slice(1) + '.' : ''}`,
    tags: includeTags ? [hashtags[platform][i % 3], hashtags[platform][(i + 1) % 3]] : [],
    emojis: includeEmojis ? [' ✨', ' 🎉', ' 💫', ' 🙌', ' 💜'][i % 5] : '',
  }))
}

function App() {
  const [topic, setTopic] = useState('Students enjoying a college fest with friends, music, and colorful decorations.')
  const [platform, setPlatform] = useState('Instagram')
  const [tone, setTone] = useState('Funny')
  const [count, setCount] = useState(5)
  const [includeTags, setIncludeTags] = useState(true)
  const [includeEmojis, setIncludeEmojis] = useState(true)
  const [captions, setCaptions] = useState([])
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')
  const [lastRun, setLastRun] = useState(null)
  const [mobileNav, setMobileNav] = useState(false)

  const notify = (message) => { setToast(message); window.clearTimeout(notify.timer); notify.timer = window.setTimeout(() => setToast(''), 2200) }
  const generate = (again = false) => {
    if (!topic.trim()) { setError('Add a topic or image description to get started.'); document.getElementById('topic')?.focus(); return }
    setError(''); setLoading(true)
    window.setTimeout(() => {
      const input = again && lastRun ? lastRun : { topic, tone, platform, count, includeTags, includeEmojis }
      setCaptions(makeCaptions(input.topic, input.tone, input.platform, input.count, input.includeTags, input.includeEmojis))
      setLastRun(input); setLoading(false)
    }, 850)
  }
  const copyText = async (text, message = 'Caption copied to clipboard') => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text)
      else { const area = document.createElement('textarea'); area.value = text; area.style.position = 'fixed'; area.style.opacity = '0'; document.body.appendChild(area); area.select(); const ok = document.execCommand('copy'); area.remove(); if (!ok) throw new Error('Copy unavailable') }
      notify(message)
    } catch { notify('Copy is unavailable in this browser') }
  }
  const reset = () => { setTopic(''); setPlatform('Instagram'); setTone('Funny'); setCount(5); setIncludeTags(true); setIncludeEmojis(true); setCaptions([]); setFavorites([]); setError(''); setLastRun(null); document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' }) }
  const jumpToGenerator = () => { document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' }); setMobileNav(false) }

  return <>
    <header className="site-header"><a className="brand" href="#home" aria-label="CaptionCraft AI home"><span className="brand-icon"><Feather size={19} strokeWidth={2.5} /></span><span>captioncraft<span className="brand-ai">.ai</span></span></a>
      <nav className={mobileNav ? 'nav nav-open' : 'nav'}><a onClick={() => setMobileNav(false)} href="#home">Home</a><a onClick={jumpToGenerator} href="#generator">Caption Generator</a><a onClick={() => setMobileNav(false)} href="#about">About</a></nav>
      <button className="header-cta" onClick={jumpToGenerator}>Start creating <ArrowUpRight size={15} /></button><button className="mobile-menu" aria-label="Toggle navigation" onClick={() => setMobileNav(!mobileNav)}>{mobileNav ? <XIcon /> : <Menu />}</button>
    </header>

    <main id="home">
      <section className="hero"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /><Sparkles size={13} /> YOUR CREATIVE SIDEKICK</div>
        <h1>Your ideas.<br /><span>Better captions.</span><br />Instantly.</h1>
        <p className="hero-description">Turn any topic or image description into engaging social media captions in seconds.</p>
        <div className="hero-actions"><button className="primary-button" onClick={jumpToGenerator}>Start creating <ArrowRight size={17} /></button><a className="text-link" href="#generator">See how it works <ArrowDown size={15} /></a></div>
        <div className="hero-social-proof"><div className="proof-avatars"><span>J</span><span>A</span><span>M</span><span>S</span></div><div><strong>Your next post, sorted.</strong><small>Made for the moments worth sharing.</small></div><span className="proof-spark">✳</span></div>
      </div>
      <div className="hero-visual"><div className="visual-glow" /><div className="floating-pill pill-top"><span className="live-dot" /> Your next caption, coming up</div><div className="preview-card">
          <div className="preview-card-top"><span className="preview-label"><span className="mini-icon"><Instagram size={13} /></span> INSTAGRAM CAPTION</span><span className="preview-more">···</span></div>
          <div className="preview-post"><div className="post-image"><span className="post-sun" /><div className="post-hills" /><span className="post-figure">✦</span><span className="post-confetti confetti-one">✦</span><span className="post-confetti confetti-two">✳</span><span className="post-confetti confetti-three">•</span><div className="post-image-label">good times, great people</div></div><div className="post-copy"><div className="post-copy-title"><span className="tiny-avatar">A</span><strong>alexcreates</strong><span className="follow-text">Follow</span></div><p>More living, less scrolling. This is your reminder to <span className="highlight-text">make today count</span> ✨</p><span className="post-tags">#LifeLately&nbsp; #GoodVibes</span><div className="post-stats"><span><Heart size={15} />&nbsp; 248</span><MessageCircle size={14} /><Send size={14} /><span className="post-save">⌑</span></div></div></div>
          <div className="preview-generated"><span className="generated-spark"><Sparkles size={13} /></span><p><small>YOUR IDEA, ELEVATED</small><strong>A little help with your next post.</strong></p><button onClick={jumpToGenerator} aria-label="Generate a caption"><ArrowRight size={17} /></button></div>
        </div><div className="floating-pill pill-bottom"><span className="pill-spark"><Sparkles size={13} /></span> It just gets you.</div><div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /></div></section>

      <section className="features"><div className="section-label"><span>LESS OVERTHINKING. MORE POSTING.</span><span className="label-line" /></div><div className="feature-grid">
        <article className="feature-item"><span className="feature-icon icon-purple"><LayersIcon /></span><div><h3>Multiple variations</h3><p>Get a few fresh angles for the same idea. Pick the one that feels like you.</p></div></article>
        <article className="feature-item"><span className="feature-icon icon-pink"><MessageCircle size={18} /></span><div><h3>Custom tones</h3><p>Funny, thoughtful, polished, or somewhere in between. Your call.</p></div></article>
        <article className="feature-item"><span className="feature-icon icon-amber"><Zap size={18} /></span><div><h3>Smarter hashtags</h3><p>Relevant tags and a few well-placed emojis, ready when you are.</p></div></article>
      </div></section>

      <section className="generator-section" id="generator"><div className="section-heading"><div className="eyebrow"><Sparkles size={13} /> YOUR CAPTION WORKSPACE</div><h2>A little help finding the words.</h2><p>Tell us what you're sharing. We'll handle the blank-page stare.</p></div>
        <div className="workspace"><section className="input-panel"><div className="panel-heading"><span className="panel-icon"><WandSparkles size={17} /></span><div><h3>Make it yours</h3><p>A few details go a long way.</p></div><span className="step-label">01 <span>/ 02</span></span></div>
          <label className="field-label" htmlFor="topic">What's the post about?<span className="required">*</span></label><textarea id="topic" className={error ? 'topic-input input-error' : 'topic-input'} value={topic} onChange={e => { setTopic(e.target.value); if (e.target.value.trim()) setError('') }} placeholder="e.g. Sunday coffee, a new project, that incredible sunset…" maxLength={500} aria-describedby={error ? 'topic-error' : 'topic-help'} /><div className="textarea-footer"><span id={error ? 'topic-error' : 'topic-help'} className={error ? 'error-message' : 'field-hint'}>{error || 'A topic, a mood, an image description — anything works.'}</span><span className="char-count">{topic.length}/500</span></div>
          <div className="field-divider" /><fieldset className="field-group"><legend className="field-label">Where are you posting?</legend><div className="platform-grid">{platforms.map(({ name, Icon }) => <button type="button" key={name} className={`platform-option ${platform === name ? 'platform-selected' : ''}`} aria-pressed={platform === name} onClick={() => setPlatform(name)}><Icon size={15} /><span>{name}</span></button>)}</div></fieldset>
          <fieldset className="field-group"><div className="label-row"><legend className="field-label">Set the tone</legend><span className="selection-hint">CHOOSE ONE</span></div><div className="tone-list">{tones.map(t => <button type="button" key={t} className={`tone-chip ${tone === t ? 'tone-selected' : ''}`} aria-pressed={tone === t} onClick={() => setTone(t)}>{tone === t && <Check size={12} />}{t}</button>)}</div></fieldset>
          <div className="field-divider" /><div className="bottom-controls"><div className="count-control"><label className="field-label" htmlFor="caption-count">Number of captions</label><div className="select-wrap"><select id="caption-count" value={count} onChange={e => setCount(Number(e.target.value))}><option value={1}>1 caption</option><option value={3}>3 captions</option><option value={5}>5 captions</option></select><ChevronDown size={14} /></div></div><div className="toggle-controls"><Toggle label="Hashtags" checked={includeTags} onChange={setIncludeTags} /><Toggle label="Emojis" checked={includeEmojis} onChange={setIncludeEmojis} /></div></div>
          <button className="generate-button" disabled={loading} onClick={() => generate(false)}>{loading ? <><span className="spinner" /> Finding your words…</> : <><Sparkles size={17} /> Generate captions <ArrowRight size={16} /></>}</button><div className="demo-note"><span className="demo-note-dot" /> Prototype demo mode <span>·</span> Sample AI-style generation</div>
        </section>

        <section className="results-panel"><div className="results-header"><div className="results-heading"><span className="results-number">02</span><div><h3>Your captions</h3><p>{captions.length ? `${captions.length} ready-to-share ${captions.length === 1 ? 'option' : 'options'}` : 'A few good words, on their way.'}</p></div></div>{captions.length > 0 && <button className="copy-all-button" onClick={() => copyText(captions.map((c, i) => `${i + 1}. ${c.text}${c.emojis ? ` ${c.emojis}` : ''}${c.tags.length ? `\n${c.tags.join(' ')}` : ''}`).join('\n\n'), 'All captions copied')}><Copy size={14} /> Copy all</button>}</div>
          {loading ? <div className="loading-state"><div className="loading-orb"><Sparkles size={22} /></div><h3>Finding just the right words…</h3><p>A little creativity takes a second.</p><div className="loading-bars"><span /><span /><span /></div></div> : captions.length ? <div className="caption-list">{captions.map((caption, i) => <article className="caption-card" key={`${i}-${caption.text}`}><div className="caption-card-top"><span className="caption-number">CAPTION 0{i + 1}</span><span className="caption-platform">{platform}</span></div><p className="caption-text">{caption.text}{caption.emojis && <span className="caption-emojis"> {caption.emojis}</span>}</p>{caption.tags.length > 0 && <div className="caption-tags">{caption.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}<div className="caption-actions"><button onClick={() => copyText(`${caption.text}${caption.emojis ? ` ${caption.emojis}` : ''}${caption.tags.length ? `\n${caption.tags.join(' ')}` : ''}`)}><Clipboard size={13} /> Copy</button><button className={favorites.includes(i) ? 'favorite-active' : ''} onClick={() => setFavorites(prev => prev.includes(i) ? prev.filter(id => id !== i) : [...prev, i])}><Heart size={13} fill={favorites.includes(i) ? 'currentColor' : 'none'} /> {favorites.includes(i) ? 'Saved' : 'Save'}</button></div></article>)}</div> : <div className="empty-state"><div className="empty-art"><div className="empty-paper"><span className="paper-line paper-line-long" /><span className="paper-line" /><span className="paper-line paper-line-mid" /><span className="paper-sparkle"><Sparkles size={16} /></span></div><span className="empty-orbit empty-orbit-one" /><span className="empty-orbit empty-orbit-two" /><span className="empty-star star-left">✳</span><span className="empty-star star-right">✧</span></div><h3>Your next favorite caption starts here.</h3><p>Fill in a few details, and your options will show up right here.</p><button className="empty-cta" onClick={() => document.getElementById('topic')?.focus()}>Add your idea <ArrowRight size={14} /></button></div>}
          {captions.length > 0 && !loading && <button className="generate-again" onClick={() => generate(true)} disabled={loading}><RefreshCw size={14} /> Generate again <span>Same settings, new spin</span></button>}
        </section></div><div className="workspace-footnote"><span><CheckCheck size={14} /> Ready for your next post</span><span>Sample captions for demonstration purposes</span></div>
      </section>

      <section className="about-section" id="about"><div className="about-intro"><div className="eyebrow"><span className="about-eyebrow-line" /> THE IDEA BEHIND THE TOOL</div><h2>Behind every good caption<br />is a little bit of <span>word magic.</span></h2><p>This project explores how generative AI can help turn a simple idea into social-ready writing — without taking the human out of it.</p><div className="objective-note"><span className="objective-icon"><Sparkles size={14} /></span><p><strong>The objective</strong><br />Generate multiple social media caption variations from an idea, shaped by each user's preferences.</p></div></div><div className="about-details"><article className="concept-card"><div className="concept-top"><span className="concept-index">01 — THE CONCEPT</span><span className="concept-stamp">BUILT ON WORDS <Sparkles size={11} /></span></div><h3>A prompt in.<br />More ways to say it.</h3><p>At its core, this concept draws on GPT-based text generation, natural language processing, and prompt engineering: the art of giving a language model the right context to create useful, varied writing.</p><div className="concept-tags"><span>GPT-based generation</span><span>NLP</span><span>Prompt engineering</span></div></article>
          <article className="workflow-card"><div className="concept-index">02 — THE WORKFLOW</div><div className="workflow-steps"><span>User input</span><ArrowRight /><span>Preferences</span><ArrowRight /><span>Validate</span><ArrowRight /><span>Prompt</span><ArrowRight /><span>Captions</span></div><p>Describe your post, choose a tone and platform, then turn your preferences into formatted caption options.</p></article>
          <article className="architecture-card"><div className="architecture-title"><div><span className="concept-index">03 — THE ARCHITECTURE</span><h3>Four parts. One little helper.</h3></div><span className="architecture-mark">✳</span></div><div className="architecture-list"><div><span className="arch-dot arch-purple" /><span><strong>Presentation</strong><small>Input form &amp; results</small></span></div><div><span className="arch-dot arch-blue" /><span><strong>Application</strong><small>Validation, preferences &amp; prompt</small></span></div><div><span className="arch-dot arch-pink" /><span><strong>AI generation</strong><small>Intended GPT model integration</small></span></div><div><span className="arch-dot arch-gold" /><span><strong>Output</strong><small>Captions, hashtags &amp; favorites</small></span></div></div><div className="simulation-note"><span className="simulation-icon"><Sparkles size={13} /></span><p><strong>A note on this demo.</strong> You're seeing locally prepared sample data, styled to demonstrate the idea. No GPT model or API is connected.</p></div></article>
        </div></section>
      <section className="final-cta"><div className="final-cta-spark">✧</div><p>THE BLANK CAPTION BOX DOESN'T STAND A CHANCE.</p><h2>Your next post is<br />already taking shape.</h2><button className="final-cta-button" onClick={jumpToGenerator}>Give it a go <ArrowUpRight size={16} /></button><span className="final-cta-orbit" /></section>
    </main>
    <footer className="footer"><a className="brand footer-brand" href="#home"><span className="brand-icon"><Feather size={16} strokeWidth={2.5} /></span><span>captioncraft<span className="brand-ai">.ai</span></span></a><span>A little word magic, made for the moments worth sharing.</span><span>COLLEGE PROJECT · DEMO MODE</span></footer>
    {toast && <div className="toast"><span><Check size={14} /></span>{toast}</div>}
  </>
}

function Toggle({ label, checked, onChange }) {
  return <button className={`toggle-row ${checked ? 'toggle-on' : ''}`} role="switch" aria-checked={checked} onClick={() => onChange(!checked)}><span className="toggle-track"><span className="toggle-knob" /></span><span>{label}</span></button>
}
function LayersIcon() { return <div className="layers-symbol"><span /><span /><span /></div> }

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>)
