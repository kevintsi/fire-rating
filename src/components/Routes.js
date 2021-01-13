import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Movies from "./MovieList/MoviesList"
import Animes from "./Anime/Animes"
import Mangas from "./Manga/Mangas"
import SignIn from "./SignIn/SignIn"
import SignUp from "./SignUp/SignUp"
import MovieDetail from "./MovieDetail/MovieDetail"

function Routes() {
    return (
        <Router>
            <Switch>
                <Route exact path="/movies" component={Movies} />
                <Route exact path="/movies/:id" component={MovieDetail} />
                <Route exact path="/animes" component={Animes} />
                <Route exact path="/mangas" component={Mangas} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
            </Switch>
        </Router>
    )
}

export default Routes