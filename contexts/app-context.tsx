"use client"

import { createContext, useContext, useReducer, ReactNode } from "react"

interface QAPair {
  id: string
  question: string
  answer: string
  category: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface AppState {
  qaPairs: QAPair[]
  loading: boolean
  error: string | null
}

type AppAction =
  | { type: "SET_QA_PAIRS"; payload: QAPair[] }
  | { type: "ADD_QA_PAIR"; payload: QAPair }
  | { type: "UPDATE_QA_PAIR"; payload: QAPair }
  | { type: "DELETE_QA_PAIR"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }

const initialState: AppState = {
  qaPairs: [],
  loading: false,
  error: null,
}

const AppContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<AppAction>
} | null>(null)

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_QA_PAIRS":
      return { ...state, qaPairs: action.payload }
    case "ADD_QA_PAIR":
      return { ...state, qaPairs: [...state.qaPairs, action.payload] }
    case "UPDATE_QA_PAIR":
      return {
        ...state,
        qaPairs: state.qaPairs.map((qa) => (qa.id === action.payload.id ? action.payload : qa)),
      }
    case "DELETE_QA_PAIR":
      return {
        ...state,
        qaPairs: state.qaPairs.filter((qa) => qa.id !== action.payload),
      }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload }
    default:
      return state
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}

export type { QAPair } 