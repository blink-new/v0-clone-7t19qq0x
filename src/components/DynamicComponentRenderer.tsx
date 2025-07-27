import React, { useState, useEffect, useMemo } from 'react'
import * as Babel from '@babel/standalone'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

// Import all UI components that generated code might use
import * as UIComponents from '@/components/ui/button'
import * as CardComponents from '@/components/ui/card'
import * as InputComponents from '@/components/ui/input'
import * as LabelComponents from '@/components/ui/label'
import * as TextareaComponents from '@/components/ui/textarea'
import * as SelectComponents from '@/components/ui/select'
import * as CheckboxComponents from '@/components/ui/checkbox'
import * as RadioGroupComponents from '@/components/ui/radio-group'
import * as SwitchComponents from '@/components/ui/switch'
import * as SliderComponents from '@/components/ui/slider'
import * as ProgressComponents from '@/components/ui/progress'
import * as BadgeComponents from '@/components/ui/badge'
import * as AvatarComponents from '@/components/ui/avatar'
import * as AlertComponents from '@/components/ui/alert'
import * as DialogComponents from '@/components/ui/dialog'
import * as SheetComponents from '@/components/ui/sheet'
import * as TooltipComponents from '@/components/ui/tooltip'
import * as PopoverComponents from '@/components/ui/popover'
import * as TabsComponents from '@/components/ui/tabs'
import * as AccordionComponents from '@/components/ui/accordion'
import * as CollapsibleComponents from '@/components/ui/collapsible'
import * as NavigationMenuComponents from '@/components/ui/navigation-menu'
import * as MenubarComponents from '@/components/ui/menubar'
import * as ContextMenuComponents from '@/components/ui/context-menu'
import * as DropdownMenuComponents from '@/components/ui/dropdown-menu'
import * as HoverCardComponents from '@/components/ui/hover-card'
import * as CalendarComponents from '@/components/ui/calendar'
import * as FormComponents from '@/components/ui/form'
import * as TableComponents from '@/components/ui/table'
import * as PaginationComponents from '@/components/ui/pagination'
import * as BreadcrumbComponents from '@/components/ui/breadcrumb'
import * as SeparatorComponents from '@/components/ui/separator'
import * as AspectRatioComponents from '@/components/ui/aspect-ratio'
import * as ScrollAreaComponents from '@/components/ui/scroll-area'
import * as ResizableComponents from '@/components/ui/resizable'
import * as SkeletonComponents from '@/components/ui/skeleton'
import * as SonnerComponents from '@/components/ui/sonner'
import * as ToastComponents from '@/components/ui/toast'
import * as ToasterComponents from '@/components/ui/toaster'
import * as ToggleComponents from '@/components/ui/toggle'
import * as ToggleGroupComponents from '@/components/ui/toggle-group'
import * as ChartComponents from '@/components/ui/chart'
import * as CarouselComponents from '@/components/ui/carousel'
import * as DrawerComponents from '@/components/ui/drawer'
import * as InputOtpComponents from '@/components/ui/input-otp'
import * as CommandComponents from '@/components/ui/command'
import * as SidebarComponents from '@/components/ui/sidebar'

// Import Lucide icons
import * as LucideIcons from 'lucide-react'

interface DynamicComponentRendererProps {
  code: string
  className?: string
}

