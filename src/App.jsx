import {
  AboutCollage,
  BecomingSection,
  ExplorationSection,
  FutureLetter,
  ProfessionalSection,
  StoryClosing,
  StoryHero,
  StoryNavigation,
} from './components/StoryExperience'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import './styles/story.css'

export default function App() {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <div className="story-shell">
      <a className="story-skip-link" href="#about">Skip to my story</a>
      <StoryNavigation />
      <main>
        <StoryHero reducedMotion={reducedMotion} />
        <AboutCollage reducedMotion={reducedMotion} />
        <ExplorationSection />
        <ProfessionalSection />
        <BecomingSection reducedMotion={reducedMotion} />
        <FutureLetter reducedMotion={reducedMotion} />
      </main>
      <StoryClosing reducedMotion={reducedMotion} />
    </div>
  )
}
