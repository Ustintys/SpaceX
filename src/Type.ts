export type ServerData = {
  id: number;
  imgSmall: string;
  imgLarge: string;
  missionName: string;
  rocketName: string;
  details: string;
}

export type State = {
  serverData: ServerData[];
  isLoading: boolean;
}

export type Action =
  | { type: "GET_DATA";
      payload: ServerData[];
    }
  | { type: "CHANGE_LOADING";
      payload: boolean;
    };