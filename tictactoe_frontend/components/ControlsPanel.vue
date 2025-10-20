<!--
============================================================================
REQUIREMENT TRACEABILITY
============================================================================
Requirement ID: REQ-TTT-UI-CTRL-003
User Story: As a user, I want to select mode and who starts, and reset the game.
Acceptance Criteria: Mode toggle, starter select, new/reset buttons, disabled states
GxP Impact: NO
Risk Level: LOW
Validation Protocol: VP-TTT-UI-CTRL-001
============================================================================
-->
<template>
  <div class="flex flex-wrap gap-3 items-center justify-between">
    <div class="flex flex-wrap gap-3 items-center">
      <label class="text-sm text-gray-600">Mode</label>
      <div role="group" aria-label="Game mode" class="inline-flex rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <button
          :aria-pressed="mode === 'PVP'"
          @click="$emit('mode-change', 'PVP')"
          class="px-3 py-2 text-sm transition-colors"
          :class="mode === 'PVP' ? 'bg-[var(--ttt-primary)] text-white' : 'bg-white hover:bg-gray-50 text-gray-700'"
        >
          PvP
        </button>
        <button
          :aria-pressed="mode === 'PVC'"
          @click="$emit('mode-change', 'PVC')"
          class="px-3 py-2 text-sm transition-colors"
          :class="mode === 'PVC' ? 'bg-[var(--ttt-primary)] text-white' : 'bg-white hover:bg-gray-50 text-gray-700'"
        >
          PvC
        </button>
      </div>

      <label class="text-sm text-gray-600">Starter</label>
      <select
        :value="currentStarter"
        @change="onStarterChange"
        aria-label="Starting player"
        class="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-200"
      >
        <option value="X">X</option>
        <option value="O">O</option>
      </select>
    </div>

    <div class="flex gap-2">
      <button
        class="px-3 py-2 text-sm rounded-lg bg-[var(--ttt-primary)] text-white shadow hover:shadow-md transition"
        @click="$emit('new-game')"
        aria-label="Start new game"
      >
        New Game
      </button>
      <button
        class="px-3 py-2 text-sm rounded-lg bg-white text-gray-700 border border-gray-200 shadow-sm hover:bg-gray-50 transition disabled:opacity-60"
        :disabled="!isGameOver"
        @click="$emit('reset')"
        aria-label="Reset game"
        :title="isGameOver ? 'Reset board' : 'Available when game completed'"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// PUBLIC_INTERFACE
/**
 * ControlsPanel allows selecting game mode and starter, and triggers control actions.
 */
defineProps<{
  mode: 'PVP' | 'PVC',
  currentStarter: 'X' | 'O',
  currentPlayer: 'X' | 'O',
  isGameOver: boolean
}>()

const emit = defineEmits<{
  (e: 'mode-change', value: 'PVP' | 'PVC'): void
  (e: 'starter-change', value: 'X' | 'O'): void
  (e: 'new-game'): void
  (e: 'reset'): void
}>()

function onStarterChange(e: Event) {
  const target = e.target as HTMLSelectElement
  const val = target.value === 'O' ? 'O' : 'X'
  emit('starter-change', val)
}
</script>
