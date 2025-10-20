<!--
============================================================================
REQUIREMENT TRACEABILITY
============================================================================
Requirement ID: REQ-TTT-UI-001
User Story: As a user, I want to play Tic-Tac-Toe with a professional themed UI.
Acceptance Criteria: Header/footer layout, centered board, modern theme, accessibility
GxP Impact: NO - Frontend-only, no persistent data; includes audit trail hooks
Risk Level: LOW
Validation Protocol: VP-TTT-UI-001
============================================================================
-->
<template>
  <div class="min-h-screen font-sans text-[var(--ttt-text)] bg-[var(--ttt-bg)]">
    <NuxtRouteAnnouncer />
    <header class="sticky top-0 z-10 bg-[var(--ttt-surface)]/90 backdrop-blur shadow-sm border-b border-gray-100">
      <div class="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 class="text-lg sm:text-xl font-semibold tracking-tight flex items-center gap-2">
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-[var(--ttt-primary)] shadow-[0_0_0_3px_rgba(37,99,235,0.15)]"></span>
          Ocean Tic‑Tac‑Toe
        </h1>
        <nav aria-label="Primary">
          <a href="https://nuxt.com" target="_blank" rel="noopener" class="text-sm text-gray-500 hover:text-[var(--ttt-primary)] transition-colors">Nuxt</a>
        </nav>
      </div>
      <div class="w-full h-16 bg-gradient-to-r from-blue-500/10 to-gray-50"></div>
    </header>

    <main class="max-w-4xl mx-auto px-4 -mt-12">
      <div class="bg-[var(--ttt-surface)] rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <section class="p-4 sm:p-6">
          <NuxtPage />
        </section>
      </div>
    </main>

    <footer class="max-w-4xl mx-auto px-4 py-6 text-center text-xs text-gray-500">
      <p>© <span>{{ year }}</span> Ocean Tic‑Tac‑Toe. All moves are locally audited for demo purposes.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// PUBLIC_INTERFACE
/**
 * Root App wrapper
 * Provides global theme CSS variables and base layout.
 */
const year = new Date().getFullYear()

// Explicitly import global CSS to ensure availability in all routes
import '~/assets/css/app.css'
</script>

<style>
/* Global theme variables (Ocean Professional) */
:root {
  --ttt-primary: #2563EB;
  --ttt-secondary: #F59E0B;
  --ttt-success: #F59E0B;
  --ttt-error: #EF4444;
  --ttt-bg: #f9fafb;
  --ttt-surface: #ffffff;
  --ttt-text: #111827;
  --ttt-focus: 0 0 0 3px rgba(37, 99, 235, 0.35);
}

/* Minimal resets and focus styles */
* { box-sizing: border-box; }
:focus-visible { outline: none; box-shadow: var(--ttt-focus); border-radius: 8px; }
button { cursor: pointer; }
</style>
