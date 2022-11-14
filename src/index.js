const toggleMode=()=>{
	const select = document.getElementById("title");
	const select2 = document.getElementById("titles");
	const scoreboard = document.getElementById("scores");
	const text = document.getElementById("miniText");
	const modebutton = document.querySelector(".darkmode")
	const menu = document.getElementById("menu");
	const allButton = [document.getElementById("rock"),document.getElementById("paper"),document.getElementById("scissor")];
	const menuButton = [document.getElementById("playButton"),document.getElementById("exitButton")]
	const finalButton = [,document.getElementById("reset"),document.getElementById("mainMenu")]
	if (document.body.style.backgroundImage=="linear-gradient(to right bottom, rgb(255, 255, 255), rgb(211, 216, 238))"){
		document.body.style.backgroundImage="linear-gradient(to right bottom, #191b2a, #122a3b)";
		modebutton.src = `src/dark_mode.png`;
		menu.classList.remove("menu-light");
		menu.classList.add("menu");
		select.classList.remove("title-light");
		select.classList.add("title");
		select2.classList.remove("title-light");
		select2.classList.add("title");
		text.classList.remove("miniText-light");
		text.classList.add("miniText");
		scoreboard.classList.remove("score-light");
		scoreboard.classList.add("score");
		games.classList.remove("game-light")
		games.classList.add("game")
		allButton.forEach((buttons)=>{
			buttons.classList.remove("button-light");
			buttons.classList.add("button");}
			)
		finalButton.forEach((buttons)=>{
			buttons.classList.remove("finalButton-light");
			buttons.classList.add("finalButton");}
			)
			menuButton.forEach((buttons)=>{
			buttons.classList.remove("menuButton-light");
			buttons.classList.add("menuButton");}
			)
		}
	else{
		modebutton.src = `src/light_mode.png`;
		menu.classList.remove("menu");
		menu.classList.add("menu-light");
		select.classList.remove("title");
		select.classList.add("title-light");
		select2.classList.remove("title");
		select2.classList.add("title-light");
		text.classList.remove("miniText");
		text.classList.add("miniText-light");
		document.body.style.backgroundImage="linear-gradient(to right bottom, #ffffff, #d3d8ee)";
		scoreboard.classList.remove("score");
		scoreboard.classList.add("score-light");
		games.classList.remove("game")
		games.classList.add("game-light")
		// console.log(button);
        allButton.forEach((buttons)=>{
			buttons.classList.remove("button");
			buttons.classList.add("button-light");}
			)
		finalButton.forEach((buttons)=>{
			buttons.classList.remove("finalButton");
			buttons.classList.add("finalButton-light");}
			)
		menuButton.forEach((buttons)=>{
			buttons.classList.remove("menuButton");
			buttons.classList.add("menuButton-light");}
			)
			

		}
}

//tampilan menu utama 	
const menu = () => {
	const playBtn = document.querySelector("#playButton");
	const game = document.querySelector(".game");
	const menu = document.querySelector(".menu");
	const exitButton = document.querySelector("#exitButton");
	playBtn.addEventListener('click',() => {
		menu.style.display = "none";
		game.style.display = "flex";
		start();
	})
	exitButton.addEventListener('click',() => {
		window.close();
	}) // aku gak ngerti kenapa kadang gak berfungsi ya
}	

var timer;
var timeLeft;
const start = () =>{
	const result = document.querySelector('.result');
	const botScoreBoard = document.querySelector('.botPoint');
	const movesLeft = document.querySelector('.movesleft');

	timeLeft = 10;
	timer = setInterval(function(){
		document.getElementById("countdown").innerText = `Timer Left: ${timeLeft} s`;
		if (timeLeft == 0){
			clearInterval(timer);
			moves--;
			movesLeft.innerText = `Move Left : ${moves}`;
			botScore++;
			botScoreBoard.textContent = botScore;
			result.textContent = 'You Lose';
		}
		
	timeLeft--;
	}, 1000);
}

const stop=()=>{
	clearInterval(timer);
}

//game
var moves;
var botScore;
var playerScore;

