// Generates a secure random code verifier
export const generateCodeVerifier = (length: number = 128): string => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let text = '';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

// Creates a SHA-256-based code challenge from the verifier
export const generateCodeChallenge = async (codeVerifier: string): Promise<string> => {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    const base64 = btoa(String.fromCharCode(...new Uint8Array(digest)));

    // Base64-url-encode
    return base64
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
};

// Redirects user to Spotify login with PKCE challenge
export const redirectToAuthCodeFlow = async (clientId: string): Promise<void> => {
    const verifier = generateCodeVerifier();
    const challenge = await generateCodeChallenge(verifier);
    const state = crypto.randomUUID(); // Optional: for CSRF protection

    // Store verifier & state for use after redirect
    localStorage.setItem('verifier', verifier);
    localStorage.setItem('state', state);

    const params = new URLSearchParams({
        client_id: clientId,
        response_type: 'code',
        redirect_uri: 'http://localhost:5173/callback',
        scope: 'user-read-playback-state user-read-currently-playing user-read-email',
        code_challenge_method: 'S256',
        code_challenge: challenge,
        state: state,
    });

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
};
