import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Monitor, Smartphone, Tablet, RotateCcw, ExternalLink, Play, Square } from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"
import type { ProjectFile } from "@/types/project"

interface LivePreviewProps {
  files: ProjectFile[]
  mainFile: string
  isLoading?: boolean
  onRegenerate?: () => void
}

export function LivePreview({ files, mainFile, isLoading = false, onRegenerate }: LivePreviewProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [isRunning, setIsRunning] = useState(false)
  const [previewContent, setPreviewContent] = useState('')
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const getPreviewWidth = () => {
    switch (viewMode) {
      case 'mobile': return 'max-w-sm'
      case 'tablet': return 'max-w-2xl'
      default: return 'max-w-full'
    }
  }

  const generatePreviewHTML = useCallback(() => {
    const mainFileContent = files.find(f => f.name === mainFile)?.content || ''
    const cssFiles = files.filter(f => f.type === 'css')
    
    // Create a complete HTML document with all files
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Preview</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { margin: 0; padding: 20px; font-family: system-ui, -apple-system, sans-serif; }
        .error { color: red; padding: 20px; background: #fee; border: 1px solid #fcc; border-radius: 4px; }
        ${cssFiles.map(f => f.content).join('\\n')}
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        const { useState, useEffect, useRef } = React;
        
        try {
            ${mainFileContent}
            
            // Try to render the component
            const container = document.getElementById('root');
            const root = ReactDOM.createRoot(container);
            
            // Look for exported component
            if (typeof GeneratedComponent !== 'undefined') {
                root.render(React.createElement(GeneratedComponent));
            } else if (typeof App !== 'undefined') {
                root.render(React.createElement(App));
            } else {
                // Try to find any React component in the code
                const componentMatch = \`${mainFileContent}\`.match(/(?:export\\s+(?:default\\s+)?function\\s+(\\w+)|function\\s+(\\w+))/);
                if (componentMatch) {
                    const componentName = componentMatch[1] || componentMatch[2];
                    if (window[componentName]) {
                        root.render(React.createElement(window[componentName]));
                    } else {
                        throw new Error('Component not found: ' + componentName);
                    }
                } else {
                    throw new Error('No React component found in the code');
                }
            }
        } catch (error) {
            console.error('Preview error:', error);
            document.getElementById('root').innerHTML = \`
                <div class="error">
                    <h3>Preview Error</h3>
                    <p>\${error.message}</p>
                    <details>
                        <summary>Stack trace</summary>
                        <pre>\${error.stack}</pre>
                    </details>
                </div>
            \`;
        }
    </script>
</body>
</html>`
    
    return html
  }, [files, mainFile])

  const runPreview = useCallback(() => {
    if (files.length === 0) return
    
    setIsRunning(true)
    const html = generatePreviewHTML()
    setPreviewContent(html)
    
    // Update iframe content
    if (iframeRef.current) {
      const iframe = iframeRef.current
      iframe.srcdoc = html
    }
  }, [files.length, generatePreviewHTML])

  const stopPreview = () => {
    setIsRunning(false)
    setPreviewContent('')
    if (iframeRef.current) {
      iframeRef.current.srcdoc = ''
    }
  }

  // Auto-run when files change
  useEffect(() => {
    if (files.length > 0 && !isLoading) {
      runPreview()
    }
  }, [files, mainFile, isLoading, runPreview])

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">Live Preview</h3>
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
            onClick={isRunning ? stopPreview : runPreview}
            disabled={isLoading || files.length === 0}
          >
            {isRunning ? <Square className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isRunning ? 'Stop' : 'Run'}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRegenerate}
            disabled={isLoading}
          >
            <RotateCcw className="h-4 w-4" />
            Regenerate
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const blob = new Blob([previewContent], { type: 'text/html' })
              const url = URL.createObjectURL(blob)
              window.open(url, '_blank')
            }}
            disabled={!previewContent}
          >
            <ExternalLink className="h-4 w-4" />
            Open
          </Button>
        </div>
      </div>
      
      <div className="p-6 h-[500px] overflow-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Generating your project...</p>
            </div>
          </div>
        ) : files.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-muted flex items-center justify-center">
                <Monitor className="h-8 w-8" />
              </div>
              <p>Your live preview will appear here</p>
              <p className="text-sm mt-2">Describe what you want to build and watch it come to life!</p>
            </div>
          </div>
        ) : (
          <div className={`mx-auto transition-all duration-300 ${getPreviewWidth()}`}>
            <div className="border rounded-lg overflow-hidden bg-white">
              <iframe
                ref={iframeRef}
                className="w-full h-[400px] border-0"
                title="Live Preview"
                sandbox="allow-scripts allow-same-origin"
                srcDoc={previewContent}
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}