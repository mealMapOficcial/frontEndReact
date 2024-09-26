  export interface Table {
    idTable: number;
    numberOfChairs: number;
    disponibility: boolean;
    floor: number;
    available: boolean; // Nueva propiedad agregada
  }
  export interface Floor {
    floorNumber: number;
    tables: Table[];
  }
  