import { mockSupabase } from './mockSupabase'

export function createClient() {
  return mockSupabase as any
}
