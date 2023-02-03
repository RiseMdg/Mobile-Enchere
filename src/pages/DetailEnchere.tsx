import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonItemDivider, IonButton, IonIcon } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { camera, trash, close } from 'ionicons/icons';
import { IonItem, IonLabel, IonAvatar, IonImg, IonActionSheet } from '@ionic/react';
import { usePhotoGallery, UserPhoto } from '../hooks/usePhotoGallery';
import { NavButtons } from '../components/NavButtons'
import sary from './1675445890.png';

interface ResetProps
    extends RouteComponentProps<{
        id: string;
    }> { }

interface Enchere {
    id: number,
    datedebut: string,
    datefin: string,
    produit: string,
    prixminimal: number,
    description: string,
    category_id: number,
    statut: string,
    images: any[]
}

const DetailEnchere: React.FC<ResetProps> = ({ match }) => {
    const { deletePhoto, photos, takePhoto, replacePhoto } = usePhotoGallery();
    const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();
    const history = useHistory();
    const [detailEnchere, setDetailEnchere] = useState<Enchere[]>([]);
    const [files, setFiles] = useState<string[]>([])
    const [images, setImages] = useState("");
    const id_enchere = match.params.id;
    // console.log(idVehicule);

    const i = id_enchere;


    useEffect(() => {
        const api = axios.create({
            baseURL: `https://ws-enchere-production.up.railway.app/enchere/`
        })
        api.get("/encheres/" + i,)
            .then(res => {
                console.log(res.data);
                var date = res.data.datedebut;
                var t = date.split(/[- T:.]/);
                var dates = t[2] + '/' + t[1] + '/' + t[0] + ' ' + t[3] + ':' + t[4] + ':' + t[5];
                var date1 = res.data.datefin;
                var t1 = date1.split(/[- T:.]/);
                var dates1 = t1[2] + '/' + t1[1] + '/' + t1[0] + ' ' + t1[3] + ':' + t1[4] + ':' + t1[5];
                const detailEnchere = {
                    id: res.data.id,
                    datedebut: dates,
                    datefin: dates1,
                    produit: res.data.produit,
                    prixminimal: res.data.prixminimal,
                    description: res.data.description,
                    category_id: res.data.category_id,
                    statut: res.data.statut,
                    images: res.data.images
                }
                setFiles(res.data.images);
                console.log(res.data.images)
                const detail = [detailEnchere]
                // Split timestamp into [ Y, M, D, h, m, s ]
                setDetailEnchere(detail);
            })
            .catch(error => {
                console.log("Error fetching data");
                console.log(error);
            })
    }, [])

    const onClickHandler = async (file:any) => {
        const result = await fetch("http://localhost:8080/image/"+file, {
          mode: "no-cors", // 'cors' by default
        });
        const blob = await result.blob()
        const url = await URL.createObjectURL(blob);
        setImages(url)
        console.log(url)
    }
    

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Details Enchere</IonTitle>
                    <IonButtons slot="end">
                        <NavButtons />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding ion-text-center">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            {
                                detailEnchere.map((enchere) => {
                                    return (
                                        <h4 key={enchere.produit}>{enchere.produit}</h4>
                                    );
                                })}
                            <IonItemDivider></IonItemDivider>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                    {detailEnchere.map((enchere) => {
                                    return (
                                        <h4 key={enchere.description}>{enchere.description}</h4>
                                    );
                                })}
                    </IonRow>
                    <IonItemDivider></IonItemDivider>
                    <IonRow>
                        <IonCol>
                            {
                                detailEnchere.map((enchere) => {
                                    return (
                                        <IonItem
                                            key={enchere.id}>
                                            <IonLabel>
                                                <h2><label>Statut: </label>{enchere.statut}</h2>
                                                <h3><label>Date de Debut: </label>{enchere.datedebut}</h3>
                                                <h3><label>Date de Fin: </label>{enchere.datefin}</h3>
                                                <h3><label>Prix Minimal: </label>{enchere.prixminimal}</h3>
                                                <h3><label>Category: </label>{enchere.category_id}</h3>
                                                <h3><label>Category: </label>{enchere.images}</h3>
                                            </IonLabel>
                                        </IonItem>
                                    );
                                })}
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default DetailEnchere;
