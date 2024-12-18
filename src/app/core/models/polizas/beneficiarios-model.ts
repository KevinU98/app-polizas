import {ApiResponse} from '@Models/Response';

export type GetBeneficiariosResponse = ApiResponse<GetBeneficiariosData>;
export interface GetBeneficiariosData{
    data: BeneficiarioModel[];
}

export interface GetBeneficiarioRequest {
    consecutivo: number;
}

export interface BeneficiarioRequest {
    consecutivoPoliza: number;
    nombre: string;
    edad: number;
    parantesco: string;
    usuario: number;
}

export interface BeneficiarioModel {
    Id: number;
    ConsecutivoPoliza: number;
    Nombre: string;
    Edad: number;
    Parantesco: string;
    usuario: number;
}