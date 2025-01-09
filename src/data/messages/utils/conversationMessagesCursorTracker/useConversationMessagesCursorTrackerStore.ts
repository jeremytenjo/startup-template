import create from 'zustand'
import { type FirestoreDocumentType } from '@useweb/firebase/useFirestore'

type ConversationMessagesCursorTrackerProps = {
  trackerMatrix: {
    [key: string]: {
      lastVisible: FirestoreDocumentType
    }
  }
  settrackerMatrix: (props: { key: string; value: FirestoreDocumentType }) => any
}

export const conversationMessagesCursorTrackerStore =
  create<ConversationMessagesCursorTrackerProps>((set) => ({
    trackerMatrix: {},
    settrackerMatrix: (payload) =>
      set((state) => {
        const udpatedValue = state.trackerMatrix
        udpatedValue[payload.key] = { lastVisible: payload.value }

        return { trackerMatrix: udpatedValue }
      }),
  }))

const useConversationMessagesCursorTrackerStore = conversationMessagesCursorTrackerStore

export default useConversationMessagesCursorTrackerStore
