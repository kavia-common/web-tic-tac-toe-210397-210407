//
// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-LOGIC-006
// User Story: As a player, I want correct game logic, PvP/PvC, with AI making moves.
// Acceptance Criteria: Valid moves only, correct win/draw detection, AI acts in PVC, controls to reset/new/mode/starter
// GxP Impact: NO (UI logic); includes validation and audit hooks
// Risk Level: LOW
// Validation Protocol: VP-TTT-LOGIC-001
// ============================================================================

import { computed, ref, watch } from 'vue'

export type Player = 'X' | 'O'
export type Mode = 'PVP' | 'PVC'

export interface AuditHook {
  log: (item: { action: 'NEW_GAME' | 'MOVE' | 'RESET' | 'MODE_CHANGE' | 'STARTER_CHANGE' | 'ERROR'; details?: string; before?: unknown; after?: unknown }) => void
}

// PUBLIC_INTERFACE
/**
 * useGame: Provides game state and operations with validation and audit logging.
 */
export function useGame(audit?: AuditHook) {
  const board = ref<Array<Player | ''>>(['', '', '', '', '', '', '', '', ''])
  const currentPlayer = ref<Player>('X')
  const starter = ref<Player>('X')
  const mode = ref<Mode>('PVP')
  const errorMessage = ref<string>('')

  const winner = computed<Player | null>(() => calculateWinner(board.value).winner)
  const winningLine = computed<number[] | null>(() => calculateWinner(board.value).line)
  const isGameOver = computed<boolean>(() => !!winner.value || board.value.every(c => c !== ''))

  // Watcher to let AI move automatically in PVC mode
  watch([mode, currentPlayer, isGameOver], () => {
    if (mode.value === 'PVC' && !isGameOver.value) {
      const aiPlayer: Player = starter.value === 'X' ? 'O' : 'X'
      if (currentPlayer.value === aiPlayer) {
        // Defer AI to next tick to keep UI responsive
        setTimeout(() => {
          const idx = chooseAIMove(board.value, aiPlayer)
          if (idx !== -1) {
            try {
              internalMakeMove(idx)
            } catch (e) {
              // eslint-disable-next-line no-console
              console.error('AI move error', e)
              audit?.log({ action: 'ERROR', details: 'AI move failed', before: null, after: null })
            }
          }
        }, 60)
      }
    }
  })

  // PUBLIC_INTERFACE
  /** Start a new game and keep settings (mode/starter). */
  function newGame() {
    const before = { board: [...board.value], currentPlayer: currentPlayer.value }
    board.value = Array(9).fill('')
    currentPlayer.value = starter.value
    errorMessage.value = ''
    audit?.log({ action: 'NEW_GAME', details: `starter=${starter.value}, mode=${mode.value}`, before, after: { board: [...board.value], currentPlayer: currentPlayer.value } })
  }

  // PUBLIC_INTERFACE
  /** Reset only after completion to demonstrate validation. */
  function resetGame() {
    if (!isGameOver.value) {
      const msg = 'Cannot reset before the game is finished.'
      errorMessage.value = msg
      audit?.log({ action: 'ERROR', details: msg })
      return
    }
    const before = { board: [...board.value], currentPlayer: currentPlayer.value }
    board.value = Array(9).fill('')
    currentPlayer.value = starter.value
    errorMessage.value = ''
    audit?.log({ action: 'RESET', details: 'Board cleared', before, after: { board: [...board.value], currentPlayer: currentPlayer.value } })
  }

  // PUBLIC_INTERFACE
  /** Change mode with basic validation guard */
  function setMode(next: Mode) {
    if (next !== 'PVP' && next !== 'PVC') {
      const msg = 'Invalid mode selection.'
      errorMessage.value = msg
      audit?.log({ action: 'ERROR', details: msg })
      return
    }
    const before = { mode: mode.value }
    mode.value = next
    errorMessage.value = ''
    audit?.log({ action: 'MODE_CHANGE', details: `mode=${next}`, before, after: { mode: mode.value } })
    // If PVC and AI starts, trigger new game to reflect starter
    if (mode.value === 'PVC') {
      // keep existing board; user can press New Game
    }
  }

  // PUBLIC_INTERFACE
  /** Change starting player */
  function setStarter(next: Player) {
    if (next !== 'X' && next !== 'O') {
      const msg = 'Invalid starter selection.'
      errorMessage.value = msg
      audit?.log({ action: 'ERROR', details: msg })
      return
    }
    const before = { starter: starter.value }
    starter.value = next
    errorMessage.value = ''
    audit?.log({ action: 'STARTER_CHANGE', details: `starter=${next}`, before, after: { starter: starter.value } })
    // Do not immediately restart; user uses New Game
  }

  // PUBLIC_INTERFACE
  /** Attempt to make a move at index with validation */
  function makeMove(index: number) {
    if (typeof index !== 'number' || index < 0 || index > 8) {
      const msg = 'Invalid move index.'
      errorMessage.value = msg
      audit?.log({ action: 'ERROR', details: msg })
      return
    }
    return internalMakeMove(index)
  }

  function internalMakeMove(index: number) {
    if (isGameOver.value) {
      const msg = 'Game is already completed.'
      errorMessage.value = msg
      audit?.log({ action: 'ERROR', details: msg })
      return
    }
    if (board.value[index] !== '') {
      const msg = 'Cell is already occupied.'
      errorMessage.value = msg
      audit?.log({ action: 'ERROR', details: msg })
      return
    }
    const before = { board: [...board.value], currentPlayer: currentPlayer.value }
    board.value[index] = currentPlayer.value
    audit?.log({ action: 'MOVE', details: `player=${currentPlayer.value}, index=${index}`, before, after: { board: [...board.value] } })
    if (!calculateWinner(board.value).winner && !board.value.every(c => c !== '')) {
      // Switch player
      currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X'
    }
  }

  return {
    // state
    board,
    currentPlayer,
    starter,
    mode,
    errorMessage,
    // derived
    winner,
    winningLine,
    isGameOver,
    // actions
    newGame,
    resetGame,
    makeMove,
    setMode,
    setStarter,
  }
}

// PUBLIC_INTERFACE
/** Determine if there's a winner on the given board. */
export function calculateWinner(b: Array<Player | ''>): { winner: Player | null; line: number[] | null } {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6],         // diags
  ]
  for (const [a,b2,c] of lines) {
    if (b[a] && b[a] === b[b2] && b[a] === b[c]) {
      return { winner: b[a] as Player, line: [a,b2,c] }
    }
  }
  return { winner: null, line: null }
}

// PUBLIC_INTERFACE
/**
 * Simple AI: tries to win, then block, else pick center/corners/sides heuristically.
 */
export function chooseAIMove(b: Array<Player | ''>, ai: Player): number {
  const human: Player = ai === 'X' ? 'O' : 'X'
  const empties = b.map((v, i) => v === '' ? i : -1).filter(i => i >= 0)

  // Try to win
  for (const i of empties) {
    const clone = [...b]
    clone[i] = ai
    if (calculateWinner(clone).winner === ai) return i
  }
  // Block human
  for (const i of empties) {
    const clone = [...b]
    clone[i] = human
    if (calculateWinner(clone).winner === human) return i
  }
  // Center
  if (b[4] === '') return 4
  // Corners
  const corners = [0,2,6,8].filter(i => b[i] === '')
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)]
  // Sides
  return empties.length ? empties[Math.floor(Math.random() * empties.length)] : -1
}
