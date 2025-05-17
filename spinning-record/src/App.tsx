// App.tsx

import { useEffect, useState } from "react";
import RecordPlayer from "./components/RecordPlayer";
import QueueShelf from "./components/QueueShelf";
import { redirectToAuthCodeFlow } from "./auth";
import { fetchQueue, fetchCurrentlyPlaying } from "./api/fetchQueue";
import { exchangeCodeForToken } from "./token";
import type { SpotifyTrack } from "./types/SpotifyTrack";

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID as string;

function App() {
  const [authorized, setAuthorized] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [track, setTrack] = useState<SpotifyTrack | null>(null);
  const [queue, setQueue] = useState<SpotifyTrack[]>([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");

    async function handleAuthFlow() {
      const code = new URLSearchParams(window.location.search).get("code");

      try {
        if (code && !storedToken) {
          const newToken = await exchangeCodeForToken(CLIENT_ID, code);
          localStorage.setItem("access_token", newToken);
          setToken(newToken);
          setAuthorized(true);
        } else if (storedToken) {
          setToken(storedToken);
          setAuthorized(true);
        } else {
          redirectToAuthCodeFlow(CLIENT_ID);
        }
      } catch (err) {
        console.error("Auth failed:", err);
        localStorage.removeItem("access_token");
        setAuthorized(false);
        redirectToAuthCodeFlow(CLIENT_ID);
      }
    }

    handleAuthFlow();
  }, []);


  useEffect(() => {
    if (!token) return;

    const loadSpotifyData = async () => {
      try {
        const current = await fetchCurrentlyPlaying(token);
        if (current?.item) setTrack(current.item);

        const q = await fetchQueue(token);
        if (q?.queue) setQueue(q.queue);
      } catch (err) {
        console.error("Failed to fetch Spotify data:", err);
      }
    };

    loadSpotifyData();
  }, [token]);

  if (!authorized) {
    return <div>Loading your Spotify-connected app...</div>;
  }

  return (
    <div style={{ background: "transparent", position: "fixed", bottom: 20, left: 20 }}>
      {track?.album?.images?.[0]?.url && (
        <RecordPlayer imageUrl={track.album.images[0].url} />
      )}
      {queue.length > 0 && <QueueShelf tracks={queue} />}
    </div>
  );
}

export default App;
