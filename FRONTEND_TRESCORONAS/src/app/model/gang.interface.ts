
export interface Gang {
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
      };
    };
  }