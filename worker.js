const jsonHeaders = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Accept',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  })
}

async function readJson(request) {
  try {
    return await request.json()
  } catch {
    return null
  }
}

function getWeb3FormsAccessKey(env) {
  return env.WEB3FORMS_ACCESS_KEY || env.VITE_WEB3FORMS_ACCESS_KEY || ''
}

async function submitToWeb3Forms(payload, env) {
  const accessKey = getWeb3FormsAccessKey(env)

  if (!accessKey) {
    return jsonResponse({
      success: false,
      message: 'Server is missing Web3Forms configuration.',
    }, 500)
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

  let data = await response.json().catch(() => ({}))
  const isSuccess = response.ok || data.success

  if (!isSuccess && !data.message) {
    data = {
      ...data,
      success: false,
      message: 'Web3Forms rejected the request. Please check the access key.',
    }
  }

  return jsonResponse(data, isSuccess ? 200 : response.status || 500)
}

async function handleContact(request, env) {
  if (request.method !== 'POST') {
    return jsonResponse({ success: false, message: 'Method not allowed.' }, 405)
  }

  const payload = await readJson(request)
  if (!payload?.email || !payload?.message || !payload?.name) {
    return jsonResponse({ success: false, message: 'Missing required contact fields.' }, 400)
  }

  return submitToWeb3Forms({
    ...payload,
    subject: 'New website enquiry - Memphis Vision Care',
    from_name: 'Memphis Vision Care Website',
  }, env)
}

async function handleNewsletter(request, env) {
  if (request.method !== 'POST') {
    return jsonResponse({ success: false, message: 'Method not allowed.' }, 405)
  }

  const payload = await readJson(request)
  if (!payload?.email) {
    return jsonResponse({ success: false, message: 'Email is required.' }, 400)
  }

  return submitToWeb3Forms({
    email: payload.email,
    source: payload.source || 'Website newsletter',
    subject: 'New newsletter subscription - Memphis Vision Care',
    from_name: 'Memphis Vision Care Website',
    form_type: 'Newsletter subscription',
  }, env)
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: jsonHeaders,
      })
    }

    if (url.pathname === '/api/forms') {
      return jsonResponse({
        success: true,
        message: 'Forms API is available.',
        endpoints: ['/api/forms/contact', '/api/forms/newsletter'],
      })
    }

    if (url.pathname === '/api/forms/contact') {
      return handleContact(request, env)
    }

    if (url.pathname === '/api/forms/newsletter') {
      return handleNewsletter(request, env)
    }

    return env.ASSETS.fetch(request)
  },
}
