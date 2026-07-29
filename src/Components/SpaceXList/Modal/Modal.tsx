import {Card, Text, CloseButton, Image} from "@mantine/core";
import style from './Modal.module.scss'
import type {ModalProps} from "../../../Type.ts";
import {createPortal} from "react-dom";



function Modal({ modalState, handleCloseModal } : ModalProps) {

  const modalElement = document.getElementById("modal");

  return createPortal(
    (
      <div className={style.overlay}>
        <Card className={style.container}>
          <Card.Section>
            <div className={style.flex}>
              <Text>{modalState?.missionName}</Text>
              <CloseButton onClick={handleCloseModal} />
            </div>
            <Image
              src={modalState?.imgLarge}
              fallbackSrc="https://placehold.co/200x200?text=No+Image"
              h={200}
              w={200}
              alt={modalState?.missionName}
              className={style.img}
            />
          </Card.Section>
          <Card.Section inheritPadding>
            <h4>Mission name:</h4>
            <Text className={style.text}>{modalState?.missionName}</Text>
            <h4> Rocket name:</h4>
            <Text className={style.text}>{modalState?.rocketName}</Text>
            <h4>Details:</h4>
            <Text className={style.text}>{modalState?.details}</Text>
          </Card.Section>
        </Card>
      </div>
    ), modalElement!);
}

export default Modal;