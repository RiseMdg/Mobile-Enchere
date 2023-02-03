import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonButtons,IonActionSheet, IonLabel, IonIcon, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar, IonAlert } from '@ionic/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { camera, trash, close } from 'ionicons/icons';
import { usePhotoGallery, UserPhoto,base64FromPath } from '../hooks/usePhotoGallery';
import { IonGrid, IonRow, IonCol, IonImg } from '@ionic/react';
import { start } from 'repl';
import { NavButtons } from '../components/NavButtons';

const AjouterEnchere: React.FC = () => {
  const { deletePhoto, photos, takePhoto, replacePhoto } = usePhotoGallery();
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto>();
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [sex, setSex] = useState('')
  const [duree, setDuree] = useState(NaN)
  const [produit, setProduit] = useState('')
  const [prixminimal, setPrixminimal] = useState(NaN)
  const [description, setDescription] = useState('')
  const [category_id, setCategory_id] = useState(NaN)
  const [category, setCategory] = useState<Array<any>>([]);
  const [showAlert, setShowAlert] = useState(false) 

  useEffect(() => {
    const api = axios.create({
      baseURL: `https://ws-enchere-production.up.railway.app/enchere/`
    })
    api.get("/categories")
      .then(res => {
        console.log(res.data)
        setCategory(res.data)
      })
      .catch(error => {
        console.log("Error fetching data")
      })
  }, [])

  const b64toBlob = (b64Data: string, contentType='', sliceSize=512) => {

    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
  
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }
  

  let ids: (string | undefined)[] = [];

  {photos.map(async (photo, index) => (
    setNom(await base64FromPath(photo.webviewPath!))
))}

// const blob = b64toBlob(ids[0], "multipart/form-data");

  const createPerson = async () => {


    console.log(category_id)

    // console.log(nom)
    const one = nom.split(";",1)
    // console.log(one)
    const two = one.toString().split(":")
    // console.log(two[1])
    const contentType = two[1].toString();
    const mainone = nom.split(";")
    // console.log(mainone[1])
    const maintwo = mainone[1].toString().split(",")
    // console.log(maintwo[1])
    
const b64Data = maintwo[1].toString();

const blob = b64toBlob(b64Data, contentType);

    var body = {
      "duree": duree,
      "produit": produit,
      "prixminimal": prixminimal,
      "description": description,
      "category_id": category_id,
      "user_id": 1
  }

  const upload = async () =>{

  }
  var enchere = JSON.stringify(body);
  console.log(enchere)
    var bodyFormData = new FormData();
    bodyFormData.append('enchere', enchere);
    bodyFormData.append('files', blob); 
    console.log(blob)

    console.log(bodyFormData)

    axios({
      method: "post",
      url: "https://ws-enchere-production.up.railway.app/encheress",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    
  }

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
          <IonTitle>Ajoueter Enchere</IonTitle>
          <IonButtons slot="end">
            <NavButtons/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel>Duree</IonLabel>
          <IonInput id='duree'
            onIonChange={(e) => setDuree(Number(e.detail.value!))}
            placeholder='Duree' inputmode='numeric'></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Produit</IonLabel>
          <IonInput id='produit'
            onIonChange={(e) => setProduit(e.detail.value!)}
            placeholder='Produit'></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Prix Minimal</IonLabel>
          <IonInput id='prix_minimal'
            onIonChange={(e) => setPrixminimal(Number(e.detail.value!))}
            placeholder='Prix_minimal' inputmode='numeric'></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Description</IonLabel>
          <IonInput id='description'
            onIonChange={(e) => setDescription(e.detail.value!)}
            placeholder='Description'></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Category</IonLabel>
          </IonItem>
        <IonItem>
        <IonSelect id='category_id' onIonChange={(e) => setCategory_id(e.detail.value!)} interface="popover" placeholder="Select Category">
        {category.map((cat) => {
          return(
            <IonSelectOption value={cat.id}>{cat.nom}</IonSelectOption>
          );
          })}
          </IonSelect>
        </IonItem>
        <IonItem>
        </IonItem>
        {photos.map((photo, index) => (
                              <IonCol size="3" key={index}>
                              <IonImg onClick={() => setPhotoToDelete(photo)} src={photo.webviewPath} />
                            </IonCol>
            ))}
        <IonItem>
        <IonButton onClick={() => takePhoto()}>add<IonIcon icon={camera}></IonIcon></IonButton>
            <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[{
            text: 'Delete',
            role: 'destructive',
            icon: trash,
            handler: () => {
              if (photoToDelete) {
                deletePhoto(photoToDelete);
                setPhotoToDelete(undefined);
              }
            }
          }, {
            text: 'Cancel',
            icon: close,
            role: 'cancel'
          }]}
          onDidDismiss={() => setPhotoToDelete(undefined)}
        />
        </IonItem>
        
        <IonItem>
          <IonButton slot='end' onClick={() => createPerson()} fill="clear">
            Creer
          </IonButton>
          <IonAlert
          id='alert'
        isOpen={showAlert}
        onDidDismiss={() => setShowAlert(false)}
        message="Fill The Input"
        buttons={['OK']}
      />
        </IonItem>
        <IonItem>
        </IonItem>
      </IonContent>
    </IonPage >
  );
};

export default AjouterEnchere;
