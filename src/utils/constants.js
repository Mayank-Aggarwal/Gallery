export const API_KEY = "9bf1fcafe50cadce6cb6b45736087688";
export const API_SECRET = "ff89393302f1cfb4";

export const GET_RECENT_IMAGE = 'flickr.photos.getRecent';
export const SEARCH_IMAGE = 'flickr.photos.search';

export const PAGE_SIZE = 12;

export function getImageUrl({ farm, server, id, secret }) {
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
}