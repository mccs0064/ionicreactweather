import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonButton, IonLoading, IonText } from '@ionic/react';
import React, { useState } from 'react';
import WeatherComponent from '../components/weather/WeatherComponent';
import { useWeatherForCurrentLocation } from '../hooks/weatherHook';
import { useHistory } from "react-router-dom";


const Home: React.FC = () => {

  const [isLoading, weather] = useWeatherForCurrentLocation();
  const [cityText, setCityText] = useState('');

  const history = useHistory();

  const formSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    history.push(`/forecast/${cityText}`);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Steven Weather App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLoading
          isOpen={isLoading}
          message={'Loading...'}
        />
        <h2>Current Weather</h2>
        { 
          weather ? <WeatherComponent {...weather}/> : null
        }

        {
          !isLoading && !weather ? <IonText color="danger"><h4 >Error</h4></IonText>: null
        }
        <h2>Get The 5 Day Weather Forecast</h2>
        <form onSubmit={(event) => formSubmit(event)}>
          <IonList>
            <IonItem>
              <IonLabel position="floating">Enter City</IonLabel>
              <IonInput name="name" type="text" onIonChange={(event) => setCityText(event.detail.value || '')}></IonInput>
            </IonItem>
          </IonList>
          <IonButton type='submit'>
            Submit
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Home;
