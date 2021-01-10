import React, { useState, useEffect } from "react";
import Songs from "./Songs";
import Song from "./Song";
import "./CreatePlaylists.css";
import CustomToast from "./CustomToast";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import Tooltip from "@material-ui/core/Tooltip";
import AddCircleIcon from "@material-ui/icons/AddCircle";

function CreatePlaylists({ match }) {
  const [songs, setSongs] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [message, setMessage] = useState("");
  const [showSongs, setShowSongs] = useState(false);
  const onSongAdd = (id, title, username, albumtitle, thumbnail) => {
    let isFound = songs.filter(item => item.id === id);
    if (isFound.length === 0) {
      let song = {};
      song.id = id;
      song.thumbnail = thumbnail;
      song.title = title;
      song.username = username;
      song.albumtitle = albumtitle;
      setSongs([...songs, song]);
      setMessage("Song added in this playlist");
    } else {
      setMessage("Song already added in this playlist");
    }
    setIsSaved(true);
  };

  const shuffleSongs = () => {
    for (let i = songs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    setSongs([...songs]);
  };

  const onPlayListDelete = id => {
    const deletedIndex = songs.findIndex(song => song.id === id);
    songs.splice(deletedIndex, 1);
    setSongs([...songs]);
    setMessage("Song deleted from playlist");
    setIsSaved(true);
  };

  useEffect(() => {
    let playLists = JSON.parse(localStorage.getItem("playlists"));
    let indexPlaylist = playLists.findIndex(
      item => item.name === match.params.id
    );
    setSongs(playLists[indexPlaylist].songs);
    return () => {};
  }, [match.params.id]);

  useEffect(() => {
    let playLists = JSON.parse(localStorage.getItem("playlists"));
    let indexPlaylist = playLists.findIndex(
      item => item.name === match.params.id
    );
    playLists[indexPlaylist].songs = songs;
    let updatedPlayLists = [
      ...playLists.slice(0, indexPlaylist),
      playLists[indexPlaylist],
      ...playLists.slice(indexPlaylist + 1)
    ];
    localStorage.setItem("playlists", JSON.stringify(updatedPlayLists));
    return () => {};
  }, [songs, match.params.id]);

  return (
    <>
      <div>
        <CustomToast
          saved={isSaved}
          setSaved={() => setIsSaved(false)}
          message={message}
        />
      </div>
      <div className="create_playlists">
        <div className="create__playlist__details">
          <span>{`Playlist name : ${match.params.id}`}</span>
          <span>
            {songs.length === 0
              ? "No Songs in the Playlist Yet"
              : "Songs Added"}
          </span>
          <div className="create__playlist__details__actions">
            <Tooltip title="Shuffle Playlist">
              <ShuffleIcon onClick={shuffleSongs} className="shuffle__songs" />
            </Tooltip>
            <Tooltip title="Add Songs To Playlist">
              <AddCircleIcon
                onClick={() => setShowSongs(true)}
                className="shuffle__songs"
              />
            </Tooltip>
          </div>

          {songs.map(song => (
            <Song
              id={song.id}
              isPlaylist={false}
              thumbnail={song.thumbnail}
              title={song.title}
              username={song.username}
              albumtitle={song.albumtitle}
              isAdded={true}
              onPlayListDelete={onPlayListDelete}
            />
          ))}
        </div>
        {showSongs ? (
          <div>
            <div className="create__playlist__details">
              <span>List of All Songs</span>
            </div>
            <Songs onPlayListAdd={onSongAdd} isPlaylist={true} />
          </div>
        ) : (
          ""
        )}
      </div>
      :
    </>
  );
}

export default CreatePlaylists;
