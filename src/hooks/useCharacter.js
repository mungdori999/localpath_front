import { useContext } from 'react'
import { CharacterContext } from '../context/character-state'

export function useCharacter() {
  const ctx = useContext(CharacterContext)
  if (!ctx) {
    throw new Error('useCharacter must be used within CharacterProvider')
  }
  return ctx
}
