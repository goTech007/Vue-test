<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { ElInput, ElSelect, ElOption, ElButton } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import type { Account, AccountType, LabelItem } from '@/types/account'

const props = defineProps<{
  account: Account
}>()

const emit = defineEmits<{
  save: [account: Account]
  remove: [id: string]
}>()

const labelText = ref(props.account.labels.map((l) => l.text).join('; '))
const type = ref<AccountType>(props.account.type)
const login = ref(props.account.login)
const password = ref(props.account.password ?? '')

const loginInvalid = ref(false)
const passwordInvalid = ref(false)

const showPassword = computed(() => type.value === 'local')

function parseLabelText(text: string): LabelItem[] {
  return text
    .split(';')
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map((s) => ({ text: s }))
}

function buildAccount(): Account {
  return {
    id: props.account.id,
    labels: parseLabelText(labelText.value),
    type: type.value,
    login: login.value,
    password: type.value === 'LDAP' ? null : password.value,
  }
}

function validate(): boolean {
  let valid = true

  loginInvalid.value = login.value.trim().length === 0
  if (loginInvalid.value) valid = false

  if (showPassword.value) {
    passwordInvalid.value = password.value.trim().length === 0
    if (passwordInvalid.value) valid = false
  } else {
    passwordInvalid.value = false
  }

  return valid
}

function handleBlurOrChange() {
  if (validate()) {
    emit('save', buildAccount())
  }
}

watch(type, () => {
  if (type.value === 'LDAP') {
    password.value = ''
    passwordInvalid.value = false
  }
  handleBlurOrChange()
})
</script>

<template>
  <div class="account-item">
    <div class="field">
      <ElInput
        v-model="labelText"
        type="textarea"
        :autosize="{ minRows: 1, maxRows: 5 }"
        placeholder="метка1; метка2; метка3"
        :maxlength="50"
        @blur="handleBlurOrChange"
      />
    </div>

    <div class="field field-type">
      <ElSelect v-model="type" style="width: 100%">
        <ElOption label="LDAP" value="LDAP" />
        <ElOption label="Локальная" value="local" />
      </ElSelect>
    </div>

    <div class="field" :class="{ 'field-login-extended': !showPassword }">
      <ElInput
        v-model="login"
        placeholder="Введите логин"
        :maxlength="100"
        :class="{ 'is-error': loginInvalid }"
        @blur="handleBlurOrChange"
      />
    </div>

    <div v-if="showPassword" class="field">
      <ElInput
        v-model="password"
        type="password"
        placeholder="Введите пароль"
        :maxlength="100"
        show-password
        :class="{ 'is-error': passwordInvalid }"
        @blur="handleBlurOrChange"
      />
    </div>

    <div class="col-action">
      <ElButton
        type="danger"
        :icon="Delete"
        circle
        @click="emit('remove', props.account.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.account-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.field {
  flex: 1;
  min-width: 0;
}

.field-login-extended {
  /* Take space of both login + password columns including the gap between them */
  flex: 2 0 calc(12px);
}

.field-type {
  flex: 0 0 150px;
}

.col-action {
  flex: 0 0 32px;
}

:deep(.is-error .el-input__wrapper) {
  box-shadow: 0 0 0 1px var(--el-color-danger) inset;
}
</style>
