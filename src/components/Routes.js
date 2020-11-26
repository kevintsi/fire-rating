import {  BrowserRouter as Router, Switch , Route} from "react-router-dom"
import Films from "./Films"
import Animes from "./Animes"
import Mangas from "./Mangas"
import SignIn from "./SignIn"
import SignUp from "./SignUp"

function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/movies" component={Films}/>
                <Route exact path="/animes" component={Animes}/>
                <Route exact path="/mangas" component={Mangas}/>
                <Route path="/signin" component={SignIn}/>
                <Route path="/signup" component={SignUp}/>
            </Switch>
        </Router>
    )
}

export default Routes