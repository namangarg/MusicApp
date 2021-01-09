import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import "./Playlists.css";
import { Modal, Button } from "react-bootstrap";
import CustomToast from "./CustomToast";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";

function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [show, setShow] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const handleClose = () => setShow(false);
  const nameref = useRef("");
  const descriptionref = useRef("");
  const handleSave = () => {
    if (nameref.current.value) {
      setPlaylists([
        ...playlists,
        {
          name: nameref.current.value,
          description: descriptionref.current.value,
          createdAt: new Date().toLocaleString(),
          songs: []
        }
      ]);
      setIsSaved(true);
    }
    setShow(false);
  };
  useEffect(() => {
    if (localStorage.getItem("playlists")) {
      setPlaylists(JSON.parse(localStorage.getItem("playlists")));
    }

    return () => {};
  }, []);

  useEffect(() => {
    localStorage.setItem("playlists", JSON.stringify(playlists));
    return () => {};
  }, [playlists]);
  return (
    <>
      <div className="playlists">
        {playlists.length === 0 ? (
          <div className="playlists__noPlaylist">
            <h1>No Playlists present</h1>
          </div>
        ) : (
          playlists.map(playlist => (
            <div className="playlists__add">
              <Link to={`playlists/create/${playlist.name}`}>
                <div className="playlists__add_container">
                  <PlaylistPlayIcon className="playlists__add__icon" />
                </div>
              </Link>
              <div className="playlists__add__label">
                <span>{playlist.name}</span>
                <span>{playlist.createdAt}</span>
                <span>{`${playlist.songs.length} songs`}</span>
              </div>
            </div>
          ))
        )}
      </div>
      <div onClick={() => setShow(true)} className="playlists__add">
        <div className="playlists__add_container">
          <AddIcon className="playlists__add__icon" />
        </div>
        <div className="playlists__add__label">
          <span>New Playlist</span>
        </div>
      </div>
      <Modal
        show={show}
        backdrop="static"
        className="modalcustom"
        keyboard={false}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Playlists</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modalCustomBody">
          <div className="customDiv">
            <input ref={nameref} placeholder="Name" />
            <input ref={descriptionref} placeholder="Description" />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={handleClose} variant="secondary">
            Close
          </Button>
          <Button onClick={handleSave} variant="primary">
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
      <CustomToast
        message="Playlist Created"
        name={nameref.current}
        setSaved={() => setIsSaved(false)}
        saved={isSaved}
      />
    </>
  );
}

export default Playlists;
