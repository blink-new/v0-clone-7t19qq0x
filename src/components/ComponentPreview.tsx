import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Monitor, Smartphone, Tablet, RotateCcw } from "lucide-react"
import { useState } from "react"

interface ComponentPreviewProps {
  component?: React.ReactNode
  isLoading?: boolean
  onRegenerate?: () => void
}

export function ComponentPreview({ component, isLoading = false, onRegenerate }: ComponentPreviewProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')

  const getPreviewWidth = () => {
    switch (viewMode) {
      case 'mobile': return 'max-w-sm'
      case 'tablet': return 'max-w-2xl'
      default: return 'max-w-full'
    }
  }

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">Preview</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center border rounded-md">
            <Button
              variant={viewMode === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('desktop')}
              className="rounded-r-none"
            >
              <Monitor className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'tablet' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('tablet')}
              className="rounded-none border-x"
            >
              <Tablet className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('mobile')}
              className="rounded-l-none"
            >
              <Smartphone className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRegenerate}
            disabled={isLoading}
          >
            <RotateCcw className="h-4 w-4" />
            Regenerate
          </Button>
        </div>
      </div>
      <div className="p-6 h-[500px] overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : component ? (
          <div className={`mx-auto transition-all duration-300 ${getPreviewWidth()}`}>
            {component}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-muted flex items-center justify-center">
                <Monitor className="h-8 w-8" />
              </div>
              <p>Your generated component will appear here</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}