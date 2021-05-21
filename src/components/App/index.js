import { HashRouter, Route, Switch } from "react-router-dom";
import Introduction from "../pages/Introduction";
import Editor from "../pages/Editor";
import About from "../pages/About";
import Gcu from "../pages/Gcu";
import Error404 from "../pages/Error404";
import Navigation from "../utils/Navigation";
import Footer from "../utils/Footer";
import { Suspense } from "react";

import "./style.scss";

function App() {
    return (
        <Suspense fallback={<div></div>} maxDuration={2000}>
            <div className="App">
                <HashRouter>
                    <Navigation />
                    <div className="main">
                        <Switch>
                            <Route exact path="/" component={Introduction} />
                            <Route path="/editor" component={Editor} />
                            <Route path="/about" component={About} />
                            <Route path="/gcu" component={Gcu} />
                            <Route path="*" component={Error404} />
                        </Switch>
                    </div>
                    <Footer />
                </HashRouter>
            </div>
        </Suspense>
    );
}

export default App;
