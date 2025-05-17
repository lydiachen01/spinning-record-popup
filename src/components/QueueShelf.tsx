// QueueShelf.tsx
import '../styles/QueueShelf.css';
import type { SpotifyTrack } from "../types/SpotifyTrack";

type QueueShelfProps = {
    tracks: SpotifyTrack[];
};

const QueueShelf = ({ tracks }: QueueShelfProps) => (
    <div className="queue-shelf">
        {tracks.map((t, i) => (
            <div key={i} className="queue-item">
                <img src={t.album.images[2].url} width="40" />
                <span>{t.name}</span>
            </div>
        ))}
    </div>
);

export default QueueShelf;
