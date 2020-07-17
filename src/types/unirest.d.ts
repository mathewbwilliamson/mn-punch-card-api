declare module 'unirest';

// There's lots of stuff and I'm lazy
interface UnirestResponse<T> {
    error: any;
    body: T;
    method: string;
}
