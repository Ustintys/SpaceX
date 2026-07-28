import {useEffect, useReducer} from "react";
import style from "./SpaceXList.module.scss";
import ky from "ky";
import type {Action, ServerData, State} from "../../Type.ts";
import {Button, Card, Image, Loader, Text} from "@mantine/core";



function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "GET_DATA":
      return {...state, serverData: action.payload};

    case "CHANGE_LOADING":
      return {...state, isLoading: action.payload};

    default: return state
  }
}

const initialState = {
  serverData: [],
  isLoading: false,
}

function SpaceXList() {

  const [state, despatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function getData(){
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
    }
    getData();
  }, []);

  console.log(state.serverData);

  return (
    <div>
      <h1 className={style.title}>SpaceX Launches 2020</h1>

      {state.isLoading ? (
        <div className={style.container}>
          {state.serverData.map((item: ServerData) => (
            <Card classNames={{root: style.card}} shadow="sm" padding="md" radius="md" withBorder key={item.id}>
              <Card.Section>
                <Image
                  src={item.imgSmall}
                  fallbackSrc="https://placehold.co/130x130?text=No+Image"
                  h={130}
                  w={130}
                  alt={item.missionName}
                  classNames={{root: style.img}}
                />
              </Card.Section>
              <Card.Section>
                <div className={style.flex}>
                  <Text classNames={{root: style.textMissionName}} fw={600}>{item.missionName}</Text>
                  <Text classNames={{root: style.textRocketName}}>{item.rocketName}</Text>
                  <Button classNames={{root: style.button}} w={185}>See more</Button>
                </div>
              </Card.Section>
            </Card>
          ))}
        </div>
      ) : ( <Loader classNames={{root: style.loader}} color="gray" type="dots" size="xl" /> )}
    </div>
  )
}

export default SpaceXList