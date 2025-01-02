import { create } from 'zustand'

type AdState = {
  title: string
  description: string
  mediaPreviews: string[]
  resetState: () => void
}

export const useAdState = create<AdState>((set) => ({
  title: '',
  description: '',
  mediaPreviews: [],
  resetState: () => set({ title: '', description: '', mediaPreviews: [] }),
}))

