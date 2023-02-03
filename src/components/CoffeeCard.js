import { IonCard, IonCardSubtitle, IonCardTitle, IonCol } from "@ionic/react";

import styles from "./CoffeeCard.module.css";

const CoffeeCard = props => {

    const { enchere } = props;

    return (

        <IonCol size="6" className="animate__animated animate__fadeIn">
            <IonCard className={ styles.coffeeCard }>
                <img alt="coffee" />
                <IonCardTitle>{ enchere.produit }</IonCardTitle>
                <IonCardSubtitle>{ enchere.Statut }</IonCardSubtitle>
                <IonCardSubtitle>{ enchere.description }</IonCardSubtitle>
                <div className={ styles.coffeePrice }>
                    <h4>${ enchere.datedebut }</h4>
                    <h4>${ enchere.datefin }</h4>
                    <h4>${ enchere.prixminimal }</h4>
                    <h4>${ enchere.category_id }</h4>
                    <div className={ styles.coffeeAddButton }>
                    </div>
                </div>
            </IonCard>
        </IonCol>
    );
}

export default CoffeeCard;