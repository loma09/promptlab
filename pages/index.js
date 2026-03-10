import { useState } from 'react'
import Head from 'next/head'
import LandingScreen from '../components/LandingScreen'
import ChallengeScreen from '../components/ChallengeScreen'
import CompleteScreen from '../components/CompleteScreen'
import BattleScreen from '../components/BattleScreen'
import OptimizerScreen from '../components/OptimizerScreen'

export default function Home() {
  const [screen, setScreen] = useState('landing') // 'landing' | 'challenge' | 'complete' | 'battle' | 'optimizer'
  const [level, setLevel] = useState(null)
  const [completeData, setCompleteData] = useState(null)

  const handleSelectLevel = (lvl) => {
    if (lvl === 'battle') { setScreen('battle'); return }
    if (lvl === 'optimizer') { setScreen('optimizer'); return }
    setLevel(lvl)
    setScreen('challenge')
  }

  const handleComplete = (data) => {
    setCompleteData(data)
    setScreen('complete')
  }

  const handleHome = (nextLevel) => {
    if (nextLevel) {
      setLevel(nextLevel)
      setScreen('challenge')
    } else {
      setScreen('landing')
      setLevel(null)
    }
  }

  const handleRetry = () => {
    setScreen('challenge')
  }

  return (
    <>
      <Head>
        <title>PromptLab — Kuasai Prompt AI</title>
        <meta name="description" content="Platform latihan interaktif untuk menulis prompt AI yang efektif." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
      </Head>

      {screen === 'landing' && (
        <LandingScreen onSelectLevel={handleSelectLevel} />
      )}

      {screen === 'challenge' && level && (
        <ChallengeScreen
          level={level}
          onBack={() => setScreen('landing')}
          onComplete={handleComplete}
        />
      )}

      {screen === 'complete' && completeData && (
        <CompleteScreen
          data={completeData}
          onHome={handleHome}
          onRetry={handleRetry}
        />
      )}

      {screen === 'battle' && (
        <BattleScreen onBack={() => setScreen('landing')} />
      )}

      {screen === 'optimizer' && (
        <OptimizerScreen onBack={() => setScreen('landing')} />
      )}
    </>
  )
}