const game = () => {
	moves = 5;
	botScore = 0;
	playerScore = 0;
	// Deklarasi awal button player
	const playGame = () => {
		const rockButton = document.querySelector('#rock');
		const paperButton = document.querySelector('#paper');
		const scissorButton = document.querySelector('#scissor');
		const playerTurn = [rockButton,paperButton,scissorButton];
		const botTurn = ['rock','paper','scissors'];
		const playerHand = document.querySelector('.player-hand');
		const botHand = document.querySelector('.bot-hand');
		const hands = document.querySelectorAll('.popUp img');;
		
		// Aksi untuk tiap button
		playerTurn.forEach(action => {
			action.addEventListener('click',function(){
				const movesLeft = document.querySelector('.movesleft');
				moves--;
				movesLeft.innerText = `Move Left : ${moves}`;
				// pilihan random bot
				const botChoice = botTurn[Math.floor(Math.random()*3)];
				// untuk menampilkan gambar hasil pertandingan
				
				playerTurn.forEach(buttons => {
					buttons.disabled = true;
				})
				playerHand.src = `src/rockmatch.png`;
                botHand.src = `src/rockmatch.png`;
				
				setTimeout(() => {
					// call fungsi untuk cek pemenangnya siapa
					winner(this.innerText,botChoice);
					playerTurn.forEach(buttons => {
						buttons.disabled = false;
					})
					
					playerHand.src = `src/${this.innerText}match.png`;
                	botHand.src = `src/${botChoice}match.png`;
					// Deklarasi kalau jatah giliran sudah habis
					start();
					if(moves == 0){
						gameOver(playerTurn,movesLeft);
					}
				}, 2000);
				//Working on animation
				stop();
				playerHand.style.animation = 'shakePlayer 2s ease';
				botHand.style.animation = 'shakeBot 2s ease';
			})
		})
		hands.forEach(hand => {
			hand.addEventListener('animationend', function(){
				this.style.animation = "";
			});
		});
		
	}
	// Fungsi untuk menentukan pemenang
	const winner = (player,bot) => {
		const result = document.querySelector('.result');
		const playerScoreBoard = document.querySelector('.playerPoint');
		const botScoreBoard = document.querySelector('.botPoint');
		//Kasus Tie
		if(player == bot){
			result.textContent = 'Tie'
		}
		//Kasus You Lose
		else if(player == 'paper' && bot == 'scissors' ||
				player == 'scissors' && bot == 'rock' ||
				player == 'rock' && bot == 'paper'){
				result.textContent = 'You Lose';
				botScore++;
				botScoreBoard.textContent = botScore;
		}
		//Kasus You Win
		else{
				result.textContent = 'You Win'
				playerScore++;
				playerScoreBoard.textContent = playerScore;
		}
	}
		
	// Giliran udah limit
	const gameOver = (playerTurn,movesLeft) => {
		const chooseMove = document.querySelector('.move');
		const result = document.querySelector('.result');
		const resetButton = document.querySelector('#reset');
		const backButton = document.querySelector('#mainMenu');
		const timeLeft = document.querySelector('#countdown');
		// menghilangkan setiap tombol button hand, tampilan Move Left sisa dan waktu countdown
		playerTurn.forEach(action => {
			action.style.display = 'none';
		})
		movesLeft.style.display = 'none';
		timeLeft.style.display = 'none';
	
		// Menampilkan game over
		chooseMove.innerText = 'Game Over!!'
		// Memperbesar ukuran font hasil akhir
		result.style.fontSize = '2rem';

		// Kalkulasi dan aksi terhadap hasil akhir
		if(playerScore > botScore){
			result.innerText = 'Player Win !!!'
		}
		else if(playerScore < botScore){
			result.innerText = 'Bot Win !!';
		}
		else{
			result.innerText = 'Tie';
		}
		// menampilkan tombol reset dan back to menu utama
		resetButton.style.display = 'flex';
		backButton.style.display = 'flex';

		//aksi tombol reset
		resetButton.addEventListener('click',()=>{
			const playerScoreBoard = document.querySelector('.playerPoint');
			const botScoreBoard = document.querySelector('.botPoint');
			const playerHand = document.querySelector('.player-hand');
			const botHand = document.querySelector('.bot-hand');
			playerTurn.forEach(action => {
				action.style.display = 'flex';
			})
			chooseMove.innerText = 'Choose Your Attempt!!'

			resetButton.style.display = 'none';
			backButton.style.display = 'none';
			playerScore = 0;
			botScore = 0;
			moves = 5;
			result.style.fontSize = '1.2rem';
			movesLeft.style.display = 'flex';
			timeLeft.style.display = 'flex';

			result.innerText = '';
			playerHand.src = `src/rockmatch.png`;
            botHand.src = `src/rockmatch.png`;
			botScoreBoard.textContent = botScore;
			playerScoreBoard.textContent = playerScore;
	})
			//Belum selesai sebenarnya
		backButton.addEventListener('click',function(){
			window.location.reload();
		})
	}


	// Mulai Game
	playGame();
	
}

// Mulai panggil Frame
menu();
game();
