export type SpotifyTrack = {
    album: {
        album_type: string;
        artists: { name: string }[];
        external_urls: { spotify: string };
        images: { url: string; height: number; width: number }[];
        name: string;
    };
    artists: { name: string }[];
    name: string;
    duration_ms: number;
    external_urls: { spotify: string };
    id: string;
    uri: string;
};
