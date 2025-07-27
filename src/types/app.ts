export interface AppSpecification {
  app_name: string
  platforms: string[]
  screens: Screen[]
  data_models: DataModel[]
  integrations: string[]
  backend: Backend
  ai_features: AIFeature[]
  export_options: ExportOptions
}

export interface Screen {
  name: string
  components: string[]
  workflows: string[]
}

export interface DataModel {
  name: string
  fields: string[]
}

export interface Backend {
  logic: string[]
  database: string
}

export interface AIFeature {
  name: string
  model: string
  purpose: string
}

export interface ExportOptions {
  code: boolean
  visual_editor_schema: boolean
  github_export: boolean
  replit_compatible: boolean
}

export type GenerationMode = 'component' | 'app'