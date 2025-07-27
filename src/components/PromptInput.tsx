import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Sparkles } from "lucide-react"
import { useState } from "react"

interface PromptInputProps {
  onSubmit: (prompt: string) => void
  isLoading?: boolean
}

export function PromptInput({ onSubmit, isLoading = false }: PromptInputProps) {
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

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="relative">
        <Textarea
          placeholder="Describe the UI you want to build..."
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
      <div className="mt-4 flex flex-wrap gap-2">
        {[
          "A modern login form with social auth buttons",
          "A pricing table with 3 tiers and popular badge",
          "A dashboard with analytics charts and KPI cards",
          "A landing page hero with gradient background",
          "A contact form with validation",
          "A product card grid with hover effects",
          "A navigation bar with dropdown menu",
          "A testimonials section with avatars"
        ].map((example) => (
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
  )
}