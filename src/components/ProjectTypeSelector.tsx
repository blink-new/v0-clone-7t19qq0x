import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, Smartphone, Gamepad2, Component } from "lucide-react"

interface ProjectTypeSelectorProps {
  selectedType: 'website' | 'app' | 'game' | 'component'
  onTypeChange: (type: 'website' | 'app' | 'game' | 'component') => void
}

const projectTypes = [
  {
    id: 'website' as const,
    name: 'Website',
    description: 'Landing pages, portfolios, blogs, business sites',
    icon: Globe,
    examples: ['Landing page', 'Portfolio', 'Blog', 'E-commerce'],
    color: 'bg-blue-500'
  },
  {
    id: 'app' as const,
    name: 'Web App',
    description: 'Interactive applications, dashboards, tools',
    icon: Smartphone,
    examples: ['Dashboard', 'Todo app', 'Chat app', 'Calculator'],
    color: 'bg-green-500'
  },
  {
    id: 'game' as const,
    name: 'Game',
    description: 'Browser games, puzzles, interactive experiences',
    icon: Gamepad2,
    examples: ['Tic-tac-toe', 'Snake', 'Memory game', 'Quiz'],
    color: 'bg-purple-500'
  },
  {
    id: 'component' as const,
    name: 'Component',
    description: 'Reusable UI components and widgets',
    icon: Component,
    examples: ['Button', 'Modal', 'Form', 'Chart'],
    color: 'bg-orange-500'
  }
]

export function ProjectTypeSelector({ selectedType, onTypeChange }: ProjectTypeSelectorProps) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">What do you want to build?</h2>
        <p className="text-muted-foreground">Choose a project type to get started</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {projectTypes.map((type) => {
          const Icon = type.icon
          const isSelected = selectedType === type.id
          
          return (
            <Card 
              key={type.id}
              className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                isSelected ? 'ring-2 ring-primary shadow-lg' : ''
              }`}
              onClick={() => onTypeChange(type.id)}
            >
              <div className="text-center">
                <div className={`w-12 h-12 ${type.color} rounded-lg mx-auto mb-4 flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{type.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{type.description}</p>
                
                <div className="flex flex-wrap gap-1 justify-center">
                  {type.examples.slice(0, 2).map((example) => (
                    <Badge key={example} variant="secondary" className="text-xs">
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}