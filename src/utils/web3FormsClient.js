const browserAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || ''

async function parseResponse(response, unavailableMessage) {
  const contentType = response.headers.get('content-type') || ''
  const data = contentType.includes('application/json')
    ? await response.json().catch(() => ({}))
    : {}

  if (!response.ok || data.success === false) {
    throw new Error(data.message || unavailableMessage || `Form submission failed with status ${response.status}.`)
  }

  return data
}

async function submitDirect(payload) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      ...payload,
      access_key: browserAccessKey,
    }),
  })

  return parseResponse(response, 'Web3Forms rejected the request. Please check the access key.')
}

async function submitViaWorker(path, payload) {
  const response = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  return parseResponse(
    response,
    'Form endpoint is not available on this deployment. Configure the Worker route or rebuild with VITE_WEB3FORMS_ACCESS_KEY.',
  )
}

export function submitContactForm(payload) {
  if (browserAccessKey) {
    return submitDirect({
      ...payload,
      subject: 'New website enquiry - Memphis Vision Care',
      from_name: 'Memphis Vision Care Website',
    })
  }

  return submitViaWorker('/api/forms/contact', payload)
}

export function submitNewsletterForm(payload) {
  if (browserAccessKey) {
    return submitDirect({
      ...payload,
      subject: 'New newsletter subscription - Memphis Vision Care',
      from_name: 'Memphis Vision Care Website',
      form_type: 'Newsletter subscription',
    })
  }

  return submitViaWorker('/api/forms/newsletter', payload)
}
