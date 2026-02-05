export interface LabelItem {
  text: string
}

export type AccountType = 'LDAP' | 'local'

export interface Account {
  id: string
  labels: LabelItem[]
  type: AccountType
  login: string
  password: string | null
}
