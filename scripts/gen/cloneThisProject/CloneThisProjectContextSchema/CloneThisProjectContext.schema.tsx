import type { CloneThisProjectAskQuestionsReturn } from '../handlers/cloneThisProjectAskQuestions/cloneThisProjectAskQuestions.js'

export type CloneThisProjectContextSchema = {
  cloneProjectOutputPath: string
  currentProjectName: string
} & Awaited<CloneThisProjectAskQuestionsReturn>
