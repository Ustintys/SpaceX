import {useEffect, useReducer} from "react";
import style from "./SpaceXList.module.scss";
import ky from "ky";
import type {Action, ServerData, State} from "../../Type.ts";
import {Button, Card, Image, Loader, Text} from "@mantine/core";
import Modal from "./Modal/Modal.tsx";



function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "GET_DATA":
      return {...state, serverData: action.payload};

    case "CHANGE_LOADING":
      return {...state, isLoading: action.payload};

    case "CHANGE_MODAL":
      return {...state, openModal: action.payload};

    case "GET_MODAL_DATA":
      return {...state, modalState: action.payload};

    default: return state
  }
}

const initialState = {
  serverData: [],
  isLoading: false,
  openModal: false,
  modalState: null,
}

function SpaceXList() {

  const [state, despatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getData(){
      try {
        const data = await ky
          .get('https://kata-spacex.onrender.com/api/launches')
          .json<any>();

        const transformData: ServerData[] = data.launches.map((item: any) => {
          return {
            id: item.flight_number,
            imgSmall: item.links?.mission_patch_small,
            imgLarge: item.links?.mission_patch,
            missionName: item.mission_name,
            rocketName: item.rocket?.rocket_name,
            details: item.details,
          }
        })
        despatch({type:'GET_DATA', payload: transformData});
        despatch({type:'CHANGE_LOADING', payload: true});

      } catch (err) {
        console.log(err);
      }

    }
    getData();
  }, []);

  function handlerOpenModal(id: number) {
    state.serverData.map((item: any) => {
      if (item.id === id) {
       return  despatch({type:'GET_MODAL_DATA',
                    payload: {
                      id: item.id,
                      imgLarge: item.imgLarge,
                      missionName: item.missionName,
                      rocketName: item.rocketName,
                      details: item.details,
                    }});
      }

    })

    despatch({type:'CHANGE_MODAL', payload: true})
  }

  function handleCloseModal() {
    despatch({type: "CHANGE_MODAL", payload: false});
  }


  return (
    <div>
      <h1 className={style.title}>SpaceX Launches 2020</h1>

      {state.isLoading ? (
        <div className={style.container}>
          {state.serverData.map((item: ServerData) => (
            <Card className={style.card} shadow="sm" padding="md" radius="md" withBorder key={item.id}>
              <Card.Section>
                <Image
                  src={item.imgSmall}
                  fallbackSrc="https://placehold.co/130x130?text=No+Image"
                  h={130}
                  w={130}
                  alt={item.missionName}
                  className={style.img}
                />
              </Card.Section>
              <Card.Section>
                <div className={style.flex}>
                  <Text className={style.textMissionName} fw={600}>{item.missionName}</Text>
                  <Text className={style.textRocketName}>{item.rocketName}</Text>
                  <Button className={style.button} w={185} onClick={() => {handlerOpenModal(item.id)}}>See more</Button>
                </div>
              </Card.Section>
            </Card>
          ))}
        </div>
      ) : ( <Loader className={style.loader} color="gray" type="dots" size="xl" /> )}
      {state.openModal && <Modal modalState={state.modalState} handleCloseModal={handleCloseModal} />}
    </div>
  )
}

export default SpaceXList