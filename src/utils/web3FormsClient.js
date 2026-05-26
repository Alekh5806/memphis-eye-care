const browserAccessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || ''

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}))

  if (!response.ok && !data.success) {
    throw new Error(data.message || 'Something went wrong. Please try again.')
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

  return parseResponse(response)
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

  return parseResponse(response)
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
