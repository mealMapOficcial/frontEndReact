export interface Table {
    id: string;
    numberOfChairs: number;
    isAvailable: boolean;
  }
  
  export interface Floor {
    floorNumber: number;
    tables: Table[];
  }
  