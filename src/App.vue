<script setup lang="ts">
import AccountForm from '@/components/AccountForm.vue'
</script>

<template>
  <div id="app-root">
    <AccountForm />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
  background-color: #f5f7fa;
}

#app-root {
  min-height: 100vh;
  padding: 32px 16px;
}
</style>
