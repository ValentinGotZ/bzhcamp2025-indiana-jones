export interface Player {
  id: number
  firstname: string
  lastname: string
  email: string
  score: number
}

export type AddPlayer = Omit<Player, 'id' | 'score'>
