import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import JSONAPIAdapter from './JSONAPIAdapter';
import { Nav, Login, SignUp, ProfileContainer } from './components';
import { Switch, Route } from 'react-router-dom';
import GameContainer from './containers/GameContainer';
import Leaderboard from './containers/Leaderboard';
import React from 'react';
import Images from './asset-libraries/Images';
import Sounds from './asset-libraries/Sounds';

class App extends React.Component {
	state = {
		users: [],
		scores: [],
		avatars: [],
		userId: '',
		username: '',
		avatar: '',
		selectedStage: '',
		musicPlaying: true,
		gameSound: true,
		musicVolume: 0.8,
		gameVolume: 0.8,
		songInfo: null,
		onGameScreen: true
	};
	
	musicDeck = {
		a: null, 
		b: null
	}

	gameSound = {
		countdownAudio: null,
		coinAudio: null
	};
	
	fadeOut = null;

	componentDidMount() {
		const adapter = new JSONAPIAdapter('https://desert-driver-api.herokuapp.com/api/v1/');
		adapter.getAll('scores').then((scores) => this.setState({ scores }));
		adapter.getAll('users').then((users) => this.setState({ users }));
		adapter.getAll('avatars').then((avatars) => this.setState({ avatars }));
	}

	setUser = (userObj) => {
		this.setState({
			userId: userObj.id,
			username: userObj.username,
			avatar: userObj.avatar.image
		});
	};

	signOut = () => {
		this.setState({ userId: '', onGameScreen: true });
    this.musicFadeOut()
	};

	updateScores = (scoreObj) => {
		this.setState((prevState) => ({ scores: [...prevState.scores, scoreObj] }));
	};

	appendNewUser = (userObj) => {
		this.setState((prevState) => ({ users: [...prevState.users, userObj] }));
		return userObj;
	};

	appendUpdatedUser = (userObj) => {
		let newUsersArray = this.state.users.map((user) => {
			if (user.id === userObj.id) {
				return userObj;
			} else {
				return user;
			}
		});
		this.setState({ users: newUsersArray });
	};

	updateProfileLink = (avatarObj) => {
		this.setState({ avatar: avatarObj.image });
	};

	selectedStageHandler = (event) => {
		if (event) {
			this.setState({ selectedStage: event.target.alt });
		} else {
			this.setState({ selectedStage: '' });
		}
	};
	backToGameMenu = (event) => {
		this.setState({ selectedStage: '' });
	};

	getAvatarById = (avatarId) => {
		return this.state.avatars.find((avatar) => avatar.id === avatarId);
	};

	musicPlay = (song) => {
		let emptySide
		if (this.musicDeck.a) {
			emptySide = "b"
		} else if (this.musicDeck.b || (!this.musicDeck.a && !this.musicDeck.b)) {
			emptySide = "a"
		} 

		this.musicDeck[emptySide] = new Audio()
		this.musicDeck[emptySide].src = song.src;
		this.musicDeck[emptySide].controls = true;
		this.musicDeck[emptySide].volume = this.state.musicVolume;
		this.musicDeck[emptySide].autoPlay = true
    this.musicDeck[emptySide].load()
    this.musicDeck[emptySide].play();
    this.musicDeck[emptySide].muted = false
		setTimeout(() => this.musicDeck[emptySide].play(), 1000);
		this.setState({
			songInfo: `"${song.title}" by ${song.artist}`
		});
		this.musicDeck[emptySide].addEventListener('ended', () => {
			this.musicDeck[emptySide].pause();
			this.nextSong(song);
		});
	};

	findCurrentSong = () => {
		if (this.state.musicPlaying) {
			if (this.musicDeck.a) {
				return this.musicDeck.a
			} else if (this.musicDeck.b) {
				return this.musicDeck.b
			}
		}
	}

