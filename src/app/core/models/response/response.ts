export interface ApiResponse<T> {
    StatusCode: number;
    success: boolean;
    message: string;
    response: T;
}