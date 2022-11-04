
//tampilan menu utama
const menu = () => {
	const playBtn = document.querySelector(".playButton");
	const game = document.querySelector(".game");
	const menu = document.querySelector(".menu");
	const exitButton = document.querySelector(".exitButton");
	exitButton.addEventListener('click',() => {
		window.close();
	})
	playBtn.addEventListener('click',() => {
		menu.style.display = "none";
		game.style.display = "flex";
	})
}	
//game
const game = () => {
	let playerScore = 0;
	let botScore = 0;
	let moves = 10;

	// Deklarasi awal button player
	const playGame = () => {
		const rockButton = document.querySelector('#rock.rock');
		const paperButton = document.querySelector('#paper.paper');
		const scissorButton = document.querySelector('.scissor');
		const playerTurn = [rockButton,paperButton,scissorButton];
		const botTurn = ['rock','paper','scissors']

		// Pengulangan aksi untuk tiap button
		playerTurn.forEach(action => {
			action.addEventListener('click',function(){
				const movesLeft = document.querySelector('.movesleft');
				moves--;
				movesLeft.innerText = `Giliran : ${moves}`;
				// pilihan random bot
				const botChoice = botTurn[Math.floor(Math.random()*3)];
				// untuk cek pemenangnya siapa
				winner(this.innerText,botChoice)
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
		//Kasus kalah menang
		//Kasus batu
		else if(player == 'rock'){
			if(bot == 'paper'){
				result.textContent = 'Bot Menang';
				botScore++;
				botScoreBoard.textContent = botScore;

			}else{
				result.textContent = 'Player Menang'
				playerScore++;
				playerScoreBoard.textContent = playerScore;
			}
		}
		//Kasus gunting
		else if(player == 'scissors'){
			if(bot == 'rock'){
				result.textContent = 'Bot Menang';
				botScore++;
				botScoreBoard.textContent = botScore;
			}else{
				result.textContent = 'Kamu Menang';
				playerScore++;
				playerScoreBoard.textContent = playerScore;
			}
		}
		//Kasus Kertas
		else if(player == 'paper'){
			if(bot == 'scissors'){
				result.textContent = 'Bot Menang';
				botScore++;
				botScoreBoard.textContent = botScore;
			}else{
				result.textContent = 'Kamu Menang';
				playerScore++;
				playerScoreBoard.textContent = playerScore;
			}
		}
	}

	// Giliran udah limit
	const gameOver = (playerTurn,movesLeft) => {
		const chooseMove = document.querySelector('.move');
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
		reloadButton.addEventListener('click',() => {
			playerScore = 0;
			botScore = 0;
			moves = 10;
		})
		backButton.addEventListener('click',() => {
			window.location.reload();
		})
	}


	// Mulai Game
	playGame();
	
}

// Mulai panggil Frame
menu();
game();
