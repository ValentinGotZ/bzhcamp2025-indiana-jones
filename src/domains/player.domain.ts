export interface Player {
  firstname: string
  lastname: string
  email: string
  score: number
  allowContact: boolean
}

export type AddPlayer = Omit<Player, 'score'>
