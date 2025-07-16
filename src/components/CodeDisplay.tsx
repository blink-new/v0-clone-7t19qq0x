import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, ExternalLink } from "lucide-react"
import { useState } from "react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeDisplayProps {
  code: string
  isDark?: boolean
}

export function CodeDisplay({ code, isDark = false }: CodeDisplayProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">Generated Code</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={copyToClipboard}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.open('https://codesandbox.io/s/new', '_blank')}
          >
            <ExternalLink className="h-4 w-4" />
            Open in CodeSandbox
          </Button>
        </div>
      </div>
      <Tabs defaultValue="tsx" className="h-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tsx">Component</TabsTrigger>
          <TabsTrigger value="css">Styles</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="tsx" className="h-full p-0">
          <div className="h-[500px] overflow-auto">
            <SyntaxHighlighter
              language="tsx"
              style={isDark ? oneDark : oneLight}
              customStyle={{
                margin: 0,
                borderRadius: 0,
                background: 'transparent'
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </TabsContent>
        <TabsContent value="css" className="h-full p-4">
          <p className="text-muted-foreground">CSS styles will appear here...</p>
        </TabsContent>
        <TabsContent value="preview" className="h-full p-4">
          <div className="border rounded-lg p-4 bg-background">
            <p className="text-muted-foreground">Component preview will appear here...</p>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}