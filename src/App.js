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

const adapter = new JSONAPIAdapter('https://desert-driver-api.herokuapp.com/api/v1/');
// const adapter = new JSONAPIAdapter('http://localhost:3000/api/v1/');

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
		onGameScreen: true,
		showFooterMusic: true,
		showAbout: false
	};

	musicDeck = {
		a: null,
		b: null,
		c: null
	};

	gameSound = {
		countdownAudio: null,
		coinAudio: null,
		flipAudio: null
	};

	fadeOut = null;

	componentDidMount() {
		adapter.getAll('scores').then((scores) => this.setState({ scores }));
		adapter.getAll('users').then((users) => this.setState({ users }));
		adapter.getAll('avatars').then((avatars) => this.setState({ avatars }));
	}

	setUser = (userObj) => {
		!userObj.music_playing && this.musicFadeOut()

		this.setState({
			userId: userObj.id,
			username: userObj.username,
			avatar: userObj.avatar.image,
			musicPlaying: userObj.music_playing,
			gameSound: userObj.game_sound,
			musicVolume: userObj.music_volume,
			gameVolume: userObj.game_volume
		});
		this.setMusicVolume(userObj.music_volume)
		let input = document.getElementById('bg-music-volume')
		input.value = userObj.music_volume
	};

	signOut = () => {
		adapter.getAll('users').then((users) => this.setState({ users, userId: '', onGameScreen: true }));
		this.musicFadeOut();
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
		if (!this.state.musicPlaying) {
			this.setState({
				musicPlaying: true
			})
		}
		let emptySide;
		if (this.musicDeck.a) {
			emptySide = 'b';
			
		} else if (this.musicDeck.b) {
			emptySide = 'c';
			
		} else if (this.musicDeck.c || (!this.musicDeck.a && !this.musicDeck.b && !this.musicDeck.c)) {
			emptySide = 'a';
			
		}

		this.musicDeck[emptySide] = new Audio();
		this.musicDeck[emptySide].src = song.src;
		this.musicDeck[emptySide].controls = true;
		this.musicDeck[emptySide].volume = this.state.musicVolume;
		this.musicDeck[emptySide].autoPlay = true;
		this.musicDeck[emptySide].load();
		this.musicDeck[emptySide].play();
		this.musicDeck[emptySide].muted = false;
		this.musicDeck[emptySide].play();
		this.setState({
			songInfo: `"${song.title}" by ${song.artist}`
		});
		this.musicDeck[emptySide].addEventListener('ended', () => {
			this.musicDeck[emptySide].pause();
			this.nextSong(song);
		});
	};

	nextSong = (song) => {
		let activeSide;
		if (this.state.musicPlaying) {
			if (this.musicDeck.a) {
				activeSide = 'a';
			} else if (this.musicDeck.b) {
				activeSide = 'b';
			} else if (this.musicDeck.c) {
				activeSide = 'c';
			}
			this.musicDeck[activeSide].pause();
		}
		if (!song) {
			song = this.musicDeck[activeSide];
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
		let activeSide = null;
		if (this.musicDeck.a) {
			activeSide = 'a';
		} else if (this.musicDeck.b) {
			activeSide = 'b';
		} else if (this.musicDeck.c) {
			activeSide = 'c';
		}

		this.musicDeck[activeSide].volume = value;
		if (this.state.userId) {
			this.setState({
				musicVolume: value
			}, () => adapter.update('users', this.state.userId, { music_volume: value }));
		}
	};

	setGameVolume = (value) => {
		Object.keys(this.gameSound).forEach((audioType) => {
			if (this.gameSound[audioType]) {
				this.gameSound[audioType].volume = value * this.gameSound[audioType].maxVolume;
			}
		});
		this.setState({
			gameVolume: value
		}, () => adapter.update('users', this.state.userId, { game_volume: value }));
	};

	musicFadeOut = () => {
		let activeSide;
		if (this.state.musicPlaying) {
			if (this.musicDeck.a) {
				activeSide = 'a';
			} else if (this.musicDeck.b) {
				activeSide = 'b';
			} else if (this.musicDeck.c) {
				activeSide = 'c';
			}
			this.fadeOut = setInterval(() => {
				this.musicDeck[activeSide].volume -= this.musicDeck[activeSide].volume * 0.5;
			}, 10);
			setTimeout(() => clearInterval(this.fadeOut), 150);
			setTimeout(() => this.musicDeck[activeSide].pause(), 150);
			setTimeout(() => (this.musicDeck[activeSide] = null), 160);
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

	flipAudio = (flipCount) => {
		if (flipCount > 1) {
			if (flipCount > 2) {
				flipCount = 3;
			}
			if (this.state.gameSound) {
				this.gameSound.flipAudio = new Audio();
				this.gameSound.flipAudio.src =
					Sounds.flipAudio[flipCount - 2][
						Math.floor(Math.random() * Sounds.flipAudio[flipCount - 2].length)
					].src;
				this.gameSound.flipAudio.controls = true;
				this.gameSound.flipAudio.maxVolume = 0.7;
				this.gameSound.flipAudio.volume = this.state.gameVolume * this.gameSound.flipAudio.maxVolume;
				this.gameSound.flipAudio.play();
			}
		}
	};

	toggleAllSounds = () => {
		
		if (this.state.musicPlaying || this.state.gameSound) {
			this.setState({
				musicPlaying: false,
				gameSound: false
			}, this.state.userId ? () => adapter.update('users', this.state.userId, { music_playing: false, game_sound: false }) : null)
			this.musicFadeOut()
		} else {
			this.setState({
				musicPlaying: true,
				gameSound: true
			}, this.state.userId ? () => adapter.update('users', this.state.userId, { music_playing: true, game_sound: true }) : null)
			let song = Sounds.bgMusic[Math.floor(Math.random() * Sounds.bgMusic.length)];
			this.musicPlay(song)
		}
		
	};

	startThemeSong = () => {
		if (this.state.musicPlaying) {
			let themeSong = Sounds.themeSong;
			this.musicPlay(themeSong);
			this.setState({
				songInfo: `"${themeSong.title}" by ${themeSong.artist}`,
				onGameScreen: false
			});
		}
	};

	startSignUpSong = () => {
		if (this.state.musicPlaying) {
			let signUpSong = Sounds.signUpSong;
      this.musicPlay(signUpSong);
		}
	}

	switchFromGameScreen = () => {
		if (this.state.userId !== '') {
			this.setState({ onGameScreen: false });
		}
	};

	stopThemeSong = () => {
		if (this.state.musicPlaying) {
			this.musicFadeOut();
		}
		if (this.state.user !== '') {
			this.setState({ onGameScreen: true });
		}
	};

	volumeHandler = (event) => {
		this.setMusicVolume(event.target.value);
	};

	showFooterMusic = () => {
		this.setState({
			showFooterMusic: true
		})
	}
	hideFooterMusic = () => {
		setTimeout(() => {
			this.setState({
				showFooterMusic: false
			})
		}, 1500)
	}

	toggleAbout = () => {
		this.setState((state) => ({
			showAbout: !state.showAbout
		}))
	}

	render() {
		return (
			<div id="main-container">
				<div className="App text-white">
					<Nav userId={this.state.userId} avatar={this.state.avatar} signOut={this.signOut} toggleAbout={this.toggleAbout} />
					<Switch>
						<Route
							path="/login"
							render={() => (
								<Login
									showAbout={this.state.showAbout}
									hideFooterMusic={this.hideFooterMusic}
									startThemeSong={this.startThemeSong}
									users={this.state.users}
									setUser={this.setUser}
									musicPlaying={this.state.musicPlaying}
								/>
							)}
						/>
						<Route
							path="/signup"
							render={() => (
								<SignUp
									startSignUpSong={this.startSignUpSong}
									musicFadeOut={this.musicFadeOut}
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
						{this.state.userId !== '' &&
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
						}
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
									toggleAllSounds={this.toggleAllSounds}
									flipAudio={this.flipAudio}
									setGameVolume={this.setGameVolume}
									setMusicVolume={this.setMusicVolume}
									gameVolume={this.state.gameVolume}
									gameSound={this.state.gameSound}
									musicVolume={this.state.musicVolume}
									countdownAudio={this.countdownAudio}
									coinAudio={this.coinAudio}
									// musicDeckB={this.musicDeckB}
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
					<div className={this.state.onGameScreen ? 'footer-audio-hidden' : 'footer-audio'}>
						<div
							onMouseEnter={this.showFooterMusic}
							onMouseLeave={this.hideFooterMusic}
							className={
								this.state.musicPlaying ? this.state.showFooterMusic ? (
									'footer-speaker-outer-container'
								) : (
										'footer-speaker-outer-container-closed'
									) : 'footer-speaker-outer-container-closed'
							}
						>
							<div
								className={
									this.state.musicPlaying ? (
										'footer-speaker-container'
									) : (
											'footer-speaker-container-disabled'
										)
								}
								onClick={this.toggleAllSounds}
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
							<div className={this.state.musicPlaying ? this.state.showFooterMusic ? "volume-and-title-container" : "volume-and-title-container-disabled" : "volume-and-title-container-disabled"}>
								<div>
									<span className={this.state.musicPlaying ? this.state.showFooterMusic ? "footer-music-info-title" : "footer-music-info-title-disabled" : "footer-music-info-title-disabled"}>
										{this.state.songInfo && this.state.songInfo.split(" by ")[0]}
									</span>
									<span className={this.state.musicPlaying ? this.state.showFooterMusic ? "footer-music-info-artist" : "footer-music-info-artist-disabled" : "footer-music-info-title-disabled"}>
										{this.state.songInfo && "by " + this.state.songInfo.split(" by ")[1]}
									</span>
								</div>
								<div className="volume-input-container">
									<p className="volume-type">VOLUME</p>
									<input
										type="range"
										min="0.0"
										max="1"
										disabled={!this.state.musicPlaying}
										step="0.001"
										defaultValue={this.state.musicVolume}
										id={this.state.musicPlaying ? 'bg-music-volume' : 'bg-music-volume-disabled'}
										className={'music-volume-input'}
										onInput={(event) => this.volumeHandler(event)}
										onChange={(event) => this.volumeHandler(event)}
									/>
								</div>
							</div>
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
