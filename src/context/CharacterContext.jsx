import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  GROWTH_PER_FEED,
  getGrowthProgress,
  getStageByGrowth,
} from '../data/characterStages'
import { CharacterContext } from './character-state'

const STORAGE_KEY = 'localpath_character'

const DEFAULT_STATE = {
  name: '망둥이',
  hunger: 65,
  thirst: 60,
  happiness: 70,
  growth: 0,
  feedCount: 0,
  lastFedAt: null,
  lastUpdatedAt: Date.now(),
}

function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value))
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_STATE
    return { ...DEFAULT_STATE, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_STATE
  }
}

function applyDecay(state) {
  const now = Date.now()
  const hours = (now - (state.lastUpdatedAt || now)) / (1000 * 60 * 60)
  if (hours < 0.5) return state

  const decay = Math.floor(hours * 3)
  return {
    ...state,
    hunger: clamp(state.hunger - decay),
    thirst: clamp(state.thirst - decay),
    happiness: clamp(state.happiness - Math.floor(decay * 0.8)),
    lastUpdatedAt: now,
  }
}

export function CharacterProvider({ children }) {
  const [character, setCharacter] = useState(() => applyDecay(loadState()))

  const persist = useCallback((next) => {
    const withTime = { ...next, lastUpdatedAt: Date.now() }
    setCharacter(withTime)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(withTime))
    return withTime
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setCharacter((prev) => {
        const next = applyDecay(prev)
        if (next.lastUpdatedAt === prev.lastUpdatedAt) return prev
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
        return next
      })
    }, 60_000)
    return () => clearInterval(id)
  }, [])

  const feedWithReceipt = useCallback(
    (zone) => {
      const bonus = zone.bonus
      persist({
        ...character,
        hunger: clamp(character.hunger + bonus.hunger),
        thirst: clamp(character.thirst + bonus.thirst),
        happiness: clamp(character.happiness + bonus.happiness),
        growth: character.growth + GROWTH_PER_FEED,
        feedCount: character.feedCount + 1,
        lastFedAt: Date.now(),
      })
    },
    [character, persist],
  )

  const stage = useMemo(
    () => getStageByGrowth(character.growth),
    [character.growth],
  )
  const growthProgress = useMemo(
    () => getGrowthProgress(character.growth),
    [character.growth],
  )

  const value = useMemo(
    () => ({
      character,
      stage,
      growthProgress,
      feedWithReceipt,
    }),
    [character, stage, growthProgress, feedWithReceipt],
  )

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  )
}
