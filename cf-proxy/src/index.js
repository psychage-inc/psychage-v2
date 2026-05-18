const ORIGIN = 'psychage-v2.vercel.app';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    url.hostname = ORIGIN;
    url.protocol = 'https:';
    url.port = '';

    const headers = new Headers(request.headers);
    headers.set('host', ORIGIN);
    headers.delete('cf-connecting-ip');
    headers.delete('cf-ipcountry');
    headers.delete('cf-ray');
    headers.delete('cf-visitor');

    const init = {
      method: request.method,
      headers,
      redirect: 'manual',
    };

    if (!['GET', 'HEAD'].includes(request.method)) {
      init.body = request.body;
    }

    const upstream = await fetch(url.toString(), init);

    const respHeaders = new Headers(upstream.headers);
    respHeaders.delete('content-encoding');
    respHeaders.delete('content-length');

    return new Response(upstream.body, {
      status: upstream.status,
      statusText: upstream.statusText,
      headers: respHeaders,
    });
  },
};