export function DynamicComponentRenderer({ code, className = '' }: DynamicComponentRendererProps) {
  const [error, setError] = useState<string | null>(null)
  const [RenderedComponent, setRenderedComponent] = useState<React.ComponentType | null>(null)

  const compiledComponent = useMemo(() => {
    if (!code.trim()) return null

    try {
      setError(null)

      // Clean up the code - remove export statements and extract component
      let cleanCode = code.trim()
      
      // Remove import statements and replace with our available components
      cleanCode = cleanCode.replace(/import.*from.*['"].*['"];?\n?/g, '')
      
      // Remove export statements
      cleanCode = cleanCode.replace(/export\s+(default\s+)?/g, '')
      
      // Find the component function/class
      const componentMatch = cleanCode.match(/(function|const)\s+(\w+Component|\w+)\s*[({]/)
      const componentName = componentMatch ? componentMatch[2] : 'GeneratedComponent'
      
      // Wrap the code to make it executable
      const executableCode = `
        const React = arguments[0];
        const { useState, useEffect, useCallback, useMemo, useRef } = React;
        const { 
          Button, 
          Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
          Input, Label, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
          Checkbox, RadioGroup, RadioGroupItem, Switch, Slider, Progress,
          Badge, Avatar, AvatarImage, AvatarFallback,
          Alert, AlertDescription, AlertTitle,
          Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
          Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
          Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
          Popover, PopoverContent, PopoverTrigger,
          Tabs, TabsContent, TabsList, TabsTrigger,
          Accordion, AccordionContent, AccordionItem, AccordionTrigger,
          Collapsible, CollapsibleContent, CollapsibleTrigger,
          NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger,
          Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger,
          ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger,
          DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
          HoverCard, HoverCardContent, HoverCardTrigger,
          Calendar, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
          Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow,
          Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious,
          Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
          Separator, AspectRatio, ScrollArea, Resizable, ResizableHandle, ResizablePanel, ResizablePanelGroup,
          Skeleton, Sonner, Toast, Toaster, Toggle, ToggleGroup, ToggleGroupItem,
          Chart, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent,
          Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious,
          Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger,
          InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot,
          Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut,
          Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarSeparator, SidebarTrigger
        } = arguments[1];
        
        // All Lucide icons
        const {
          ArrowRight, ArrowLeft, ArrowUp, ArrowDown, Check, X, Plus, Minus, Search, Filter, 
          Settings, User, Home, Mail, Phone, Clock, Star, Heart, Share, Download,
          Upload, Edit, Delete, Save, Copy, Paste, Cut, Undo, Redo, Refresh, Play, Pause,
          Stop, Volume, VolumeX, Wifi, Battery, Signal, Bluetooth, Camera, Image, Video,
          Music, File, Folder, Archive, Trash, Lock, Unlock, Eye, EyeOff, Shield, Key,
          Bell, BellOff, MessageCircle, MessageSquare, Send, Inbox, Outbox, Flag, Tag,
          Bookmark, BookmarkPlus, Link, ExternalLink, Globe, Map, MapPin, Navigation,
          Compass, Target, Zap, Sun, Moon, Cloud, CloudRain, Umbrella, Snowflake,
          Thermometer, Wind, Sunrise, Sunset, Activity, TrendingUp, TrendingDown,
          BarChart, PieChart, LineChart, DollarSign, CreditCard, ShoppingCart, Package,
          Truck, Plane, Car, Bike, Bus, Train, Ship, Fuel, Tool, Wrench, Hammer,
          Screwdriver, Paintbrush, Palette, Brush, Scissors, Ruler, Calculator,
          Laptop, Monitor, Smartphone, Tablet, Watch, Headphones, Speaker, Microphone,
          Keyboard, Mouse, Printer, Scanner, Webcam, Gamepad, Joystick, Dice, Puzzle,
          Gift, Award, Trophy, Medal, Crown, Diamond, Gem, Ring, Necklace, Glasses,
          Hat, Shirt, Pants, Shoe, Bag, Briefcase, Backpack, Suitcase, Umbrella2,
          Coffee, Pizza, Cake, Apple, Banana, Cherry, Grape, Orange, Strawberry,
          Carrot, Corn, Pepper, Tomato, Potato, Onion, Garlic, Bread, Cheese, Egg,
          Fish, Meat, Chicken, Beef, Pork, Lamb, Shrimp, Crab, Lobster, Octopus,
          Tree, Flower, Leaf, Grass, Mountain, River, Lake, Ocean, Beach, Desert,
          Forest, Park, Garden, Farm, House, Building, Castle, Church, School,
          Hospital, Store, Restaurant, Hotel, Bank, Library, Museum, Theater,
          Stadium, Gym, Pool, Spa, Salon, Barber, Dentist, Doctor, Nurse, Police,
          Firefighter, Teacher, Student, Chef, Waiter, Driver, Pilot, Sailor,
          Farmer, Engineer, Artist, Musician, Writer, Photographer, Designer,
          Developer, Manager, CEO, Boss, Employee, Team, Group, Family, Baby,
          Child, Adult, Senior, Man, Woman, Boy, Girl, Person, People, Crowd,
          Party, Wedding, Birthday, Holiday, Vacation, Travel, Adventure, Sport,
          Football, Basketball, Tennis, Golf, Baseball, Soccer, Hockey, Swimming,
          Running, Cycling, Hiking, Climbing, Skiing, Surfing, Fishing, Hunting,
          Camping, Picnic, BBQ, Cooking, Baking, Reading, Writing, Drawing,
          Painting, Singing, Dancing, Playing, Gaming, Watching, Listening,
          Learning, Teaching, Working, Sleeping, Relaxing, Exercising, Meditating,
          Praying, Celebrating, Laughing, Crying, Smiling, Frowning, Thinking,
          Dreaming, Hoping, Loving, Caring, Helping, Sharing, Giving, Receiving,
          Building, Creating, Making, Fixing, Cleaning, Organizing, Planning,
          Deciding, Choosing, Buying, Selling, Trading, Investing, Saving,
          Spending, Earning, Paying, Owing, Lending, Borrowing, Winning, Losing,
          Competing, Cooperating, Leading, Following, Guiding, Supporting,
          Encouraging, Motivating, Inspiring, Influencing, Persuading, Convincing,
          Arguing, Debating, Discussing, Talking, Listening, Hearing, Seeing,
          Looking, Watching, Observing, Noticing, Recognizing, Remembering,
          Forgetting, Knowing, Understanding, Learning, Discovering, Exploring,
          Investigating, Researching, Studying, Analyzing, Evaluating, Judging,
          Comparing, Contrasting, Measuring, Counting, Calculating, Computing,
          Processing, Storing, Retrieving, Organizing, Sorting, Filtering,
          Searching, Finding, Locating, Navigating, Directing, Guiding, Leading,
          Following, Tracking, Monitoring, Controlling, Managing, Operating,
          Running, Starting, Stopping, Pausing, Resuming, Continuing, Finishing,
          Completing, Achieving, Succeeding, Failing, Trying, Attempting,
          Practicing, Improving, Developing, Growing, Changing, Transforming,
          Evolving, Adapting, Adjusting, Modifying, Updating, Upgrading,
          Enhancing, Optimizing, Perfecting, Polishing, Refining, Simplifying,
          Complicating, Expanding, Reducing, Increasing, Decreasing, Adding,
          Removing, Including, Excluding, Combining, Separating, Connecting,
          Disconnecting, Joining, Leaving, Entering, Exiting, Opening, Closing,
          Locking, Unlocking, Securing, Protecting, Defending, Attacking,
          Fighting, Battling, Competing, Racing, Chasing, Escaping, Hiding,
          Seeking, Finding, Losing, Winning, Gaining, Achieving, Reaching,
          Arriving, Departing, Traveling, Moving, Walking, Running, Jumping,
          Climbing, Flying, Swimming, Diving, Surfing, Sailing, Driving,
          Riding, Cycling, Skating, Skiing, Snowboarding, Sledding, Sliding,
          Rolling, Spinning, Turning, Rotating, Flipping, Twisting, Bending,
          Stretching, Pulling, Pushing, Lifting, Carrying, Holding, Grabbing,
          Releasing, Dropping, Throwing, Catching, Kicking, Hitting, Striking,
          Punching, Slapping, Touching, Feeling, Sensing, Smelling, Tasting,
          Hearing, Seeing, Looking, Watching, Observing, Noticing, Recognizing
        } = arguments[2];
        
        ${cleanCode}
        
        return ${componentName};
      `

      // Compile with Babel
      const compiled = Babel.transform(executableCode, {
        presets: [
          ['react', { runtime: 'classic' }],
          ['typescript', { allExtensions: true, isTSX: true }]
        ],
        plugins: []
      })

      // Create a function that returns the component
      const componentFactory = new Function(compiled.code || '')
      
      // Create the component with all dependencies
      const Component = componentFactory(
        React,
        {
          ...UIComponents,
          ...CardComponents,
          ...InputComponents,
          ...LabelComponents,
          ...TextareaComponents,
          ...SelectComponents,
          ...CheckboxComponents,
          ...RadioGroupComponents,
          ...SwitchComponents,
          ...SliderComponents,
          ...ProgressComponents,
          ...BadgeComponents,
          ...AvatarComponents,
          ...AlertComponents,
          ...DialogComponents,
          ...SheetComponents,
          ...TooltipComponents,
          ...PopoverComponents,
          ...TabsComponents,
          ...AccordionComponents,
          ...CollapsibleComponents,
          ...NavigationMenuComponents,
          ...MenubarComponents,
          ...ContextMenuComponents,
          ...DropdownMenuComponents,
          ...HoverCardComponents,
          ...CalendarComponents,
          ...FormComponents,
          ...TableComponents,
          ...PaginationComponents,
          ...BreadcrumbComponents,
          ...SeparatorComponents,
          ...AspectRatioComponents,
          ...ScrollAreaComponents,
          ...ResizableComponents,
          ...SkeletonComponents,
          ...SonnerComponents,
          ...ToastComponents,
          ...ToasterComponents,
          ...ToggleComponents,
          ...ToggleGroupComponents,
          ...ChartComponents,
          ...CarouselComponents,
          ...DrawerComponents,
          ...InputOtpComponents,
          ...CommandComponents,
          ...SidebarComponents
        },
        LucideIcons
      )

      return Component
    } catch (err) {
      console.error('Compilation error:', err)
      setError(err instanceof Error ? err.message : 'Failed to compile component')
      return null
    }
  }, [code])

  useEffect(() => {
    setRenderedComponent(compiledComponent)
  }, [compiledComponent])

  if (error) {
    return (
      <div className={`p-4 ${className}`}>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Compilation Error:</strong> {error}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (!RenderedComponent) {
    return (
      <div className={`flex items-center justify-center p-8 text-muted-foreground ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-muted flex items-center justify-center">
            <LucideIcons.Code className="h-8 w-8" />
          </div>
          <p>No component to render</p>
        </div>
      </div>
    )
  }

  try {
    return (
      <div className={`w-full ${className}`}>
        <RenderedComponent />
      </div>
    )
  } catch (renderError) {
    return (
      <div className={`p-4 ${className}`}>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Render Error:</strong> {renderError instanceof Error ? renderError.message : 'Failed to render component'}
          </AlertDescription>
        </Alert>
      </div>
    )
  }
}