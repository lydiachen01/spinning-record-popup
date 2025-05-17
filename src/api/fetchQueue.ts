import type { SpotifyTrack } from "../types/SpotifyTrack"; // Optional if you use types

export const fetchQueue = async (token: string) => {
    const res = await fetch("https://api.spotify.com/v1/me/player/queue", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.ok ? res.json() : null;
};


export const fetchCurrentlyPlaying = async (token: string): Promise<{ item: SpotifyTrack } | null> => {
    const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok || res.status === 204) return null; // 204 = No Content
    return res.json();
};
