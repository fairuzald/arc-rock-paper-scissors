// function welcome() {
// 	let Name = document.getElementById("name").value; 
// 	console.log(Name);
// 	alert("Welcome "+Name);
// }

function toggleMode(){
	const select = document.getElementById("title");
	const select2 = document.getElementById("titles");
	const scoreboard = document.getElementById("scores");
	const text = document.getElementById("miniText");
	const menu = document.getElementById("menu");
	var allButton = [document.getElementById("rock"),document.getElementById("paper"),document.getElementById("scissor")];
	const menuButton = [document.getElementById("playButton"),document.getElementById("exitButton")]
	const finalButton = [,document.getElementById("reset"),document.getElementById("mainMenu")]
	if (document.body.style.backgroundImage=="linear-gradient(to right bottom, rgb(255, 255, 255), rgb(211, 216, 238))"){
		document.body.style.backgroundImage="linear-gradient(to right bottom, #191b2a, #122a3b)";
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
		// button.classList.remove("button-light");
		// button.classList.add("button");
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
		menu.classList.remove("menu");
		menu.classList.add("menu-light");
		// button.classList.remove("button");
		// button.classList.add("button-light");
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
	})
	exitButton.addEventListener('click',() => {
		window.close();
	}) // aku gak ngerti kenapa kadang gak berfungsi ya
}	

//game
const game = () => {
	var playerScore = 0;
	var botScore = 0;
	var moves = 5;
	
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
				movesLeft.innerText = `Kesempatan : ${moves}`;
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
					if(moves == 0){
						gameOver(playerTurn,movesLeft);
					}
				}, 2000);
				//Working on animation
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
		
		//Kasus seri
		if(player == bot){
			result.textContent = 'Seri'
		}
		//Kasus bot menang
		else if(player == 'paper' && bot == 'scissors' ||
				player == 'scissors' && bot == 'rock' ||
				player == 'rock' && bot == 'paper'){
				result.textContent = 'Bot Menang';
				botScore++;
				botScoreBoard.textContent = botScore;
		}
		//Kasus player menang
		else{
				result.textContent = 'Player Menang'
				playerScore++;
				playerScoreBoard.textContent = playerScore;
		}
	}
		
	// Giliran udah limit
	const gameOver = (playerTurn,movesLeft) => {
		var chooseMove = document.querySelector('.move');
		const result = document.querySelector('.result');
		const reloadButton = document.querySelector('#reset');
		const backButton = document.querySelector('#mainMenu');

		playerTurn.forEach(action => {
			action.style.display = 'none';
		})
	
		chooseMove.innerText = 'Game Over!!'
		movesLeft.style.display = 'none';

		if(playerScore > botScore){
			result.style.fontSize = '2rem';
			result.innerText = 'Kamu Menang !!!'
			result.style.color = '#308D46';
		}
		else if(playerScore < botScore){
			result.style.fontSize = '2rem';
			result.innerText = 'Kamu Kalah !!';
			result.style.color = 'red';
		}
		else{
			result.style.fontSize = '2rem';
			result.innerText = 'Seri';
			result.style.color = 'grey'
		}
		reloadButton.innerText = 'Reset';
		reloadButton.style.display = 'flex';
		backButton.innerText = 'Main Menu';
		backButton.style.display = 'flex';
		reloadButton.addEventListener('click',()=>{
			const playerScoreBoard = document.querySelector('.playerPoint');
			const botScoreBoard = document.querySelector('.botPoint');
			const playerHand = document.querySelector('.player-hand');
			const botHand = document.querySelector('.bot-hand');
			playerTurn.forEach(action => {
				action.style.display = 'flex';
			})
			chooseMove.innerText = 'Tentukan Pilihanmu Kawan!!'
			reloadButton.style.display = 'none';
			backButton.style.display = 'none';
			playerScore = 0;
			botScore = 0;
			moves = 5;
			result.style.color = 'white';
			result.style.fontSize = '1.2rem';
			movesLeft.style.display = 'flex';
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
