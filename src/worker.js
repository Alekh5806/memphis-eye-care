const legacyRedirects = new Map([
  ['/index.php', '/'],
  ['/about.php', '/about'],
  ['/our-products.php', '/products'],
  ['/contact.php', '/contact'],
  ['/partner.php', '/partner-with-us'],
  ['/quality.php', '/quality'],
  ['/production-facility.php', '/manufacturing'],
  ['/manufacturing-contract.php', '/contract-manufacturing'],
  ['/regularity.php', '/quality'],
  ['/manf-contract.php', '/contract-manufacturing'],
  ['/facility.php', '/manufacturing'],
])

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

async function handleForms(request, env, pathname) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: jsonHeaders,
    })
  }

  if (pathname === '/api/forms') {
    if (request.method !== 'GET') {
      return jsonResponse({ success: false, message: 'Method not allowed.' }, 405)
    }

    return jsonResponse({
      success: true,
      message: 'Forms API is available.',
      endpoints: ['/api/forms/contact', '/api/forms/newsletter'],
    })
  }

  if (request.method !== 'POST') {
    return jsonResponse({ success: false, message: 'Method not allowed.' }, 405)
  }

  const payload = await readJson(request)

  if (pathname === '/api/forms/contact') {
    if (!payload?.email || !payload?.message || !payload?.name) {
      return jsonResponse({ success: false, message: 'Missing required contact fields.' }, 400)
    }

    return submitToWeb3Forms({
      ...payload,
      subject: 'New website enquiry - Memphis Vision Care',
      from_name: 'Memphis Vision Care Website',
    }, env)
  }

  if (pathname === '/api/forms/newsletter') {
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

  return jsonResponse({ success: false, message: 'Not found.' }, 404)
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const legacyTarget = legacyRedirects.get(url.pathname)

    if (legacyTarget) {
      const destination = new URL(legacyTarget, url.origin)
      destination.search = url.search
      return Response.redirect(destination.toString(), 301)
    }

    if (url.pathname === '/api/forms' || url.pathname.startsWith('/api/forms/')) {
      return handleForms(request, env, url.pathname)
    }

    return env.ASSETS.fetch(request)
  },
}
