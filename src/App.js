import "./App.css";
import Nav from "./components/Nav";
import { useState } from "react";
import Songs from "./components/Songs";
import { Route, Redirect } from "react-router-dom";
import Playlists from "./components/Playlists";
import CreatePlaylists from "./components/CreatePlaylists";

function App() {
  const tabData = [
    { name: "All Songs", isActiveTab: false, link: "/allSongs" },
    { name: "Playlists", isActiveTab: false, link: "/playlists" }
  ];
  const [tabList] = useState(tabData);
  const [active, setActiveTab] = useState(tabData[0]);
  function setTab(tab) {
    setActiveTab(tab);
  }
  return (
    <div className="App">
      <Nav tabs={tabList} active={active} changeTab={setTab} />

      <div className="songs">
        <Route exact path="/">
          <Redirect to="/allSongs" />
        </Route>
        <Route path="/allSongs" component={Songs} />
        <Route exact path="/playlists" component={Playlists} />
        <Route path={`/playlists/create/:id`} component={CreatePlaylists} />
      </div>
    </div>
  );
}

export default App;
