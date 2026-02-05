<script setup lang="ts">
import { ElButton } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useAccountsStore } from '@/stores/accounts'
import AccountItem from '@/components/AccountItem.vue'
import type { Account } from '@/types/account'

const store = useAccountsStore()

function handleSave(account: Account) {
  store.saveAccount(account)
}

function handleRemove(id: string) {
  store.removeAccount(id)
}
</script>

<template>
  <div class="account-form">
    <div class="form-header">
      <h2>Управление записи</h2>
      <ElButton type="primary" :icon="Plus" circle @click="store.addAccount()" />
    </div>

    <p class="label-hint">
      Поле «Метка» принимает несколько текстовых меток, разделённых знаком (<code>;</code>).
    </p>

    <div class="accounts-card">
      <div class="table-header">
        <span class="col">Метка</span>
        <span class="col col-type">Тип записи</span>
        <span class="col">Логин</span>
        <span class="col col-password">Пароль</span>
        <span class="col-action"></span>
      </div>

      <div v-if="store.accounts.length === 0" class="empty-state">
        Учетных записей пока нет. Нажмите «+», чтобы добавить.
      </div>

      <TransitionGroup name="list" tag="div" class="accounts-list">
        <AccountItem
          v-for="account in store.accounts"
          :key="account.id"
          :account="account"
          @save="handleSave"
          @remove="handleRemove"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.account-form {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px;
}

.form-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.form-header h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
}

.label-hint {
  color: var(--el-text-color-secondary);
  font-size: 13px;
  margin: 0 0 20px 0;
}

.label-hint code {
  background: var(--el-fill-color-light);
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 13px;
}

.empty-state {
  text-align: center;
  padding: 40px 0;
  color: var(--el-text-color-placeholder);
  font-size: 14px;
}

.accounts-card {
  border: 1px solid var(--el-border-color-light);
  border-radius: 8px;
  background: var(--el-bg-color);
  padding: 16px;
}

.table-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 10px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.table-header .col {
  flex: 1;
  min-width: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--el-text-color-secondary);
}

.table-header .col-type {
  flex: 0 0 150px;
}

.table-header .col-password {
  flex: 1;
}

.table-header .col-action {
  flex: 0 0 32px;
}

.accounts-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
