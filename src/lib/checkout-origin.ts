/**
 * Return URLs sent to Stripe must use the app's configured public origin.
 * The incoming Origin header is browser-controlled but can be forged against
 * a server endpoint, which would let an attacker redirect buyers elsewhere
 * after Checkout.
 */
export function getCheckoutOrigin(request: Request): string {
  const requestUrl = new URL(request.url)
  const isLocalHttp = requestUrl.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(requestUrl.hostname)

  // Local dev servers may run on non-default ports (3030, 3032, etc.). Use
  // their actual local origin so Stripe returns to the app the buyer opened.
  // Production always uses the configured HTTPS origin below.
  // A production build can also be smoke-tested on localhost. Loopback is
  // safe to trust here and ensures Checkout returns to the port actually used.
  if (isLocalHttp) {
    return requestUrl.origin
  }

  const configuredOrigin = process.env.NEXTAUTH_URL
  const candidate = configuredOrigin || requestUrl.origin

  try {
    const url = new URL(candidate)
    const isConfiguredLocalHttp = url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname)
    if (url.protocol !== 'https:' && !isConfiguredLocalHttp) {
      throw new Error('Checkout origin must use HTTPS')
    }
    return url.origin
  } catch {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('NEXTAUTH_URL must be a valid HTTPS origin for Stripe Checkout')
    }
    return new URL(request.url).origin
  }
}
