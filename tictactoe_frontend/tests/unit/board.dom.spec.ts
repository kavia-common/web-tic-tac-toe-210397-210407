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

  it('renders a Knight icon when X occupies a cell', () => {
    const props = {
      board: ['X', '', '', '', '', '', '', '', ''],
      currentPlayer: 'O',
      isGameOver: false,
      winner: null,
      winningLine: null,
    }
    const { root } = mountComponent(GameBoard, props)
    const knight = root.querySelector('[data-marker="X"][data-icon="knight"]') as SVGElement | null
    expect(knight).toBeTruthy()
  })

  it('renders a Queen icon when O occupies a cell', () => {
    const props = {
      board: ['', 'O', '', '', '', '', '', '', ''],
      currentPlayer: 'X',
      isGameOver: false,
      winner: null,
      winningLine: null,
    }
    const { root } = mountComponent(GameBoard, props)
    const queen = root.querySelector('[data-marker="O"][data-icon="queen"]') as SVGElement | null
    expect(queen).toBeTruthy()
  })
})
