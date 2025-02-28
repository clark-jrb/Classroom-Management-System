// toastStore.ts
import { create } from 'zustand'

type ToastTypes = 'success' | 'error' | 'loading' | 'warning'

type ToastState = {
    message: string | null
    type: ToastTypes | null
    setToast: (message: string, type: ToastTypes) => void
    clearToast: () => void
}

export const useToastStore = create<ToastState>((set) => ({
    message: null,
    type: null,
    setToast: (message, type) => set({ message, type }),
    clearToast: () => set({ message: null, type: null }),
}))
