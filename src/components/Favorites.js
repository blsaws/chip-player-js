import React, {PureComponent} from "react";
import FavoriteButton from "./FavoriteButton";

export default class Favorites extends PureComponent {
  render() {
    const {
      favorites,
      currContext,
      currIdx,
      onSongClick,
      toggleFavorite,
      user,
      loadingUser,
      handleLogin,
    } = this.props;

    return (
      loadingUser ?
        <p>Loading user data...</p>
        :
        <div>
          <h3>
            Favorite Songs <span>({favorites.length})</span>
          </h3>
          {user ?
            favorites.length > 0 ?
              <div>
                {
                  favorites.map((href, i) => {
                    const title = decodeURIComponent(href.split('/').pop());
                    const isPlaying = currContext === favorites && currIdx === i;
                    return (
                      <div className={isPlaying ? 'Song-now-playing' : ''} key={i}>
                        <FavoriteButton favorites={favorites}
                                        toggleFavorite={toggleFavorite}
                                        href={href}/>
                        <a onClick={onSongClick(href, favorites, i)} href={href}>{title}</a>
                      </div>
                    );
                  })
                }
              </div>
              :
              <div>
                You don't have any favorites yet.<br/>
                Click the &#003; heart icon next to any song to save a favorite.
              </div>
            :
            <span>
              You must <a href="#" onClick={handleLogin}>
              login or signup</a> to save favorites.
            </span>
          }
        </div>
    );
  }
}