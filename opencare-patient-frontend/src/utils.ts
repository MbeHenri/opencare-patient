export function base64(str: string): string {
    return Buffer.from(str, 'binary').toString('base64');
    //return btoa(str);

}