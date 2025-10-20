//
// ============================================================================
// REQUIREMENT TRACEABILITY
// ============================================================================
// Requirement ID: REQ-TTT-AUDIT-COMPOSABLE-005
// User Story: As a developer, I need an audit hook to log user actions.
// Acceptance Criteria: Captures action, timestamp (ISO), pseudo user id, optional before/after
// GxP Impact: YES (Hook pattern); This demo stores in-memory only.
// Risk Level: LOW
// Validation Protocol: VP-TTT-AUDIT-COMPOSABLE-001
// ============================================================================

import { ref } from 'vue'
import type { AuditItem } from '~/components/AuditLog.vue'

// PUBLIC_INTERFACE
export function useAudit() {
  /** Pseudo user id; replace with real auth context in production */
  const userId = ref<string>(`user-${Math.floor(Math.random() * 1000)}`)

  /** Local in-memory items for display */
  const items = ref<AuditItem[]>([])

  // PUBLIC_INTERFACE
  /**
   * Log an audit action with metadata. In a real app, forward to backend.
   * @param item Partial audit payload
   */
  function log(item: Omit<AuditItem, 'timestamp' | 'userId'>) {
    const entry: AuditItem = {
      ...item,
      timestamp: new Date().toISOString(),
      userId: userId.value,
    }
    items.value.unshift(entry)
    // Console for developer visibility (contemporaneous logging)
    // eslint-disable-next-line no-console
    console.log('[AUDIT]', entry)
  }

  return {
    userId,
    items,
    log,
  }
}
