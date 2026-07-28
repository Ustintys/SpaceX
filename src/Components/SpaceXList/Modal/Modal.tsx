import {Card, Text, CloseButton, Image} from "@mantine/core";
import stule from './Modal.module.scss'
import style from "../SpaceXList.module.scss";


function Modal() {

  return (
    <div className={stule.container}>
      <Card>
        <Card.Section>
          <div className={stule.flex}>
            <Text></Text>
            <CloseButton />
          </div>
          <Image
            src={''}
            fallbackSrc="https://placehold.co/200x200?text=No+Image"
            h={200}
            w={200}
            alt={''}
            classNames={{root: style.img}}
          />
        </Card.Section>
        <Card.Section>
          <h4>Mission name</h4>
          <Text></Text>
          <h4> Rocket name</h4>
          <Text></Text>
          <h4>Details</h4>
          <Text></Text>
        </Card.Section>
      </Card>
    </div>
  )
}

export default Modal;