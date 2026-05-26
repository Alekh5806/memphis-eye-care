const jsonHeaders = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
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

  const data = await response.json().catch(() => ({}))

  return jsonResponse(data, response.ok || data.success ? 200 : response.status || 500)
}

export async function onRequest({ request, env }) {
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
