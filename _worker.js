export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Only process POST requests to the API endpoint
    if (url.pathname === '/api/submit-inquiry' && request.method === 'POST') {
      try {
        const formData = await request.json();
        
        // Example: Validate input
        if (!formData.name || !formData.email || !formData.message) {
          return new Response(JSON.stringify({ error: 'Missing required fields' }), { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        
        // TODO: In a real environment, you would send an email here using an API like SendGrid, Resend, or Mailgun
        // Example: await sendEmail(formData);

        // Return success response
        return new Response(JSON.stringify({ success: true, message: 'Inquiry received' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid request' }), { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Pass-through for other requests (static assets)
    // When deploying on Cloudflare Pages, this worker will intercept API calls
    // and let Pages handle everything else automatically.
    return new Response("Not found", { status: 404 });
  }
};
