export interface Player {
  id: number
  firstname: string
  lastname: string
  email: string
  score: number
  allowContact: boolean
}

export type AddPlayer = Omit<Player, 'id' | 'score'>
