import {ApiResponse} from '@Models/Response';
import { BeneficiarioModel } from '@Models/Polizas';

export type GetPolizasResponse = ApiResponse<GetPolizasData>;
export interface GetPolizasData{
    data: PolizaModel[];
}

export interface PolizaRequest {
    nombre: string;
    direccionParticular: string;
    colonia: string;
    telefono: string;
    poblacion: string;
    domicilioCobro: string;
    empresa: string;
    telEmpresa: string;
    calleEmpresa: string;
    beneficiario: string;
    edad: string;
    parentesco: string;
    vendedor: string;
    promotor: string;
}

export interface PolizaModel {
    Id: number;
    Nombre: string;
    DireccionParticular: string;
    Colonia: string;
    Telefono: string;
    Poblacion: string;
    DomicilioCobro: string;
    Empresa: string;
    TelEmpresa: string;
    CalleEmpresa: string;
    Beneficiario: string;
    Edad: string;
    Parentesco: string;
    Vendedor: string;
    Promotor: string;
    Renovacion: number;
    Fecha: string;
}