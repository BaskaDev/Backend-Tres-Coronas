
export interface Employee {
  idEmployee:number;
  nameEmployee: string;
  positionEmployee: string;
  hiringDateEmployee: string;
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

