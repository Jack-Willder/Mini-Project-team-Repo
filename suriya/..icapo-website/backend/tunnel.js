const { Cloudflared } = require('cloudflared');

async function startNamedTunnel() {
  const tunnel = new Cloudflared();
  try {
    // Install cloudflared binary if not already installed
    await tunnel.install();

    // Start the named tunnel using your token
    const service = await tunnel.createTunnel({
      token: 'eyJhIjoiMWIyZDUwNTgxMDkzNGU3MzgzMTJlYTZkMTZiYWRiNTYiLCJ0IjoiNzdjODk4MjAtNTJhNy00YjZiLTk0N2ItMWQ1MGNkYWE2ZGJiIiwicyI6Ik5qY3dZekU0TlRBdFlqTXhaaTAwWmpneUxUZzFaakF0TkdJMU1ESTFPVEl3WVRZNCJ9', // From Zero Trust dashboard
      serviceMode: true, // Run as a persistent service
    });

    console.log('Tunnel running at:', service.url); // e.g., https://app.yourdomain.com
    console.log('Tunnel ID:', service.id);

    // Handle tunnel events
    service.on('close', () => {
      console.log('Tunnel closed');
    });
    service.on('error', (err) => {
      console.error('Tunnel error:', err);
    });

    // Graceful shutdown
    process.on('SIGINT', () => {
      service.close();
      process.exit();
    });
  } catch (error) {
    console.error('Failed to start tunnel:', error);
  }
}

startNamedTunnel();