import { BrowserRouter, Route, Switch } from "react-router-dom";
import Introduction from "../pages/Introduction";
import Editor from "../pages/Editor";
import About from "../pages/About";
import Cgu from "../pages/Cgu";
import Error404 from "../pages/Error404";
import Test from "../pages/Test";
import Navigation from "../utils/Navigation";
import Footer from "../utils/Footer";
import { Suspense } from "react";

import "./style.scss";

function App() {
    return (
        <Suspense fallback={<div></div>} maxDuration={2000}>
            <div className="App">
                <BrowserRouter>
                    <Navigation />
                    <Switch>
                        <Route exact path="/" component={Introduction} />
                        <Route path="/editor" component={Editor} />
                        <Route path="/about" component={About} />
                        <Route path="/cgu" component={Cgu} />
                        <Route path="/test" component={Test} />
                        <Route path="*" component={Error404} />
                    </Switch>
                    <Footer />
                </BrowserRouter>
            </div>
        </Suspense>
    );
}

export default App;
