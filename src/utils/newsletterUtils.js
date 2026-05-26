import { submitNewsletterForm } from './web3FormsClient'

export async function submitNewsletterSubscription(email, source) {
  return submitNewsletterForm({ email, source })
}