function welcome() {
	let Name = document.getElementById("name").value; 
	console.log(Name);
	alert("Welcome "+Name);
}

function toggleMode(){
	var select = document.getElementById("title");
	var select2 = document.getElementById("titles");
	var scoreboard = document.getElementById("scores");
	var text = document.getElementById("miniText");
	if (document.body.style.background=="white"){
		document.body.style.background="#202b38";
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
	}
	else{
		// for (var i = 0; i < select.length; i++) {
		// 	select[i].classList.remove("title");
		// 	select[i].classList.add("title-light");
		// 	} kenapa ya gak berfungsi ???
		select.classList.remove("title");
		select.classList.add("title-light");
		select2.classList.remove("title");
		select2.classList.add("title-light");
		text.classList.remove("miniText");
		text.classList.add("miniText-light");
		document.body.style.background="white";
		scoreboard.classList.remove("score");
		scoreboard.classList.add("score-light");
		games.classList.remove("game")
		games.classList.add("game-light")

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
	}) // aku gak ngerti kenapa gak berfungsi ya
}	

//game
const game = () => {
	var playerScore = 0;
	var botScore = 0;
	var moves = 10;
	
	// Deklarasi awal button player
	const playGame = () => {
		const rockButton = document.querySelector('#rock');
		const popUp = document.querySelector('.popUp');
		const paperButton = document.querySelector('#paper');
		const scissorButton = document.querySelector('#scissor');
		const Image = document.getElementsByClassName("imageButton")
		const playerTurn = [rockButton,paperButton,scissorButton];
		const botTurn = ['rock','paper','scissors']
		const playerHand = document.querySelector('.player-hand');
		const computerHand = document.querySelector('.computer-hand')
	
		// Pengulangan aksi untuk tiap button
		playerTurn.forEach(action => {
			action.addEventListener('click',function(){
				const movesLeft = document.querySelector('.movesleft');
				moves--;
				movesLeft.innerText = `Kesempatan : ${moves}`;
				// pilihan random bot
				const botChoice = botTurn[Math.floor(Math.random()*3)];
				// untuk cek pemenangnya siapa
				winner(this.innerText,botChoice)
				playerHand.src = `src/${this.innerText}.png`;
                computerHand.src = `src/${botChoice}.png`;
				// pickOptions(action);
				// popUp.innerText = `${this.innerText} VS ${botChoice} `;
				// Deklarasi kalau jatah giliran sudah habis
				if(moves == 0){
					gameOver(playerTurn,movesLeft);
				}
			})
		})
		
	}
	// Fungsi untuk menentukan pemenang
	const winner = (player,bot) => {
		const result = document.querySelector('.result');
		const playerScoreBoard = document.querySelector('.playerPoint');
		const botScoreBoard = document.querySelector('.botPoint');
		
		//antisipasi
		player = player.toLowerCase();
		bot = bot.toLowerCase();
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
		const reloadButton = document.querySelector('.reload');
		const backButton = document.querySelector('.mainMenu');

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
			playerTurn.forEach(action => {
				action.style.display = 'flex';
			})
			chooseMove.innerText = 'Tentukan Pilihanmu Kawan!!'
			reloadButton.style.display = 'none';
			backButton.style.display = 'none';
			playerScore = 0;
			botScore = 0;
			moves = 10;
			result.style.color = 'white';
			result.style.fontSize = '1.2rem';
			movesLeft.style.display = 'flex';
			result.innerText = '';
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
