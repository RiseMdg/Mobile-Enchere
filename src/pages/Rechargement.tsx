import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonButtons,IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar, IonAlert } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import {IonAvatar } from '@ionic/react';
import { NavButtons } from '../components/NavButtons';

const Rechargement: React.FC = () => {
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [sex, setSex] = useState('')
  const [solde, setSolde] = useState()
  const [montant, setMontant] = useState(NaN)
  const [showAlert, setShowAlert] = useState(false) 

  const rechargement = async () => {

    const rechargement = {
      "solde": montant,
      "user_id": 1
  }

      const api = axios.create({
        baseURL: `https://ws-enchere-production.up.railway.app/enchere`
      })
      api.post("/solde", rechargement)
          .then(res => {             
              console.log(res);
           })
           .catch(error=>{
              console.log(error)
           })
  }

  const checkSolde = {
    "user_id": 1
}


  useEffect(() => {
    const api = axios.create({
      baseURL: `https://ws-enchere-production.up.railway.app/enchere`
    })
    api.post("/checkSolde", checkSolde)
        .then(res => {             
            console.log(res);
            setSolde(res.data.solde)
         })
         .catch(error=>{
            console.log(error)
         })
  }, [])

  // while ( 1 == 1) {
  //   updatePerson();
  // }

  // const deleteTodo = async (id: string) => {
  //   // TODO
  // }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>My Todos</IonTitle>
          <IonButtons slot="end">
            <NavButtons/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel>Montant</IonLabel>
          <IonInput id='montant'
            onIonChange={(e) => setMontant(Number(e.detail.value))}
            placeholder='Montant'></IonInput>
          <IonButton slot='end' onClick={() => rechargement()} fill="clear">
            RECHARGER
          </IonButton>
        </IonItem>
        <IonItem>
          <IonLabel>SOLDE</IonLabel>
          </IonItem>
        <IonItem>
          <IonLabel>{solde}</IonLabel>
          <IonAlert
          id='alert'
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        message="Fill The Input"
        buttons={['OK']}
      />
        </IonItem>
        
        <IonList>
        </IonList>
      </IonContent>
    </IonPage >
  );
};

export default Rechargement;
