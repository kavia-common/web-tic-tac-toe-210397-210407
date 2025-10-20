<!--
============================================================================
REQUIREMENT TRACEABILITY
============================================================================
Requirement ID: REQ-TTT-UI-BOARD-002
User Story: As a user, I want a focusable, accessible 3x3 Tic-Tac-Toe board.
Acceptance Criteria: 3x3 grid, ARIA labels, keyboard navigation, focus ring
GxP Impact: NO - UI only
Risk Level: LOW
Validation Protocol: VP-TTT-UI-BOARD-001
============================================================================
-->
<template>
  <div class="w-full flex flex-col items-center gap-3" aria-label="Tic-Tac-Toe Game Area">
    <div class="text-sm text-gray-600">
      <span class="font-medium">Current:</span>
      <span
        :class="currentPlayer === 'X' ? 'inline-flex items-center gap-1 text-[var(--ttt-primary)]' : 'inline-flex items-center gap-1 text-[var(--ttt-secondary)]'"
        aria-live="polite"
      >
        <span class="sr-only">Current player:</span>
        <component
          :is="iconCmp(currentPlayer)"
          :aria-label="currentPlayer === 'X' ? 'Knight' : 'Queen'"
        />
      </span>
      <template v-if="isGameOver">
        <span> • </span>
        <span class="font-medium text-gray-700">Game Over</span>
        <span v-if="winner" class="inline-flex items-center gap-1">
          — Winner:
          <strong :class="winner === 'X' ? 'text-[var(--ttt-primary)]' : 'text-[var(--ttt-secondary)]'">
            <component
              :is="iconCmp(winner)"
              :aria-label="winner === 'X' ? 'Knight' : 'Queen'"
            />
          </strong>
        </span>
        <span v-else>— Draw</span>
      </template>
    </div>

    <div
      class="ttt-board grid grid-cols-3 gap-2"
      role="grid"
      aria-label="Board"
    >
      <button
        v-for="(cell, idx) in board"
        :key="idx"
        class="ttt-cell rounded-lg border border-gray-200 bg-[var(--ttt-surface)] shadow-sm hover:shadow-md transition-all flex items-center justify-center text-4xl sm:text-5xl"
        role="gridcell"
        :aria-label="getCellAria(idx, cell)"
        :aria-disabled="isGameOver || !!cell"
        :disabled="isGameOver || !!cell"
        @click="$emit('move', idx)"
        @keydown.enter.prevent="$emit('move', idx)"
        @keydown.space.prevent="$emit('move', idx)"
      >
        <template v-if="cell">
          <span class="sr-only">
            {{ cell === 'X' ? 'Knight marker' : 'Queen marker' }}
          </span>
          <span
            :class="cell === 'X' ? 'text-[var(--ttt-primary)]' : 'text-[var(--ttt-secondary)]'"
            aria-hidden="true"
          >
            <component :is="iconCmp(cell)" />
          </span>
        </template>
        <template v-else>
          <span class="text-gray-300" aria-hidden="true">•</span>
          <span class="sr-only">Empty cell</span>
        </template>
      </button>
    </div>

    <div v-if="winningLine && winningLine.length" class="text-xs text-gray-500">
      Winning line: {{ winningLine.join(', ') }}
    </div>
  </div>
</template>

<script setup lang="ts">
// PUBLIC_INTERFACE
/**
 * GameBoard renders a 3x3 grid of buttons for Tic-Tac-Toe.
 * Props:
 *  - board: Array<'X' | 'O' | ''>
 *  - currentPlayer: 'X' | 'O'
 *  - isGameOver: boolean
 *  - winner: 'X' | 'O' | null
 *  - winningLine?: number[] | null
 * Emits:
 *  - move(index: number)
 */
import { computed } from 'vue'
import { useIcons } from '~/composables/useIcons'

defineProps<{
  board: Array<'X' | 'O' | ''>,
  currentPlayer: 'X' | 'O',
  isGameOver: boolean,
  winner: 'X' | 'O' | null,
  winningLine?: number[] | null
}>()

defineEmits<{
  (e: 'move', index: number): void
}>()

const { KnightSVG, QueenSVG } = useIcons()

/**
 * Returns the icon component constructor for a marker.
 */
function iconCmp(val: 'X' | 'O') {
  return val === 'X' ? KnightSVG : QueenSVG
}

/**
 * Compose an accessible ARIA label for a cell.
 */
function getCellAria(idx: number, val: 'X' | 'O' | '' | null) {
  const row = Math.floor(idx / 3) + 1
  const col = (idx % 3) + 1
  const content = val ? `Cell with ${val === 'X' ? 'Knight' : 'Queen'}` : 'Empty cell'
  return `Row ${row}, Column ${col}, ${content}`
}
</script>

<style scoped>
/* Ensure the board is rendered as a 3x3 grid even if global resets try to override */
.ttt-board {
  display: grid !important;
  grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
  gap: 0.5rem; /* matches gap-2 */
  max-width: 20.5rem; /* constrain on small screens: 3 * 6.5rem + gaps */
}

@media (min-width: 640px) {
  .ttt-board {
    max-width: 25.5rem; /* 3 * 8.5rem + gaps for sm screens */
  }
}

/* Cells: keep square aspect ratio and responsive sizing */
.ttt-cell {
  width: 6.5rem;   /* ~w-26, between w-24 and w-28 for better fit */
  aspect-ratio: 1 / 1;
}

@media (min-width: 640px) {
  .ttt-cell {
    width: 8.5rem;
    aspect-ratio: 1 / 1;
  }
}

/* Defensive: if any global flex/column reset leaked, counteract it here */
.ttt-board > .ttt-cell {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
