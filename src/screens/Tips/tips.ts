import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
  } from 'react-navigation';

export interface iProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export interface iServerResponse {
    data: iServerData
  }
  
export interface iServerData {
    dicas: iTip[]
    total_pages:number
  }


export interface iTip {
    ativo: string,
    data_cadastro: string
    descricao_completa:string,
    descricao_resumida:string,
    id: number,
    imagens:string,
    titulo:string,
    url:string,
}

