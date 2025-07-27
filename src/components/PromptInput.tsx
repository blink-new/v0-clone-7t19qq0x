import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Sparkles, Component, Layers } from "lucide-react"
import { useState } from "react"
import { GenerationMode } from "@/types/app"

interface PromptInputProps {
  onSubmit: (prompt: string) => void
  isLoading?: boolean
  mode?: GenerationMode
}

export function PromptInput({ onSubmit, isLoading = false, mode = 'component' }: PromptInputProps) {
  const [prompt, setPrompt] = useState("")

  const handleSubmit = () => {
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt.trim())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const componentExamples = [
    "A modern login form with social auth buttons",
    "A pricing table with 3 tiers and popular badge",
    "A dashboard with analytics charts and KPI cards",
    "A landing page hero with gradient background",
    "A contact form with validation",
    "A product card grid with hover effects",
    "A navigation bar with dropdown menu",
    "A testimonials section with avatars"
  ]

  const appExamples = [
    "A task management app like Todoist with projects and due dates",
    "A social media platform for sharing photos with likes and comments",
    "An e-commerce store for selling handmade crafts with Stripe payments",
    "A job board where companies can post jobs and candidates can apply",
    "A booking app for restaurants with table reservations",
    "A chat application with real-time messaging and file sharing",
    "A fitness tracking app with workout plans and progress charts",
    "A marketplace for freelancers to offer services"
  ]

  const examples = mode === 'component' ? componentExamples : appExamples
  const placeholder = mode === 'component' 
    ? "Describe the UI component you want to build..."
    : "Describe the full-stack application you want to create..."

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="relative">
        <Textarea
          placeholder={placeholder}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[120px] pr-12 resize-none text-base"
          disabled={isLoading}
        />
        <Button
          size="sm"
          onClick={handleSubmit}
          disabled={!prompt.trim() || isLoading}
          className="absolute bottom-3 right-3"
        >
          {isLoading ? (
            <Sparkles className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center space-x-2 mb-3">
          {mode === 'component' ? (
            <Component className="h-4 w-4 text-blue-600" />
          ) : (
            <Layers className="h-4 w-4 text-purple-600" />
          )}
          <span className="text-sm font-medium text-muted-foreground">
            {mode === 'component' ? 'Component Examples:' : 'App Examples:'}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {examples.map((example) => (
            <Button
              key={example}
              variant="outline"
              size="sm"
              onClick={() => setPrompt(example)}
              disabled={isLoading}
              className="text-xs hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {example}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}