const web3FormsAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || ''

export async function submitNewsletterSubscription(email, source) {
  if (!web3FormsAccessKey) {
    throw new Error('Web3Forms access key is not configured yet.')
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: web3FormsAccessKey,
      email,
      subject: 'New newsletter subscription - Memphis Vision Care',
      from_name: 'Memphis Vision Care Website',
      form_type: 'Newsletter subscription',
      source,
    }),
  })

  let data = {}
  try {
    data = await response.json()
  } catch {
    data = {}
  }

  if (!response.ok && !data.success) {
    throw new Error(data.message || 'Something went wrong. Please try again.')
  }

  return data
}