//
// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-UI-ICON-009
// User Story: As a user, I want player markers to be chess icons for a more polished look.
// Acceptance Criteria: Inline SVG Knight for X, Queen for O, accessible labels, no external deps.
// GxP Impact: NO - Presentation only
// Risk Level: LOW
// Validation Protocol: VP-TTT-UI-ICON-001
// ============================================================================
//
// IMPORTS AND DEPENDENCIES
// None; inline SVGs avoid external dependencies.
//

import { h } from 'vue'

export type Marker = 'X' | 'O'

// PUBLIC_INTERFACE
/**
 * Returns VNodes for chess icons mapped by marker.
 * Knight for 'X' and Queen for 'O'.
 * Icons are inline SVG with data-marker and data-icon attributes for testing.
 */
export function useIcons() {
  // Shared base props for icons to ensure consistent sizing and theme contrast.
  const baseSvgProps = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    focusable: 'false',
    'aria-hidden': 'true',
    width: '1em',
    height: '1em',
    // Using currentColor allows icon color to be controlled by text color classes
    fill: 'currentColor',
  }

  /**
   * Knight icon (horse) - stylized, readable at small sizes
   * Source: custom simplified path oriented for clarity.
   */
  function KnightSVG(marker: Marker = 'X') {
    return h(
      'svg',
      { ...baseSvgProps, 'data-marker': marker, 'data-icon': 'knight', role: 'img' },
      [
        // Minimal knight silhouette
        h('path', {
          d: 'M6 19h12v-2h-1.5l.7-2.1c.53-1.6.8-2.4.8-3.4 0-3.3-2.8-6.5-6.5-6.5-1.1 0-2.2.3-3.2.8l-1.8.9c-.3.2-.5.5-.5.9v1.7l2.3 1.5c.4.2.7.7.7 1.2 0 .7-.6 1.3-1.3 1.3H6.5c-.3 0-.5.2-.5.5v1.2c0 .2.1.4.3.5l1.9 1.2-.7 2.3H6v2zM14.5 9.2c.44 0 .8.36.8.8s-.36.8-.8.8-.8-.36-.8-.8.36-.8.8-.8z',
        }),
      ],
    )
  }

  /**
   * Queen icon (crown) - clean silhouette recognizable at small sizes
   */
  function QueenSVG(marker: Marker = 'O') {
    return h(
      'svg',
      { ...baseSvgProps, 'data-marker': marker, 'data-icon': 'queen', role: 'img' },
      [
        // Crown base and points
        h('path', {
          d: 'M4 17.5c0-.3.2-.6.5-.7l3.8-1.9 2.1 2.3c.4.4 1.1.4 1.5 0l2.1-2.3 3.8 1.9c.3.1.5.4.5.7V19c0 .6-.4 1-1 1H5c-.6 0-1-.4-1-1v-1.5zM6.8 8.7l-2.3 3.2c-.3.4-.1 1 .4 1.1l3.6.9 2-3.5-2.1-1.7c-.5-.4-1.2-.3-1.6.1zM12 6c.8 0 1.5.7 1.5 1.5S12.8 9 12 9s-1.5-.7-1.5-1.5S11.2 6 12 6zm5.2 2.7c-.4-.4-1.1-.5-1.6-.1l-2.1 1.7 2 3.5 3.6-.9c.5-.1.7-.7.4-1.1l-2.3-3.2z',
        }),
      ],
    )
  }

  // PUBLIC_INTERFACE
  /**
   * Render icon by marker, applying color classes externally via parent.
   */
  function renderIcon(marker: Marker) {
    return marker === 'X' ? KnightSVG('X') : QueenSVG('O')
  }

  return {
    KnightSVG,
    QueenSVG,
    renderIcon,
  }
}
