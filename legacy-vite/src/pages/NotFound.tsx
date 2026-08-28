import { Link } from 'react-router-dom'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-display text-6xl font-semibold text-ink-950">404</p>
      <p className="mt-3 text-ink-500">Cette page n’existe pas.</p>
      <Link to="/" className="mt-6">
        <Button>Retour à l’accueil</Button>
      </Link>
    </Container>
  )
}