	nextSong = (song) => {
		let activeSide;
		if (this.state.musicPlaying) {
			if (this.musicDeck.a) {
				activeSide = 'a'
			} else if (this.musicDeck.b) {
				activeSide = 'b'
			}
			this.musicDeck[activeSide].pause();
		}
		if (!song) {
			song = this.musicDeck[activeSide]
		}
		let newSong;
		if (this.state.onGameScreen) {
			newSong = Sounds.bgMusic[Math.floor(Math.random() * Sounds.bgMusic.length)];
			newSong.src === song.src && this.nextSong(song);
		} else if (!this.state.onGameScreen) {
			newSong = Sounds.themeSong;
    }
		this.musicDeck[activeSide] = null;
		this.musicPlay(newSong);
	};

	setMusicVolume = (value) => {
		let activeSide = null
		if (this.musicDeck.a) {
			activeSide = 'a'
		} else if (this.musicDeck.b) {
			activeSide = 'b'
		}

		this.musicDeck[activeSide].volume = value;
		this.setState({
			musicVolume: value
		});
	};

	setGameVolume = (value) => {
		Object.keys(this.gameSound).forEach((audioType) => {
			this.gameSound[audioType].volume = value * this.gameSound[audioType].maxVolume;
		});
		this.setState({
			gameVolume: value
		});
	};

	musicFadeOut = () => {
		let activeSide = null
		if (this.state.musicPlaying) {
			if (this.musicDeck.a) {
				activeSide = "a"
			} else if (this.musicDeck.b) {
				activeSide = "b"
			}
			this.fadeOut = setInterval(() => (this.musicDeck[activeSide].volume -= this.musicDeck[activeSide].volume * 0.05), 5);
			setTimeout(() => clearInterval(this.fadeOut), 2000);
			setTimeout(() => this.musicDeck[activeSide].pause(), 2000);
			setTimeout(() => this.musicDeck[activeSide] = null, 2010);
		}
	};

	coinAudio = () => {
		if (this.state.gameSound) {
			this.gameSound.coinAudio = new Audio();
			this.gameSound.coinAudio.src = Sounds.coin;
			this.gameSound.coinAudio.controls = true;
			this.gameSound.coinAudio.maxVolume = 0.1;
			this.gameSound.coinAudio.volume = this.state.gameVolume * this.gameSound.coinAudio.maxVolume;
			this.gameSound.coinAudio.play();
		}
	};

	countdownAudio = () => {
		if (this.state.gameSound) {
			this.gameSound.countdownAudio = new Audio();
			this.gameSound.countdownAudio.src = Sounds.countdown;
			this.gameSound.countdownAudio.controls = true;
			this.gameSound.countdownAudio.maxVolume = 0.3;
			this.gameSound.countdownAudio.volume = this.state.gameVolume * this.gameSound.countdownAudio.maxVolume;
			this.gameSound.countdownAudio.play();
		}
	};

	stopAllSounds = () => {
		if (this.state.musicPlaying) {
			this.setState({
				musicPlaying: false,
				gameSound: false,
			}, this.musicFadeOut());

		} else {
			let song = Sounds.bgMusic[Math.floor(Math.random() * Sounds.bgMusic.length)];
			this.setState({
				musicPlaying: true,
				gameSound: true,
			}, this.musicPlay(song));

		}
	};

	startThemeSong = () => {
		if (this.state.musicPlaying) {
			let themeSong = Sounds.themeSong;
			this.musicPlay(themeSong)
			this.setState({
				songInfo: `"${themeSong.title}" by ${themeSong.artist}`,
				onGameScreen: false
			});
		}
	};

  switchFromGameScreen = () => {
    if (this.state.userId !== "") {
    this.setState({ onGameScreen: false })
    }
	}
	
	// toggleMusicPlaying = () => {
	// 	if (this.state.musicPlaying) {
	// 		this.musicFadeOut()
	// 	} else {
	// 		this.startThemeSong()
	// 	}
	// 	this.setState((state) => ({
	// 		musicPlaying: !state.musicPlaying
	// 	}));
	// };

	stopThemeSong = () => {
		if (this.state.musicPlaying) {
			this.musicFadeOut()
		}
    if (this.state.user !== "") {
		this.setState({ onGameScreen: true })
    }
	}

