import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface PurchasesState {
  /** Slugs des centres dont l'accès aux circuits a été payé et confirmé. */
  purchasedCenterSlugs: string[]
  hasPurchased: (centerSlug: string) => boolean
  /**
   * À appeler UNIQUEMENT après confirmation réelle du paiement (retour
   * Stripe / webhook côté serveur) — jamais directement depuis le clic sur
   * le bouton d'achat. Tant que Stripe n'est pas branché, rien n'appelle
   * cette fonction : voir src/lib/payment.ts.
   */
  confirmPurchase: (centerSlug: string) => void
}

/**
 * État d'achat persisté localement (localStorage). Placeholder en attendant
 * un vrai back-end de paiement (Stripe) + compte utilisateur (Supabase) :
 * la forme de cet état ne devrait pas changer une fois ces briques
 * branchées, seule la source de vérité migrera du localStorage vers le
 * serveur — voir docs/ARCHITECTURE.md et src/lib/payment.ts.
 */
export const usePurchasesStore = create<PurchasesState>()(
  persist(
    (set, get) => ({
      purchasedCenterSlugs: [],
      hasPurchased: (centerSlug) => get().purchasedCenterSlugs.includes(centerSlug),
      confirmPurchase: (centerSlug) =>
        set((state) => ({
          purchasedCenterSlugs: state.purchasedCenterSlugs.includes(centerSlug)
            ? state.purchasedCenterSlugs
            : [...state.purchasedCenterSlugs, centerSlug],
        })),
    }),
    { name: 'permishub.purchases' },
  ),
)
