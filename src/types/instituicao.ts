export interface InstituicaoEnsino {
    id: number;
    codigo_ies: string;
    name: string;
    sigla?: string;
    uf: string;
    codigo_municipio_ibge: string;
    municipio: string;
}