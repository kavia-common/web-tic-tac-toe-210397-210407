<!--
============================================================================
REQUIREMENT TRACEABILITY
============================================================================
Requirement ID: REQ-TTT-AUDIT-004
User Story: As a QA reviewer, I want to see an audit trail of user actions.
Acceptance Criteria: Displays action, time, user, and minimal metadata
GxP Impact: YES (Demonstration hooks) - Not persistent in this demo
Risk Level: LOW
Validation Protocol: VP-TTT-AUDIT-001
============================================================================
-->
<template>
  <aside class="w-full bg-white border border-gray-100 rounded-lg shadow-sm">
    <header class="px-3 py-2 border-b border-gray-100 flex items-center justify-between">
      <h3 class="text-sm font-medium">Audit Trail</h3>
      <span class="text-xs text-gray-500">{{ items.length }} events</span>
    </header>
    <ul class="max-h-80 overflow-auto divide-y divide-gray-100">
      <li v-for="(item, i) in items" :key="i" class="px-3 py-2 text-xs">
        <div class="flex justify-between">
          <span class="font-semibold" :class="colorByAction(item.action)">{{ item.action }}</span>
          <span class="text-gray-500">{{ item.timestamp }}</span>
        </div>
        <div class="text-gray-600">
          <span>User: {{ item.userId }}</span>
          <span v-if="item.details"> • {{ item.details }}</span>
        </div>
      </li>
      <li v-if="items.length === 0" class="px-3 py-4 text-center text-xs text-gray-500">No audit events yet.</li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
// PUBLIC_INTERFACE
/**
 * AuditLog: presents audit entries for user visibility.
 */
export interface AuditItem {
  action: 'NEW_GAME' | 'MOVE' | 'RESET' | 'MODE_CHANGE' | 'STARTER_CHANGE' | 'ERROR'
  timestamp: string
  userId: string
  before?: unknown
  after?: unknown
  details?: string
}

defineProps<{
  items: AuditItem[]
}>()

function colorByAction(action: AuditItem['action']) {
  if (action === 'ERROR') return 'text-[var(--ttt-error)]'
  if (action === 'MOVE') return 'text-[var(--ttt-primary)]'
  if (action === 'MODE_CHANGE' || action === 'STARTER_CHANGE') return 'text-[var(--ttt-secondary)]'
  return 'text-gray-700'
}
</script>
