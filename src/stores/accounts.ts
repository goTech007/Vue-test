import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Account } from '@/types/account'

const STORAGE_KEY = 'accounts'

function loadFromStorage(): Account[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Account[]
  } catch {
    return []
  }
}

function saveToStorage(accounts: Account[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts))
}

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>(loadFromStorage())

  function addAccount() {
    const account: Account = {
      id: crypto.randomUUID(),
      labels: [],
      type: 'LDAP',
      login: '',
      password: null,
    }
    accounts.value.push(account)
  }

  function removeAccount(id: string) {
    accounts.value = accounts.value.filter((a) => a.id !== id)
    saveToStorage(accounts.value)
  }

  function saveAccount(updated: Account) {
    const index = accounts.value.findIndex((a) => a.id === updated.id)
    if (index !== -1) {
      accounts.value[index] = { ...updated }
      saveToStorage(accounts.value)
    }
  }

  return {
    accounts,
    addAccount,
    removeAccount,
    saveAccount,
  }
})
