import type { AddPlayer, Player } from '@/domains/player.domain.ts'
import { DatabaseService } from '@/services/database.service.ts'

const TABLE = 'player'

export const usePlayer = () => {
  let db: IDBDatabase | null = null

  // Ouvrir une connexion à la base de données
  const openDB = async (): Promise<IDBDatabase> => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DatabaseService.NAME, 1)

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        db = (event.target as IDBOpenDBRequest).result

        const playerTable = db.createObjectStore(TABLE, { keyPath: 'id', autoIncrement: true })
        playerTable.createIndex('firstname', 'firstname', { unique: false })
        playerTable.createIndex('lastname', 'lastname', { unique: false })
        playerTable.createIndex('email', 'email', { unique: true })
        playerTable.createIndex('score', 'score', { unique: false })
        playerTable.createIndex('allowContact', 'allowContact', { unique: false })
      }

      request.onsuccess = (event) => {
        db = (event.target as IDBOpenDBRequest).result
        resolve(db)
      }

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error)
      }
    })
  }

  // Ajouter un joueur
  const addPlayer = async (player: AddPlayer): Promise<number> => {
    if (!db) {
      db = await openDB()
    }

    return new Promise((resolve, reject) => {
      const transaction = db!.transaction([TABLE], 'readwrite')
      const objectStore = transaction.objectStore(TABLE)

      const request = objectStore.add(player)
      request.onsuccess = (event) => {
        resolve((event.target as IDBRequest<number>)?.result)
      }

      request.onerror = (event) => {
        reject((event.target as IDBOpenDBRequest).error)
      }
    })
  }

  // Lire un joueur par son id
  const getPlayerById = async (id: number): Promise<Player | null> => {
    if (!db) {
      db = await openDB()
    }

    return new Promise((resolve, reject) => {
      const transaction = db!.transaction([TABLE], 'readonly')
      const objectStore = transaction.objectStore(TABLE)

      const request = objectStore.get(id)
      request.onsuccess = (event) => {
        resolve((event.target as IDBRequest<Player>).result)
      }

      request.onerror = (event) => {
        reject((event as ErrorEvent).error)
      }
    })
  }

  const getAllPlayers = async (): Promise<Player[]> => {
    if (!db) {
      db = await openDB()
    }
    return new Promise((resolve, reject) => {
      const transaction = db!.transaction([TABLE], 'readonly')
      const objectStore = transaction.objectStore(TABLE)

      const request = objectStore.getAll()
      request.onsuccess = (event) => {
        const players: Player[] = (event.target as IDBRequest<Player[]>).result

        resolve(players.filter((player) => !!player.score).sort((a, b) => b.score - a.score))
      }

      request.onerror = (event: Event) => {
        reject((event as ErrorEvent).error)
      }
    })
  }

  // Mettre à jour un joueur
  const updatePlayer = async (player: Partial<Player>): Promise<void> => {
    if (!db) {
      db = await openDB()
    }
    return new Promise((resolve, reject) => {
      const transaction = db!.transaction([TABLE], 'readwrite')
      const objectStore = transaction.objectStore(TABLE)

      const request = objectStore.put(player)
      request.onsuccess = () => {
        resolve()
      }

      request.onerror = (event: Event) => {
        reject((event as ErrorEvent).error)
      }
    })
  }

  return {
    addPlayer,
    getPlayerById,
    getAllPlayers,
    updatePlayer,
  }
}
