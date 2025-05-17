export async function exchangeCodeForToken(clientId: string, code: string) {
    const verifier = localStorage.getItem("verifier");
    if (!verifier) {
        throw new Error("Code verifier not found in localStorage.");
    }
    try {
        const res = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                client_id: clientId,
                grant_type: "authorization_code",
                code,
                redirect_uri: "http://localhost:5173/callback",
                code_verifier: verifier || "",
            }),
        });

        const data = await res.json();
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token); // Optional
        return data.access_token;
    } catch (error) {
        console.error("Failed to exchange code for token:", error);
        throw error;
    }
}