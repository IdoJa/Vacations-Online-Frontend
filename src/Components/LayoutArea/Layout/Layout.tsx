import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import store from "../../../Redux/Store";
import { socketManagerInstance } from "../../../Socket.io/SocketManager";



import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {

    // Reconnect socket on refresh
    useEffect(() => {
        (async function () {
            if (store.getState().authState.user !== null) {
                socketManagerInstance.connect();
            }
        })();
    }, []);


    return (
        <div className="Layout">
            <BrowserRouter>
                <header>
                    <nav>
                        <Navbar />
                    </nav>
                </header>
                <main>
                    <Routing />
                </main>
                <footer>
                    <Footer />
                </footer>
            </BrowserRouter>
        </div>
    );
}

export default Layout;
