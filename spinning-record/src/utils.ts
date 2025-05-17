export const getTokenFromUrl = () => {
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.substring(1)).get('access_token');
    return token;
};