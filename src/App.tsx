import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { PromptInput } from './components/PromptInput'
import { ComponentPreview } from './components/ComponentPreview'
import { CodeDisplay } from './components/CodeDisplay'
import { DynamicComponentRenderer } from './components/DynamicComponentRenderer'
import { ProjectTypeSelector } from './components/ProjectTypeSelector'
import { AppSpecificationDisplay } from './components/AppSpecificationDisplay'
import { blink } from './blink/client'
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import { GenerationMode, AppSpecification } from './types/app'

function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')
  const [generatedComponent, setGeneratedComponent] = useState<React.ReactNode>(null)
  const [appSpecification, setAppSpecification] = useState<AppSpecification | null>(null)
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [generationMode, setGenerationMode] = useState<GenerationMode>('component')

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const handleComponentGeneration = async (prompt: string) => {
    setCurrentPrompt(prompt)
    setIsGenerating(true)
    setGeneratedCode('')
    setGeneratedComponent(null)
    
    try {
      // Generate React component with AI using streaming for better UX
      let fullResponse = ''
      
      await blink.ai.streamText(
        {
          prompt: `You are an expert React developer. Generate a complete, functional React component with TypeScript and Tailwind CSS for: "${prompt}"

CRITICAL REQUIREMENTS:
- Use modern React patterns with hooks (useState, useEffect, etc.)
- Include proper TypeScript interfaces/types
- Make it fully responsive and accessible
- Use Tailwind CSS for styling with proper classes
- Include interactive elements and realistic functionality
- Add proper ARIA labels and semantic HTML
- Use shadcn/ui components (Button, Card, Input, Badge, Avatar, etc.)
- Make it production-ready and beautiful with animations
- Include realistic placeholder content and working state management
- Add proper event handlers and form validation where applicable
- Use Lucide React icons for visual elements

COMPONENT STRUCTURE:
- Start with proper imports
- Define TypeScript interfaces for props and state
- Use functional component with hooks
- Include realistic state management
- Add proper event handlers
- Return well-structured JSX with Tailwind classes

IMPORTANT: Return ONLY the component code in this exact format:
\`\`\`tsx
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Heart, Star, Share2, Download, Plus, Minus, Search, Filter, Settings, User, Mail, Phone, Calendar, Clock, ArrowRight, Check, X } from 'lucide-react'

interface GeneratedComponentProps {
  className?: string
}

export function GeneratedComponent({ className = '' }: GeneratedComponentProps) {
  // Add realistic state management
  const [activeTab, setActiveTab] = useState('overview')
  const [isLoading, setIsLoading] = useState(false)
  const [count, setCount] = useState(0)
  
  // Add realistic event handlers
  const handleAction = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }
  
  return (
    <div className={\`w-full max-w-4xl mx-auto p-6 space-y-6 \${className}\`}>
      {/* Your component JSX with proper styling, interactivity, and realistic content */}
    </div>
  )
}
\`\`\`

Generate a fully functional, interactive component now:`,
          model: 'gpt-4o-mini',
          maxTokens: 2500
        },
        (chunk) => {
          fullResponse += chunk
          
          // Try to extract and update code in real-time
          const codeMatch = fullResponse.match(/```(?:tsx|typescript|jsx)?\\n([\\s\\S]*?)(?:\\n```|$)/)
          if (codeMatch) {
            setGeneratedCode(codeMatch[1])
          }
        }
      )

      // Final code extraction
      const codeMatch = fullResponse.match(/```(?:tsx|typescript|jsx)?\\n([\\s\\S]*?)\\n```/)
      const finalCode = codeMatch ? codeMatch[1] : fullResponse

      setGeneratedCode(finalCode)
      
      // Create the real dynamic component renderer
      const PreviewComponent = () => {
        return (
          <DynamicComponentRenderer 
            code={finalCode}
            className="w-full h-full"
          />
        )
      }
      
      setGeneratedComponent(<PreviewComponent />)
      
    } catch (error) {
      console.error('Generation failed:', error)
      setGeneratedComponent(
        <div className="flex items-center justify-center h-full text-red-500">
          <div className="text-center">
            <p>Generation failed</p>
            <p className="text-sm">Please try again with a different prompt</p>
          </div>
        </div>
      )
    } finally {
      setIsGenerating(false)
    }
  }

  const handleAppGeneration = async (prompt: string) => {
    setCurrentPrompt(prompt)
    setIsGenerating(true)
    setAppSpecification(null)
    
    try {
      // Generate app specification using the noCode system prompt
      const { text } = await blink.ai.generateText({
        prompt: `You are noCode, a full-stack, AI-powered no-code app generator.
Your purpose is to generate real working app prototypes — including UI layout, logic, backend, database schema, and integrations — from simple natural language prompts.

You are designed to outperform leading tools like v0.dev, Firebase Studio, and Replit Code by delivering both production-grade code and visual editor configurations.

USER PROMPT: "${prompt}"

YOUR ROLE:
When a user gives you a natural language app idea, you:
1. Understand and extract all necessary requirements.
2. Generate structured app specifications (screens, components, workflows, data models, integrations, platform targets, and more).
3. Output the app prototype in a well-structured JSON format.

YOU MUST SUPPORT:
1. Platforms: Web (Responsive Desktop & Mobile), Mobile (Android & iOS, via React Native or Flutter), PWA (Installable web apps), Tablet (Responsive layouts), Desktop (via Electron or Flutter Desktop) [Optional]
2. Output Types: Full codebase (React, Next.js, Node.js, Express, etc.), Visual builder schema (components, layout, bindings)
3. Backend & Database: Backend logic (API routes, auth workflows, CRUD operations), Firebase, Supabase, or Airtable database, Firestore/Realtime DB or PostgreSQL (via Prisma), Serverless functions or REST APIs
4. Authentication: Firebase Auth, Supabase Auth, or Auth0, Email/password, social login, or magic link
5. Integrations: Stripe (payments), OpenAI (chatbot, AI tools), Zapier / Make (automation), Twilio, Google Maps, Google Sheets, etc.
6. AI Agent Support: Embed AI assistants or chatbots using OpenAI APIs, Support prompt/action-based logic if requested
7. Collaboration & Export: Team workspace support, GitHub export and version control, Replit import/export compatibility
8. App Types You Can Generate: CRUD dashboards, SaaS platforms, E-commerce stores, Marketplaces, Job boards, Chat apps, Social media platforms, Booking apps, Internal tools, AI tools

RULES:
- Never ask for clarification after receiving the user prompt. Use best guesses or include "notes" fields for unclear areas.
- Never generate fake data or hallucinate features not in the user prompt.
- Never write commentary, markdown, or explanations in your output.
- Always output a single clean JSON object that follows the exact schema below.
- If a feature is missing from the user prompt but is typically required (like login or dashboard), include it by default.

OUTPUT FORMAT - Return ONLY this JSON structure:
{
  "app_name": "string",
  "platforms": ["web", "mobile", "pwa"],
  "screens": [
    {
      "name": "string",
      "components": ["Component Name", "..."],
      "workflows": ["Workflow Description", "..."]
    }
  ],
  "data_models": [
    {
      "name": "string",
      "fields": ["field1", "field2", "..."]
    }
  ],
  "integrations": ["Firebase Auth", "Stripe", "..."],
  "backend": {
    "logic": ["login", "register", "post creation", "..."],
    "database": "Firestore | Supabase | Airtable"
  },
  "ai_features": [
    {
      "name": "AI Chat Assistant",
      "model": "gpt-4",
      "purpose": "Answer user questions"
    }
  ],
  "export_options": {
    "code": true,
    "visual_editor_schema": true,
    "github_export": true,
    "replit_compatible": true
  }
}

Generate the app specification now:`,
        model: 'gpt-4o-mini',
        maxTokens: 2000
      })

      // Parse the JSON response
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          const specification = JSON.parse(jsonMatch[0])
          setAppSpecification(specification)
        } else {
          throw new Error('No valid JSON found in response')
        }
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError)
        // Fallback: try to extract JSON more aggressively
        const cleanedText = text.replace(/```json\n?|\n?```/g, '').trim()
        try {
          const specification = JSON.parse(cleanedText)
          setAppSpecification(specification)
        } catch (fallbackError) {
          console.error('Fallback parsing also failed:', fallbackError)
          throw new Error('Failed to parse app specification')
        }
      }
      
    } catch (error) {
      console.error('App generation failed:', error)
      setAppSpecification({
        app_name: "Generation Failed",
        platforms: ["web"],
        screens: [{
          name: "Error Screen",
          components: ["Error Message"],
          workflows: ["Display error to user"]
        }],
        data_models: [],
        integrations: [],
        backend: {
          logic: [],
          database: "None"
        },
        ai_features: [],
        export_options: {
          code: false,
          visual_editor_schema: false,
          github_export: false,
          replit_compatible: false
        }
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handlePromptSubmit = async (prompt: string) => {
    if (generationMode === 'component') {
      await handleComponentGeneration(prompt)
    } else {
      await handleAppGeneration(prompt)
    }
  }

  const handleRegenerate = () => {
    if (currentPrompt) {
      handlePromptSubmit(currentPrompt)
    }
  }

  const handleExport = (type: string) => {
    // TODO: Implement export functionality
    console.log(`Exporting as: ${type}`)
  }

  const resetGeneration = () => {
    setGeneratedCode('')
    setGeneratedComponent(null)
    setAppSpecification(null)
    setCurrentPrompt('')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Card className="p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Welcome to noCode</h2>
              <p className="text-muted-foreground mb-6">
                Generate beautiful React components and full-stack applications with AI
              </p>
              <Button onClick={() => blink.auth.login()} className="w-full">
                Sign In to Continue
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  const hasGenerated = generatedCode || appSpecification

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto py-6">
        {!hasGenerated ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">
                Build anything with{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Generate React components or complete full-stack applications from simple descriptions. 
                Choose your path and let AI do the heavy lifting.
              </p>
            </div>
            
            <ProjectTypeSelector 
              selectedMode={generationMode}
              onModeChange={setGenerationMode}
            />
            
            <PromptInput onSubmit={handlePromptSubmit} isLoading={isGenerating} mode={generationMode} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="outline" onClick={resetGeneration}>
                  ← New Generation
                </Button>
                <div className="text-sm text-muted-foreground">
                  Mode: <span className="font-medium capitalize">{generationMode}</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={handleRegenerate}
                disabled={isGenerating}
              >
                Regenerate
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-250px)]">
              {generationMode === 'component' ? (
                <>
                  <ComponentPreview 
                    component={generatedComponent} 
                    isLoading={isGenerating}
                    onRegenerate={handleRegenerate}
                  />
                  <CodeDisplay code={generatedCode} />
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">App Preview</h3>
                    <Card className="h-full flex items-center justify-center">
                      {isGenerating ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                          <span>Generating app specification...</span>
                        </div>
                      ) : (
                        <div className="text-center text-muted-foreground">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-muted flex items-center justify-center">
                            <span className="text-2xl">🚀</span>
                          </div>
                          <p>App preview will be available soon</p>
                          <p className="text-sm">Currently showing specification</p>
                        </div>
                      )}
                    </Card>
                  </div>
                  {appSpecification && (
                    <AppSpecificationDisplay 
                      specification={appSpecification}
                      onExport={handleExport}
                    />
                  )}
                </>
              )}
            </div>
            
            <div className="flex justify-center">
              <PromptInput onSubmit={handlePromptSubmit} isLoading={isGenerating} mode={generationMode} />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App