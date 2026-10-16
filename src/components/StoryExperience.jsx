import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  about,
  closing,
  exploration,
  futureSelf,
  growthQualities,
  hero,
  letter,
  navigation,
  professional,
  site,
} from '../content/siteContent'

export function StoryNavigation() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="story-nav">
      <a className="story-logo" href="#top" aria-label={`${site.title}, home`}>
        <span className="story-monogram">{site.monogram}</span>
        <span className="story-logo-label">PARI <i>·</i> STORY NOTES</span>
      </a>
      <button
        className="nav-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="story-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? 'CLOSE' : 'MENU'}
      </button>
      <nav
        className={`story-nav-links ${menuOpen ? 'is-open' : ''}`}
        id="story-navigation"
        aria-label="Main navigation"
      >
        {navigation.map((item, index) => (
          <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
            <span>0{index + 1}</span>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  )
}

export function StoryHero({ reducedMotion }) {
  return (
    <section className="story-hero" id="top">
      <div className="hero-cover">
        <div className="hero-copy">
          <motion.p
            className="eyebrow cover-greeting"
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {hero.greeting}
          </motion.p>
          <motion.h1
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            {hero.title.split('\n').map((line, index) => (
              <span className={index === 1 ? 'title-second-line' : ''} key={line}>
                {line}
              </span>
            ))}
          </motion.h1>
          <motion.p
            className="hero-statement"
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            {hero.statement}
          </motion.p>
          <motion.p
            className="hero-introduction"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
          >
            {hero.introduction}
          </motion.p>
          <div className="hero-actions">
            <a className="button button-dark" href="#about">
              {hero.primary} <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="text-link" href="#about">
              {hero.secondary} <ArrowDown size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        <motion.div
          className="cover-art"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.96, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          aria-label="Original abstract editorial artwork"
          role="img"
        >
          <div className="cover-art-paper" />
          <div className="cover-art-sun" />
          <div className="cover-art-loop cover-art-loop-one" />
          <div className="cover-art-loop cover-art-loop-two" />
          <div className="cover-art-cutout" />
          <span className="cover-art-note">a life in progress</span>
          <span className="cover-art-index">VOL. 01 / 2026</span>
        </motion.div>

        <span className="handwritten hero-annotation">{hero.annotation}</span>
        <span className="cover-number">01 — A PERSONAL FIELD GUIDE</span>
      </div>
    </section>
  )
}

export function AboutCollage({ reducedMotion }) {
  const [selected, setSelected] = useState(null)
  const closeRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    if (!selected) return undefined
    const previous = triggerRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelected(null)
      if (event.key === 'Tab') {
        const focusable = [...document.querySelectorAll('.story-modal button')]
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previous?.focus()
    }
  }, [selected])

  const openNote = (note, event) => {
    triggerRef.current = event.currentTarget
    setSelected(note)
  }

  return (
    <section className="section story-section about-section" id="about">
      <div className="section-intro">
        <p className="eyebrow">A few pages about me</p>
        <h2>{about.heading}</h2>
        <p>{about.supporting}</p>
      </div>

      <div className="about-collage" aria-label="A collage of things that make me, me">
        {about.notes.map((note) => (
          <button
            className={`collage-note note-${note.color} shape-${note.shape}`}
            key={note.id}
            type="button"
            style={{ '--note-rotation': `${note.rotation}deg` }}
            onClick={(event) => openNote(note, event)}
            aria-haspopup="dialog"
          >
            <span className="collage-note-index">{note.index} / A NOTE</span>
            <span className="collage-note-title">{note.title}</span>
            <span className="collage-note-subtitle">{note.subtitle}</span>
            <span className="collage-open" aria-hidden="true"><ArrowUpRight size={16} /></span>
          </button>
        ))}
        <span className="collage-scribble scribble-two" aria-hidden="true">still becoming ↗</span>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="story-modal-backdrop"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelected(null)
            }}
          >
            <motion.article
              className={`story-modal note-${selected.color}`}
              role="dialog"
              aria-modal="true"
              aria-labelledby="note-title"
              initial={reducedMotion ? false : { opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: reducedMotion ? 0 : 0.22 }}
            >
              <p className="eyebrow">A little more about me · {selected.index}</p>
              <h3 id="note-title">{selected.title}</h3>
              <p>{selected.description}</p>
              <button
                ref={closeRef}
                className="modal-close"
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close personal note"
              >
                <X size={18} />
              </button>
              <button className="modal-done" type="button" onClick={() => setSelected(null)}>
                BACK TO THE COLLAGE <ArrowRight size={15} />
              </button>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export function ExplorationSection() {
  const [activeId, setActiveId] = useState(exploration.themes[0].id)
  const active = exploration.themes.find((item) => item.id === activeId)

  return (
    <section className="section story-section exploration-section" id="world">
      <div className="exploration-top">
        <div>
          <p className="eyebrow">A wishlist with no fixed map</p>
          <h2>{exploration.heading}</h2>
        </div>
        <p className="exploration-lead">{exploration.introduction}</p>
      </div>
      <p className="exploration-supporting">{exploration.supporting}</p>

      <div className="exploration-editorial">
        <div className="travel-art" aria-hidden="true">
          <span className="travel-sun" />
          <span className="travel-hill hill-back" />
          <span className="travel-hill hill-front" />
          <span className="travel-path" />
          <span className="travel-stamp">GO<br />SLOW</span>
          <span className="travel-art-caption">somewhere new / someday</span>
        </div>
        <div className="travel-content">
          <p className="eyebrow">The world is calling · {active.index}</p>
          <h3>{active.eyebrow}</h3>
          <p className="travel-reflection" aria-live="polite">{active.text}</p>
          <div className="travel-tabs" role="group" aria-label="Explore travel aspirations">
            {exploration.themes.map((theme) => (
              <button
                type="button"
                key={theme.id}
                className={`travel-tab ${activeId === theme.id ? 'active' : ''}`}
                aria-pressed={activeId === theme.id}
                onClick={() => setActiveId(theme.id)}
              >
                <span>{theme.index}</span>
                {theme.title}
              </button>
            ))}
          </div>
          <span className="aspiration-label">DREAMS & POSSIBILITIES · NOT A TRAVEL LOG</span>
        </div>
      </div>
    </section>
  )
}

