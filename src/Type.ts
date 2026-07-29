export type ServerData = {
  id: number;
  imgSmall: string;
  imgLarge: string;
  missionName: string;
  rocketName: string;
  details: string;
}

export type ModalProps = {
  modalState: ModalState | null;
  handleCloseModal: () => void;
};

export type ModalState = {
  id: number;
  imgLarge: string;
  missionName: string;
  rocketName: string;
  details: string;
}

export type State = {
  serverData: ServerData[];
  isLoading: boolean;
  openModal: boolean;
  modalState: ModalState | null;
}

export type Action =
  | { type: "GET_DATA";
      payload: ServerData[];
    }
  | { type: "CHANGE_LOADING";
      payload: boolean;
    }
  | { type: "CHANGE_MODAL";
      payload: boolean;
    }
  | { type: "GET_MODAL_DATA";
      payload: ModalState;
    }
