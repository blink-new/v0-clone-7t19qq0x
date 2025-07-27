import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Monitor, 
  Smartphone, 
  Database, 
  Zap, 
  Brain, 
  Download, 
  Github, 
  Code,
  Layers,
  Settings,
  Globe
} from "lucide-react"
import { AppSpecification } from "@/types/app"

interface AppSpecificationDisplayProps {
  specification: AppSpecification
  onExport?: (type: string) => void
}

export function AppSpecificationDisplay({ specification, onExport }: AppSpecificationDisplayProps) {
  const platformIcons = {
    web: Globe,
    mobile: Smartphone,
    pwa: Monitor,
    tablet: Monitor,
    desktop: Monitor
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Layers className="h-5 w-5" />
            <span>App Specification</span>
          </CardTitle>
          <Badge className="bg-gradient-to-r from-purple-500 to-blue-500">
            {specification.app_name}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            {/* Platforms */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center space-x-2">
                <Monitor className="h-4 w-4" />
                <span>Target Platforms</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {specification.platforms.map((platform) => {
                  const Icon = platformIcons[platform as keyof typeof platformIcons] || Monitor
                  return (
                    <Badge key={platform} variant="outline" className="flex items-center space-x-1">
                      <Icon className="h-3 w-3" />
                      <span className="capitalize">{platform}</span>
                    </Badge>
                  )
                })}
              </div>
            </div>

            <Separator />

            {/* Screens */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center space-x-2">
                <Layers className="h-4 w-4" />
                <span>Screens ({specification.screens.length})</span>
              </h4>
              <div className="space-y-3">
                {specification.screens.map((screen, index) => (
                  <Card key={index} className="p-3">
                    <h5 className="font-medium mb-2">{screen.name}</h5>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs text-muted-foreground">Components:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {screen.components.map((component, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {component}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Workflows:</span>
                        <ul className="text-xs mt-1 space-y-1">
                          {screen.workflows.map((workflow, i) => (
                            <li key={i} className="text-muted-foreground">• {workflow}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            {/* Data Models */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center space-x-2">
                <Database className="h-4 w-4" />
                <span>Data Models ({specification.data_models.length})</span>
              </h4>
              <div className="space-y-2">
                {specification.data_models.map((model, index) => (
                  <Card key={index} className="p-3">
                    <h5 className="font-medium mb-2">{model.name}</h5>
                    <div className="flex flex-wrap gap-1">
                      {model.fields.map((field, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {field}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            {/* Backend & Integrations */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Backend & Integrations</span>
              </h4>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium">Database:</span>
                  <Badge variant="outline" className="ml-2">{specification.backend.database}</Badge>
                </div>
                <div>
                  <span className="text-sm font-medium">Backend Logic:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {specification.backend.logic.map((logic, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {logic}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium">Integrations:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {specification.integrations.map((integration, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        <Zap className="h-3 w-3 mr-1" />
                        {integration}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* AI Features */}
            {specification.ai_features.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-3 flex items-center space-x-2">
                    <Brain className="h-4 w-4" />
                    <span>AI Features ({specification.ai_features.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {specification.ai_features.map((feature, index) => (
                      <Card key={index} className="p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{feature.name}</h5>
                          <Badge variant="outline">{feature.model}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{feature.purpose}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Separator />

            {/* Export Options */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export Options</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onExport?.('code')}
                  disabled={!specification.export_options.code}
                  className="flex items-center space-x-2"
                >
                  <Code className="h-4 w-4" />
                  <span>Export Code</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onExport?.('github')}
                  disabled={!specification.export_options.github_export}
                  className="flex items-center space-x-2"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub Export</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onExport?.('visual')}
                  disabled={!specification.export_options.visual_editor_schema}
                  className="flex items-center space-x-2"
                >
                  <Layers className="h-4 w-4" />
                  <span>Visual Schema</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => onExport?.('replit')}
                  disabled={!specification.export_options.replit_compatible}
                  className="flex items-center space-x-2"
                >
                  <Monitor className="h-4 w-4" />
                  <span>Replit Export</span>
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}