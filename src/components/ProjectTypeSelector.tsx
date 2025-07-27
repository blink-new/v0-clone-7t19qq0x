import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Component, Layers, Sparkles, Code, Database, Smartphone } from "lucide-react"
import { GenerationMode } from "@/types/app"

interface ProjectTypeSelectorProps {
  selectedMode: GenerationMode
  onModeChange: (mode: GenerationMode) => void
}

export function ProjectTypeSelector({ selectedMode, onModeChange }: ProjectTypeSelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">What would you like to build?</h2>
        <p className="text-muted-foreground">Choose between generating a single component or a complete application</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
            selectedMode === 'component' 
              ? 'ring-2 ring-primary bg-primary/5' 
              : 'hover:bg-accent/50'
          }`}
          onClick={() => onModeChange('component')}
        >
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <Component className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold">UI Component</h3>
                  <Badge variant="secondary" className="text-xs">Quick</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Generate individual React components with TypeScript and Tailwind CSS
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    <Code className="h-3 w-3 mr-1" />
                    React + TypeScript
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Tailwind CSS
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
            selectedMode === 'app' 
              ? 'ring-2 ring-primary bg-primary/5' 
              : 'hover:bg-accent/50'
          }`}
          onClick={() => onModeChange('app')}
        >
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                <Layers className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold">Full Stack App</h3>
                  <Badge className="text-xs bg-gradient-to-r from-purple-500 to-blue-500">Pro</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Generate complete applications with backend, database, and integrations
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    <Database className="h-3 w-3 mr-1" />
                    Backend + DB
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Smartphone className="h-3 w-3 mr-1" />
                    Multi-platform
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Sparkles className="h-3 w-3 mr-1" />
                    AI Features
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}