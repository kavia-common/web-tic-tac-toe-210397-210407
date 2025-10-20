<!--
============================================================================
REQUIREMENT TRACEABILITY
============================================================================
Requirement ID: REQ-TTT-APP-001
User Story: As a user, I want to play Tic-Tac-Toe in browser with PvP/PvC modes.
Acceptance Criteria: Centered board, controls to change mode/starter, reset/new, audit log visible, accessibility
GxP Impact: NO - Local state only; includes audit hooks for future backend integration
Risk Level: LOW
Validation Protocol: VP-TTT-CORE-001
============================================================================
-->
<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold tracking-tight">Play</h2>
        <p class="text-sm text-gray-500">Choose mode, who starts, and begin.</p>
      </div>
      <div v-if="errorMessage" role="alert" class="text-sm px-3 py-2 rounded-md bg-red-50 text-red-700 border border-red-200">
        {{ errorMessage }}
      </div>
    </div>

    <ControlsPanel
      :mode="mode"
      :current-starter="starter"
      :current-player="currentPlayer"
      :is-game-over="isGameOver"
      @mode-change="onModeChange"
      @starter-change="onStarterChange"
      @new-game="handleNewGame"
      @reset="handleReset"
    />

    <div class="grid md:grid-cols-[1fr_320px] gap-6 items-start">
      <GameBoard
        :board="board"
        :current-player="currentPlayer"
        :is-game-over="isGameOver"
        :winner="winner"
        :winning-line="winningLine"
        @move="handleMove"
      />
      <AuditLog :items="audit.items" class="md:sticky md:top-24" />
    </div>
  </div>
</template>

<script setup lang="ts">
import GameBoard from '~/components/GameBoard.vue'
import ControlsPanel from '~/components/ControlsPanel.vue'
import AuditLog from '~/components/AuditLog.vue'
import { useGame, type Player, type Mode } from '~/composables/useGame'
import { useAudit } from '~/composables/useAudit'

// PUBLIC_INTERFACE
/**
 * Index page: orchestrates the game state and UI composition.
 * Handles error presentation and connects audit hooks.
 */
const audit = useAudit()
const {
  board,
  currentPlayer,
  isGameOver,
  winner,
  winningLine,
  mode,
  starter,
  errorMessage,
  newGame,
  resetGame,
  makeMove,
  setMode,
  setStarter,
} = useGame(audit)

function handleNewGame() {
  try {
    newGame()
  } catch (e: any) {
    // Graceful UI message; technical details could be sent to real audit later
    // eslint-disable-next-line no-console
    console.error('NEW_GAME error', e)
  }
}
function handleReset() {
  try {
    resetGame()
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error('RESET error', e)
  }
}
function handleMove(index: number) {
  try {
    makeMove(index)
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error('MOVE error', e)
  }
}
function onModeChange(next: Mode) {
  try {
    setMode(next)
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error('MODE_CHANGE error', e)
  }
}
function onStarterChange(next: Player) {
  try {
    setStarter(next)
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.error('STARTER_CHANGE error', e)
  }
}
</script>
