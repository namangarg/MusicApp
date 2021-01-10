import React from "react";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";

function Song({
  isPlaylist,
  id,
  thumbnail,
  title,
  username,
  albumtitle,
  onPlayListAdd,
  onPlayListDelete,
  isAdded
}) {
  return (
    <div id={id} className="details">
      <div className="details__imgContainer">
        <img src={thumbnail} alt={thumbnail} />
      </div>
      <div className="leftDetails">
        <span>{title}</span>
        <label>{username}</label>
        <label>{albumtitle}</label>
      </div>
      <div className="details__playtime">
        <span className="platime__value">{`4:0${parseInt(id)}`} </span>
      </div>
      <div className="rightDetails">
        {isPlaylist ? (
          <Tooltip title="Add To Playlist">
            <PlaylistAddIcon
              onClick={() =>
                onPlayListAdd(id, title, username, albumtitle, thumbnail)
              }
              className="addToPlaylist"
            />
          </Tooltip>
        ) : (
          ""
        )}
        {isAdded ? (
          <Tooltip title="Delete">
            <DeleteIcon
              onClick={() => onPlayListDelete(id)}
              className="redDelete"
            />
          </Tooltip>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Song;
