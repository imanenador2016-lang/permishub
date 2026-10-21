export function CircuitConstructionFaq() {
  return (
    <details className="group py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base marker:hidden sm:text-lg">
        Comment sont construits les parcours d’examen PermisHub&nbsp;?
        <span aria-hidden="true" className="flex h-8 w-8 flex-none items-center justify-center border-2 border-ink text-lg leading-none transition-transform group-open:rotate-45">+</span>
      </summary>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/75">
        Chez PermisHub, nous privilégions la qualité à la quantité. Notre équipe construit et recoupe chaque circuit à partir d’itinéraires réellement empruntés lors des examens de nos candidats, des retours de nos auto-écoles partenaires et des points de passage publiés par les centres d’examen.
      </p>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink/75">
        Nous faisons tout notre possible pour proposer quatre circuits cohérents par centre. Ce travail de vérification explique pourquoi seuls certains centres sont disponibles sur PermisHub. Les conditions de circulation et le trajet choisi peuvent toutefois varier le jour de l’examen.
      </p>
    </details>
  )
}
