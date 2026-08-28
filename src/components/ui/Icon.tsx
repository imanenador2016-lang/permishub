import type { LucideProps } from 'lucide-react'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BookmarkCheck,
  Check,
  ChevronDown,
  ChevronRight,
  CreditCard,
  FileText,
  FlaskConical,
  Gauge,
  GraduationCap,
  Lightbulb,
  ListChecks,
  Lock,
  MapPin,
  Menu,
  ParkingCircle,
  RotateCcw,
  Route,
  ShieldAlert,
  Smartphone,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  TriangleAlert,
  UserRound,
  Wrench,
  X,
} from 'lucide-react'

/**
 * Registre volontairement restreint aux icônes utilisées par l'app (imports
 * nommés = tree-shakeable). `lucide-react` expose des centaines d'icônes ;
 * importer son objet `icons` complet gonflait le bundle de ~650 Ko.
 * Pour utiliser une nouvelle icône : l'importer ci-dessus puis l'ajouter ici.
 */
const ICON_REGISTRY = {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  BookmarkCheck,
  Check,
  ChevronDown,
  ChevronRight,
  CreditCard,
  FileText,
  FlaskConical,
  Gauge,
  GraduationCap,
  Lightbulb,
  ListChecks,
  Lock,
  MapPin,
  Menu,
  ParkingCircle,
  RotateCcw,
  Route,
  ShieldAlert,
  Smartphone,
  Sparkles,
  Target,
  Timer,
  TrendingUp,
  TriangleAlert,
  UserRound,
  Wrench,
  X,
} as const

export interface IconProps extends LucideProps {
  name: keyof typeof ICON_REGISTRY
}

export function Icon({ name, ...props }: IconProps) {
  const Component = ICON_REGISTRY[name]
  if (!Component) return null
  return <Component {...props} />
}
