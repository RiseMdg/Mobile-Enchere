import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import OneSignal from 'onesignal-cordova-plugin';

/* Theme variables */
import './theme/variables.css';
import './theme/variables.css';
import Login from './pages/Login';
import Inscription from './pages/Inscription';
import Rechargement from './pages/Rechargement';
import ListEnchere from './pages/ListEnchere';
import DetailEnchere from './pages/DetailEnchere';
import AjouterEnchere from './pages/AjouterEnchere';
import { Menu } from './components/Menu';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
    <Menu/>
      <IonRouterOutlet id="main">
        <Route path="/login" component={Login} exact={true} />
        <Route path="/inscription" component={Inscription} exact={true} />
        <Route path="/listenchere/" component={ListEnchere} exact={true} />
        <Route path="/detailenchere/:id" component={DetailEnchere} exact={true} />
        <Route path="/ajouterenchere/" component={AjouterEnchere} exact={true} />
        <Route path="/rechargement/" component={Rechargement} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/login" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);
export default App;
