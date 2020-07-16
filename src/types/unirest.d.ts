declare module 'unirest';

// There's lots of stuff and I'm lazy
interface unirestResponse<T> {
    error: any;
    body: T;
    method: string;
}
