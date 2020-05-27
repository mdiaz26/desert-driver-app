import React from "react";
import Canvas from "../components/Canvas.js";
import GameMenu from "../components/GameMenu.js";
import { Redirect } from "react-router-dom";
import "../styles/GameMenu.css";

const GameContainer = (props) => {
  if (props.userId === "") {
    return <Redirect to="/login" />;
  } else if (props.userId !== "") {
    return (
      <div className="game-container">
        {props.stage === "" ? (
          <GameMenu selectedStage={props.selectedStage} stopThemeSong={props.stopThemeSong} />
        ) : (
          <Canvas
            switchFromGameScreen={props.switchFromGameScreen}
            startThemeSong={props.startThemeSong}
            gameVolume={props.gameVolume}
            bgMusicVolume={props.bgMusicVolume}
            nextSong={props.nextSong}
            bgSongInfo={props.bgSongInfo}
            musicFadeOut={props.musicFadeOut}
            stopAllSounds={props.stopAllSounds}
            setGameVolume={props.setGameVolume}
            gameSound={props.gameSound}
            setMusicVolume={props.setMusicVolume}
            fadeOut={props.fadeOut}
            countdownAudio={props.countdownAudio}
            coinAudio={props.coinAudio}
            bgMusic={props.bgMusic}
            musicPlaying={props.musicPlaying}
            musicPlay={props.musicPlay}
            selectedStage={props.selectedStage}
            backToGameMenu={props.backToGameMenu}
            stage={props.stage}
            avatarImage={props.avatarImage}
            userId={props.userId}
            username={props.username}
            updateScores={props.updateScores}
          />
        )}
      </div>
    );
  }
};

export default GameContainer;