	render() {
		return (
			<div id="main-container">
				<div className="App text-white">
					<Nav userId={this.state.userId} avatar={this.state.avatar} signOut={this.signOut} />
					<Switch>
						<Route
							path="/login"
							render={() => (
								<Login startThemeSong={this.startThemeSong} users={this.state.users} setUser={this.setUser} musicPlaying={this.state.musicPlaying}/>
							)}
						/>
						<Route
							path="/signup"
							render={() => (
								<SignUp
									users={this.state.users}
									setUser={this.setUser}
									appendNewUser={this.appendNewUser}
									avatars={this.state.avatars}
								/>
							)}
						/>
						<Route
							path="/leaderboard"
							render={() => <Leaderboard scores={this.state.scores} users={this.state.users} />}
						/>
						<Route
							path="/users/:id"
							render={(routerProps) => (
								<ProfileContainer
									{...routerProps}
									scores={this.state.scores}
									avatars={this.state.avatars}
									userId={this.state.userId}
									appendUpdatedUser={this.appendUpdatedUser}
									updateProfileLink={this.updateProfileLink}
									signOut={this.signOut}
								/>
							)}
						/>
						<Route
							path="/"
							render={() => (
								<GameContainer
                  switchFromGameScreen={this.switchFromGameScreen}
									startThemeSong={this.startThemeSong}
									stopThemeSong={this.stopThemeSong}
									nextSong={this.nextSong}
									songInfo={this.state.songInfo}
									musicFadeOut={this.musicFadeOut}
									stopAllSounds={this.stopAllSounds}
									setGameVolume={this.setGameVolume}
									setMusicVolume={this.setMusicVolume}
									gameVolume={this.state.gameVolume}
									gameSound={this.state.gameSound}
									deckBVolume={this.state.musicVolume}
									countdownAudio={this.countdownAudio}
									coinAudio={this.coinAudio}
									musicDeckB={this.musicDeckB}
									fadeOut={this.fadeOut}
									musicPlay={this.musicPlay}
									musicPlaying={this.state.musicPlaying}
									userId={this.state.userId}
									username={this.state.username}
									avatarImage={this.state.avatar}
									updateScores={this.updateScores}
									selectedStage={this.selectedStageHandler}
									stage={this.state.selectedStage}
									backToGameMenu={this.backToGameMenu}
								/>
							)}
						/>
					</Switch>
				</div>
				<div>
					<div className={this.state.onGameScreen ? "footer-audio-hidden" : "footer-audio"}>
						<div className={this.state.musicPlaying ? "footer-speaker-outer-container" : "footer-speaker-outer-container-closed"}>
							<div
								className={
									this.state.musicPlaying ? (
										'footer-speaker-container'
									) : (
											'footer-speaker-container-disabled'
										)
								}
								onClick={this.stopAllSounds}
							>
								<img
									src={Images.speaker}
									alt="Footer Speaker"
									className={this.state.musicPlaying ? 'footer-speaker' : 'footer-speaker-disabled'}
								/>
								<img
									src={Images.speaker}
									alt="Footer Speaker Glow"
									className={
										this.state.musicPlaying ? 'footer-speaker-glow' : 'footer-speaker-disabled'
									}
								/>
							</div>
							<div />
							<span className={this.state.musicPlaying ? "footer-music-info" : "footer-music-info-disabled"} >{this.state.songInfo}</span>
						</div>
					</div>
					<div>
						<p className="signature">
							March 2020 | Made with <img className="heart" src={Images.heart} alt="heart" /> by{' '}
							<a
								className="signature-links"
								target="_blank"
								rel="noopener noreferrer"
								href="https://www.linkedin.com/in/alejoluis/"
							>
								LUIS ALEJO
							</a>{' '}
							&{' '}
							<a
								className="signature-links"
								target="_blank"
								rel="noopener noreferrer"
								href="https://www.linkedin.com/in/mikediaz006/"
							>
								MICHAEL DIAZ
							</a>
						</p>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
