import React, { useEffect, useState, useCallback } from "react";
import "./Songs.css";
import CustomPagination from "./CustomPagination";
import Song from "./Song";
import { useLocation } from "react-router-dom";

function Songs({ isPlaylist, onPlayListAdd }) {
  const location = useLocation();
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [users, setUsers] = useState([]);
  const [showPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage
  });

  useEffect(() => {
    if (location.state) {
      let text = location.state.detail;
      if (searchText !== text) {
        setSearchText(text);
        let filteredSongs = JSON.parse(localStorage.getItem("songs")).filter(
          song => song.title.indexOf(text) !== -1
        );
        setSongs(filteredSongs);
      }
    }
  }, [location.state, songs, searchText]);

  useEffect(() => {
    if (!localStorage.getItem("albums")) {
      fetch("https://jsonplaceholder.typicode.com/albums")
        .then(res => res.json())
        .then(result => {
          setAlbums(result);
          localStorage.setItem("albums", JSON.stringify(result));
        });
    } else {
      setAlbums(JSON.parse(localStorage.getItem("albums")));
    }
    if (!localStorage.getItem("users")) {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(result => {
          setUsers(result);
          localStorage.setItem("users", JSON.stringify(result));
        });
    } else {
      setUsers(JSON.parse(localStorage.getItem("users")));
    }

    if (!localStorage.getItem("songs")) {
      fetch("https://jsonplaceholder.typicode.com/photos")
        .then(res => res.json())
        .then(result => {
          setSongs(result);
          localStorage.setItem("songs", JSON.stringify(result));
        });
    } else {
      setSongs(JSON.parse(localStorage.getItem("songs")));
    }

    return () => {};
  }, []);
  const onPaginationChange = useCallback((start, end) => {
    setPagination({ start, end });
  }, []);

  return songs.length !== 0 ? (
    <div>
      <div>
        {songs.slice(pagination.start, pagination.end).map(song => {
          let albumDetails = albums.filter(album => album.id === song.albumId);
          return users.map(user => {
            if (user.id === albumDetails[0].userId) {
              return (
                <Song
                  id={song.id}
                  isPlaylist={isPlaylist}
                  thumbnail={song.thumbnailUrl}
                  title={song.title}
                  username={user.name}
                  albumtitle={albumDetails[0].title}
                  onPlayListAdd={onPlayListAdd}
                />
              );
            } else {
              return "";
            }
          });
        })}
      </div>

      <CustomPagination
        showPerPage={showPerPage}
        onPaginationChange={onPaginationChange}
        total={songs.length}
      />
    </div>
  ) : (
    <div className="songsItems">Loading.....</div>
  );
}

export default Songs;
