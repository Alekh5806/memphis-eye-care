const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || ''

async function submitToWeb3Forms(payload) {
  if (!accessKey) {
    throw new Error(
      'Web3Forms access key is not configured. Set VITE_WEB3FORMS_ACCESS_KEY as a build environment variable on your hosting platform.',
    )
  }

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      access_key: accessKey,
    }),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok && !data.success) {
    throw new Error(data.message || 'Form submission failed. Please try again.')
  }

  return data
}

export function submitContactForm(payload) {
  return submitToWeb3Forms({
    ...payload,
    subject: 'New website enquiry - Memphis Vision Care',
    from_name: 'Memphis Vision Care Website',
  })
}

export function submitNewsletterForm(payload) {
  return submitToWeb3Forms({
    ...payload,
    subject: 'New newsletter subscription - Memphis Vision Care',
    from_name: 'Memphis Vision Care Website',
    form_type: 'Newsletter subscription',
  })
}
