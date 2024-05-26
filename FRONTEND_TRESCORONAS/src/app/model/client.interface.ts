
export interface Client {
  id_client: number;
    name_client: string;
    user_client: string;
    pass_client: string;
    gang:{
        idGang:number,
        nameGang: string;
        numberMembersGang: number;
        site: {
          idSite: number;
          bar: {
            idBar: number;
            nameBar: string;
            addressBar: string;
            locallyBar: string;
          },
        },
      } , 
    status_client: {
      id_status:number;
        type_status:string;
    }
        
  }