export function ProfessionalSection() {
  return (
    <section className="section story-section professional-section" id="building">
      <div className="professional-heading">
        <p className="eyebrow">Learning by making</p>
        <h2>{professional.heading}</h2>
        <p>{professional.introduction}</p>
      </div>
      <div className="professional-index">
        <p className="eyebrow">CURRENTLY IN MOTION</p>
        {professional.areas.map((area, index) => (
          <details className="learning-entry" key={area.label} open={index === 0}>
            <summary>
              <span className="entry-number">0{index + 1}</span>
              <span>{area.label}</span>
              <span className="entry-plus" aria-hidden="true">+</span>
            </summary>
            <ul>
              {area.value.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </details>
        ))}
        <p className="professional-footnote">{professional.note}</p>
      </div>
    </section>
  )
}

export function BecomingSection({ reducedMotion }) {
  const [activeId, setActiveId] = useState(growthQualities[0].id)
  const active = growthQualities.find((quality) => quality.id === activeId)

  return (
    <section className="section story-section becoming-section" id="growth">
      <div className="becoming-heading">
        <p className="eyebrow">An ongoing practice · My growth</p>
        <h2>{futureSelf.heading}</h2>
        <p>{futureSelf.introduction}</p>
        <p className="becoming-note">Not a scorecard. A set of directions I want to grow toward.</p>
      </div>

      <div className="becoming-layout">
        <div className="quality-list" role="group" aria-label="Qualities I am working toward">
          {growthQualities.map((quality, index) => (
            <button
              key={quality.id}
              type="button"
              className={`quality-button quality-${quality.color} ${activeId === quality.id ? 'active' : ''}`}
              aria-pressed={activeId === quality.id}
              onClick={() => setActiveId(quality.id)}
            >
              <span className="quality-index">0{index + 1}</span>
              <span>{quality.label}</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.article
            className={`quality-reflection quality-${active.color}`}
            key={active.id}
            initial={reducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: reducedMotion ? 0 : 0.22 }}
            aria-live="polite"
          >
            <p className="eyebrow">A quality in progress</p>
            <h3>{active.label}</h3>
            <dl>
              <div>
                <dt>What it means to me</dt>
                <dd>{active.meaning}</dd>
              </div>
              <div>
                <dt>Why I want to grow it</dt>
                <dd>{active.why}</dd>
              </div>
              <div>
                <dt>A way to practise</dt>
                <dd>{active.practice}</dd>
              </div>
            </dl>
          </motion.article>
        </AnimatePresence>
      </div>
    </section>
  )
}

export function FutureLetter({ reducedMotion }) {
  const [open, setOpen] = useState(false)

  return (
    <section className="section story-section letter-section" id="future">
      <div className="letter-heading">
        <p className="eyebrow">A page saved for later</p>
        <h2>{letter.heading}</h2>
        <p>For the version of me who has lived a little more of the story.</p>
      </div>
      <div className={`letter-stage ${open ? 'is-open' : ''}`}>
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              className="letter-envelope"
              type="button"
              key="envelope"
              onClick={() => setOpen(true)}
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, scale: 0.97 }}
              aria-label="Open my letter to my future self"
            >
              <span className="envelope-stamp">P</span>
              <span className="envelope-label">A NOTE FROM ME, TO ME</span>
              <span className="envelope-prompt">{letter.opener} <ArrowRight size={16} /></span>
            </motion.button>
          ) : (
            <motion.article
              className="future-letter-paper"
              key="letter"
              initial={reducedMotion ? false : { opacity: 0, rotateX: -8, y: 12 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.45 }}
              aria-live="polite"
            >
              <p className="letter-date">A LITTLE REMINDER FOR ANOTHER DAY</p>
              <div className="letter-copy">
                {letter.paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={paragraph}
                    initial={reducedMotion ? false : { opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: reducedMotion ? 0 : 0.12 + index * 0.11 }}
                    className={index === 0 ? 'letter-salutation' : ''}
                  >
                    {paragraph}
                  </motion.p>
                ))}
                <motion.p
                  className="letter-signature"
                  initial={reducedMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: reducedMotion ? 0 : 1.05 }}
                >
                  {letter.signature}
                </motion.p>
              </div>
              <button type="button" className="letter-close" onClick={() => setOpen(false)}>
                FOLD THE LETTER <span aria-hidden="true">↗</span>
              </button>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export function StoryClosing({ reducedMotion }) {
  const [showNote, setShowNote] = useState(false)

  return (
    <footer className="story-closing">
      <div className="closing-inner">
        <p className="eyebrow">The story keeps going</p>
        <h2>{closing.heading.split('\n').map((line) => <span key={line}>{line}</span>)}</h2>
        <p className="closing-supporting">{closing.supporting}</p>
        <button
          className="closing-note-button"
          type="button"
          aria-expanded={showNote}
          onClick={() => setShowNote((visible) => !visible)}
        >
          {showNote ? 'CLOSE THIS NOTE' : closing.button}
          <ArrowRight size={15} aria-hidden="true" />
        </button>
        <AnimatePresence>
          {showNote && (
            <motion.p
              className="closing-note-reveal"
              initial={reducedMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -5 }}
            >
              {closing.note}
            </motion.p>
          )}
        </AnimatePresence>
        <div className="closing-bottom">
          <a href="#top" className="story-logo closing-logo">
            <span className="story-monogram">{site.monogram}</span>
            <span>PARI · STORY NOTES</span>
          </a>
          <span>ONE CHAPTER, STILL IN PROGRESS.</span>
        </div>
      </div>
    </footer>
  )
}
