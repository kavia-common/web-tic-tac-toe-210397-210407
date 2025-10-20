//
// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-TEST-007
// User Story: As a developer, I want unit tests for win detection and invalid moves.
// Acceptance Criteria: Tests pass locally; cover win/draw and invalid move prevention and AI selection
// GxP Impact: YES (Validation evidence); scope limited to frontend logic
// Risk Level: LOW
// Validation Protocol: VP-TTT-TEST-001
// ============================================================================

import { describe, it, expect } from 'vitest'
import { calculateWinner, chooseAIMove, type Player } from '../../composables/useGame'

describe('calculateWinner', () => {
  it('detects row winner', () => {
    const b: Array<Player | ''> = ['X','X','X','','','','','','']
    const res = calculateWinner(b)
    expect(res.winner).toBe('X')
    expect(res.line).toEqual([0,1,2])
  })

  it('detects diagonal winner', () => {
    const b: Array<Player | ''> = ['O','','','','O','','','','O']
    const res = calculateWinner(b)
    expect(res.winner).toBe('O')
    expect(res.line).toEqual([0,4,8])
  })

  it('returns null when no winner', () => {
    const b: Array<Player | ''> = ['X','O','X','X','O','O','O','X','X']
    const res = calculateWinner(b)
    expect(res.winner).toBeNull()
    expect(res.line).toBeNull()
  })
})

describe('chooseAIMove', () => {
  it('wins when possible', () => {
    const b: Array<Player | ''> = ['X','X','','','','','','','']
    const idx = chooseAIMove(b, 'X')
    expect(idx).toBe(2)
  })

  it('blocks opponent win', () => {
    const b: Array<Player | ''> = ['O','O','','','','','','','']
    const idx = chooseAIMove(b, 'X')
    expect(idx).toBe(2)
  })

  it('chooses center when free', () => {
    const b: Array<Player | ''> = ['','','','','','','','','']
    const idx = chooseAIMove(b, 'X')
    expect(idx).toBe(4)
  })
})
