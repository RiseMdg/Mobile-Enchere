import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons,IonCardTitle,IonCard,IonCardSubtitle} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory, RouteComponentProps } from "react-router-dom";
import { IonGrid, IonRow, IonCol } from '@ionic/react';
import { NavButtons } from '../components/NavButtons';
import style from "./CoffeeCard.module.css";

interface ResetProps
  extends RouteComponentProps<{
    id: string;
  }> { }

const ListEnchere: React.FC<ResetProps> = ({ match }) => {
  const history = useHistory();
  const [encheres, setEnchere] = useState<Array<any>>([]);

  const logout = () => {
    // console.log(vehicule);
    const token1 = localStorage.getItem('token');
    console.log('token before:' + token1)
    localStorage.setItem('token', '');
    const token2 = localStorage.getItem('token');
    console.log('token after:' + token2)
    history.push("/login/");
};

const getItemData = (enchere : any) => {
  // console.log(vehicule);
  history.push("/detailenchere/" + enchere.id);
};

const id_user = localStorage.getItem('id_user');

  const token = localStorage.getItem('token');
  const user_id = {
    "user_id" : id_user
  };
  useEffect(() => {
    const api = axios.create({
      baseURL: `https://ws-enchere-production.up.railway.app/enchere`
    })
    api.post("/encheresbyuserid", user_id)
      .then(res => {
        console.log(res.data)
        setEnchere(res.data)
      })
      .catch(error => {
        console.log("Error fetching data")
      })
  }, [])
  return (
    <IonPage>
			<IonHeader translucent>
        <IonToolbar color="primary">
          <IonTitle >List Enchere</IonTitle>
          <IonButtons slot="end">
            <NavButtons/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

			<IonContent fullscreen>

				<IonHeader collapse="condense">
					<IonToolbar className="inner-toolbar">
						<IonRow className="ion-no-padding ion-no-margin">
						</IonRow>
					</IonToolbar>
				</IonHeader>

				<IonGrid>
					<IonRow className="search-container">
					</IonRow>

					<IonRow className="outer-heading ion-justify-content-between ion-align-items-center">
					</IonRow>

					<IonRow>
						{ encheres.map(enchere => {

              return(
                <IonCol size="6" className="animate__animated animate__fadeIn">
                <IonCard className={ style.coffeeCard } onClick={() => getItemData(enchere)} >
                    <IonCardTitle>{ enchere.produit }</IonCardTitle>
                    <IonCardSubtitle>{ enchere.statut }</IonCardSubtitle>
                    <div className={ style.coffeePrice }>
                    </div>
                </IonCard>
            </IonCol>
              );
              
						})}
					</IonRow>

					<IonRow className="outer-heading">
						<IonCol size="12">
							<h4 className="heading">Special Offers</h4>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};


export default ListEnchere;
