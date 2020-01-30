import React from 'react';
import { Weather } from '../../models/weather';
import { IonCard, IonCardContent, IonText, IonImg } from '@ionic/react';
import './weather.css';
const WeatherComponent: React.FC<Weather> = (props: Weather) => {
  const imageSrc: string = `https://openweathermap.org/img/wn/${props.icon}@2x.png`
  const dateText: string = props.date.toDateString()
  return (
    <IonCard className="weather-component">
      <IonCardContent className="ion-text-center">
        <IonText>{dateText}</IonText>
        <IonImg className="weather-img" src={imageSrc}></IonImg>
        <IonText className="temp">{props.temp}&#8451;</IonText>
        <IonText>{props.name}</IonText>
        <IonText>{props.description}</IonText>
      </IonCardContent>
    </IonCard>
  )
}

export default WeatherComponent;