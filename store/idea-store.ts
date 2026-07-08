import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import data from '@/data.json'
import { createId } from '@/lib/id'

const categoryKeys = [
  'genres', 'gameplay', 'graphics', 'dimension',
  'setting', 'objective', 'story', 'progression',
  'gameLoop', 'hook', 'audience', 'scope',
] as const

export type CategoryKey = typeof categoryKeys[number]
export type IdeaState = Record<CategoryKey, string>

export interface SavedIdea {
  id: string
  idea: IdeaState
  createdAt: number
  favorited: boolean
}

const labels: Record<CategoryKey, string> = {
  genres: 'GENRE', gameplay: 'GAMEPLAY', graphics: 'GRAPHICS',
  dimension: 'CAMERA', setting: 'SETTING', objective: 'OBJECTIVE',
  story: 'STORY', progression: 'PROGRESSION', gameLoop: 'CORE LOOP',
  hook: 'HOOK', audience: 'AUDIENCE', scope: 'SCOPE',
}

function randomItem(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function generateIdea(): IdeaState {
  const idea = {} as IdeaState
  for (const key of categoryKeys) {
    const arr = data[key as keyof typeof data] as string[]
    idea[key as CategoryKey] = randomItem(arr)
  }
  return idea
}

function ideaToSlug(idea: IdeaState): string {
  return categoryKeys.map((key) => {
    const arr = data[key as keyof typeof data] as string[]
    return arr.indexOf(idea[key as CategoryKey])
  }).join('-')
}

interface IdeaStore {
  currentIdea: IdeaState
  locked: Set<CategoryKey>
  saved: SavedIdea[]
  generate: () => void
  reroll: (key: CategoryKey) => void
  setValue: (key: CategoryKey, value: string) => void
  toggleLock: (key: CategoryKey) => void
  saveCurrent: () => void
  toggleFavorite: (id: string) => void
  deleteSaved: (id: string) => void
  currentSlug: () => string
}

export const useIdeaStore = create<IdeaStore>()(
  persist(
    (set, get) => ({
      currentIdea: generateIdea(),
      locked: new Set<CategoryKey>(),
      saved: [],

      setValue: (key: CategoryKey, value: string) => {
    set((s) => ({
      currentIdea: { ...s.currentIdea, [key]: value },
    }))
  },

  generate: () => {
        const { locked, currentIdea } = get()
        const idea = { ...currentIdea }
        for (const key of categoryKeys) {
          if (!locked.has(key)) {
            const arr = data[key as keyof typeof data] as string[]
            idea[key as CategoryKey] = randomItem(arr)
          }
        }
        set({ currentIdea: idea })
      },

      reroll: (key: CategoryKey) => {
        const arr = data[key as keyof typeof data] as string[]
        set((s) => ({
          currentIdea: { ...s.currentIdea, [key]: randomItem(arr) },
        }))
      },

      toggleLock: (key: CategoryKey) => {
        set((s) => {
          const locked = new Set(s.locked)
          if (locked.has(key)) locked.delete(key)
          else locked.add(key)
          return { locked }
        })
      },

      saveCurrent: () => {
        const { currentIdea, saved } = get()
        const id = createId()
        set({
          saved: [
            { id, idea: { ...currentIdea }, createdAt: Date.now(), favorited: false },
            ...saved,
          ],
        })
      },

      toggleFavorite: (id: string) => {
        set((s) => ({
          saved: s.saved.map((item) =>
            item.id === id ? { ...item, favorited: !item.favorited } : item
          ),
        }))
      },

      deleteSaved: (id: string) => {
        set((s) => ({
          saved: s.saved.filter((item) => item.id !== id),
        }))
      },

      currentSlug: () => ideaToSlug(get().currentIdea),
    }),
    {
      name: 'idea-store',
      partialize: (state) => ({ saved: state.saved }),
      merge: (persisted, current) => ({
        ...current,
        ...(persisted as Partial<IdeaStore>),
      }),
    }
  )
)

export { labels, categoryKeys, ideaToSlug }
