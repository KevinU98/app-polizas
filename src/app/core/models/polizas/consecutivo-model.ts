import {ApiResponse} from '@Models/Response';

export type GetConsecutivoResponse = ApiResponse<GetConsecutivoData>;
export interface GetConsecutivoData{
    data: ConsecutivoModel[];
}

export interface ConsecutivoModel {
    Consecutivo: number;
}