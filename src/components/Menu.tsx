import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonMenuToggle,
  IonItem,
  IonLabel,
} from "@ionic/react";
import React from "react";

export const Menu = () => {
  return (
    <IonMenu side="end" contentId="main">
      <IonHeader>
        <IonToolbar color="light">
          <IonTitle>MENU</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink={"/listenchere/"} routerDirection="none">
              <IonLabel>List Enchere</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle auto-hide="false">
            <IonItem button routerLink={"/ajouterenchere/"} routerDirection="none">
              <IonLabel>Ajouter Enchere</IonLabel>
            </IonItem>
            <IonItem button routerLink={"/rechargement"} routerDirection="none">
              <IonLabel>Recharger Solde</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
