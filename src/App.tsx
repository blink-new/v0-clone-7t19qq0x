import { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { PromptInput } from './components/PromptInput'
import { ComponentPreview } from './components/ComponentPreview'
import { CodeDisplay } from './components/CodeDisplay'
import { DynamicComponentRenderer } from './components/DynamicComponentRenderer'
import { blink } from './blink/client'
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'

function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCode, setGeneratedCode] = useState('')
  const [generatedComponent, setGeneratedComponent] = useState<React.ReactNode>(null)
  const [currentPrompt, setCurrentPrompt] = useState('')

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const handlePromptSubmit = async (prompt: string) => {
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
          const codeMatch = fullResponse.match(/```(?:tsx|typescript|jsx)?\n([\s\S]*?)(?:\n```|$)/)
          if (codeMatch) {
            setGeneratedCode(codeMatch[1])
          }
        }
      )

      // Final code extraction
      const codeMatch = fullResponse.match(/```(?:tsx|typescript|jsx)?\n([\s\S]*?)\n```/)
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

  const handleRegenerate = () => {
    if (currentPrompt) {
      handlePromptSubmit(currentPrompt)
    }
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
              <h2 className="text-2xl font-bold mb-4">Welcome to v0</h2>
              <p className="text-muted-foreground mb-6">
                Generate beautiful React components with AI
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto py-6">
        {!generatedCode ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">
                Generate UI with{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Describe the component you want to build and watch as AI generates 
                beautiful, responsive React code for you.
              </p>
            </div>
            <PromptInput onSubmit={handlePromptSubmit} isLoading={isGenerating} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
            <ComponentPreview 
              component={generatedComponent} 
              isLoading={isGenerating}
              onRegenerate={handleRegenerate}
            />
            <CodeDisplay code={generatedCode} />
          </div>
        )}
        
        {generatedCode && (
          <div className="mt-6 flex justify-center">
            <PromptInput onSubmit={handlePromptSubmit} isLoading={isGenerating} />
          </div>
        )}
      </main>
    </div>
  )
}

export default App