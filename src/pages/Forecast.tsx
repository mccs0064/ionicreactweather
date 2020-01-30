import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLoading, IonText, IonButtons, IonBackButton } from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import { useForecast } from '../hooks/weatherHook';
import WeatherComponent from '../components/weather/WeatherComponent';

interface ForecastPageProps extends RouteComponentProps<{city: string;}> {}

const Forecast: React.FC<ForecastPageProps> = ({match}) => {
  const [isLoading, forecast] = useForecast(match.params.city);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
            <IonTitle>Forecast For {match.params.city}: </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLoading isOpen={isLoading} message={'Loading...'}/>
        {
          !isLoading && !forecast ? <IonText color="danger"><h2>Error</h2></IonText>: null
        }
        {
          forecast ? forecast.map((weather, index) => <WeatherComponent key={index} {...weather}/>) : null
        }
      </IonContent>
    </IonPage>
  );
};

export default Forecast;
