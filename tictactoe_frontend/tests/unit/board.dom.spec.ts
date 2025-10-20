//
// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-TEST-UI-008
// User Story: As a developer, I want a DOM test ensuring the board renders in a 3x3 grid.
// Acceptance Criteria: Board has 9 cells and a grid role/container is present.
// GxP Impact: YES (Validation evidence); UI structure verification
// Risk Level: LOW
// Validation Protocol: VP-TTT-TEST-UI-001
// ============================================================================

import { describe, it, expect } from 'vitest'
import { createApp, h } from 'vue'
import GameBoard from '../../components/GameBoard.vue'

/**
 * Mounts a component into a detached DOM node for simple structure checks
 */
function mountComponent(component: any, props: Record<string, any>) {
  const root = document.createElement('div')
  document.body.appendChild(root)
  const app = createApp({ render: () => h(component, props) })
  app.mount(root)
  return { app, root }
}

describe('GameBoard DOM', () => {
  it('renders 9 cells in a grid container', () => {
    const props = {
      board: ['', '', '', '', '', '', '', '', ''],
      currentPlayer: 'X',
      isGameOver: false,
      winner: null,
      winningLine: null,
    }
    const { root } = mountComponent(GameBoard, props)

    // Check grid container exists with role="grid"
    const grid = root.querySelector('[role="grid"]') as HTMLElement | null
    expect(grid).toBeTruthy()

    // Expect 9 gridcells
    const cells = root.querySelectorAll('[role="gridcell"]')
    expect(cells.length).toBe(9)

    // Ensure the component applied its board class
    expect(grid?.className).toContain('ttt-board')
  })
})
