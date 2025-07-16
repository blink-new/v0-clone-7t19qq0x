export interface ProjectFile {
  id: string
  name: string
  content: string
  type: 'tsx' | 'ts' | 'css' | 'html' | 'json' | 'md'
  path: string
}

export interface Project {
  id: string
  name: string
  description: string
  type: 'website' | 'app' | 'game' | 'component'
  files: ProjectFile[]
  mainFile: string
  createdAt: Date
  updatedAt: Date
}

export interface GenerationRequest {
  prompt: string
  projectType: 'website' | 'app' | 'game' | 'component'
  framework?: 'react' | 'vanilla' | 'vue' | 'svelte'
  styling?: 'tailwind' | 'css' | 'styled-components'
  features?: string[]
}

export interface GenerationResult {
  files: ProjectFile[]
  mainFile: string
  dependencies?: string[]
  instructions?: string
}