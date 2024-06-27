

// setting global variables 

let dealerCards = [];
let playerCards = [];
let dealerTotal = '';
let playerTotal = '';
let numberOfAcesDealer = 0;
let numberOfAcesPlayer = 0;
let totalBetAmount = 0;
let buttons = '<button onclick="deal()">Deal</button>';
let startingMoney = 1000;
let result = undefined;

function pickCard() {
    let card = Math.floor(Math.random() * 13) + 1;
    return(card);
    };

function displayCards() {

    let stringOfNewHTML = ''; 
        for (let i = 0; i < dealerCards.length; i++) {
            if (dealerCards[i] === 11) {
                stringOfNewHTML = stringOfNewHTML + `<card class="cardStyle"> J </card>`

            } else if (dealerCards[i] === 12) {
                stringOfNewHTML = stringOfNewHTML + `<card class="cardStyle"> Q </card>`

            } else if (dealerCards[i] === 13) {
                stringOfNewHTML = stringOfNewHTML + `<card class="cardStyle"> K </card>`

            } else if (dealerCards[i] === 1) {
                stringOfNewHTML = stringOfNewHTML + `<card class="cardStyle"> A </card>`

            } else {
            stringOfNewHTML = stringOfNewHTML + `<card class="cardStyle"> ${dealerCards[i]} </card>`
            };
    };
    let stringOfNewHTMLPlayer = '';
        for (let i = 0; i < playerCards.length; i++) {
            

            if (playerCards[i] === 11) {
                stringOfNewHTMLPlayer = stringOfNewHTMLPlayer + `<card class="cardStyle"> J </card>`

            } else if (playerCards[i] === 12) {
                stringOfNewHTMLPlayer = stringOfNewHTMLPlayer + `<card class="cardStyle"> Q </card>`

            } else if (playerCards[i] === 13) {
                stringOfNewHTMLPlayer = stringOfNewHTMLPlayer + `<card class="cardStyle"> K </card>`

            } else if (playerCards[i] === 1) {
                stringOfNewHTMLPlayer = stringOfNewHTMLPlayer + `<card class="cardStyle"> A </card>`

            } else {
                stringOfNewHTMLPlayer = stringOfNewHTMLPlayer + `<card class="cardStyle"> ${playerCards[i]} </card>`
            };

    };
    document.getElementById('rowForDealerCards').innerHTML = stringOfNewHTML;
    document.getElementById('rowForPlayerCards').innerHTML = stringOfNewHTMLPlayer;
};

function deal() {
    dealerCards.push(pickCard());
    playerCards.push(pickCard());
    playerCards.push(pickCard());

    displayCards();
    getTotals();
    if (playerTotal === 21 ) {
        document.getElementById('playerResult').innerHTML = 'Result: Player BlackJack';
        buttons = '<span id="continueButton" class="pageButtons">continue</span>'
        document.getElementById('buttonRow').innerHTML = buttons;
        result = 'win'; 

        var continueButton = document.getElementById('continueButton');
        continueButton.addEventListener('click', reset);
        

    } else {

    buttons = '<span id="hitButton" class="pageButtons">hit</span><span id="standButton" class="pageButtons"">stand</span>'
    document.getElementById('buttonRow').innerHTML = buttons;
    
    var hitButton = document.getElementById('hitButton');
    hitButton.addEventListener('click', hit);

    var standButton = document.getElementById('standButton');
    standButton.addEventListener('click', stand);

    };

    document.getElementById('buttonsForBets').innerHTML = '';
    

};

function getTotals() {
    dealerTotal = 0;
    playerTotal = 0;

        for (let i = 0; i < dealerCards.length; i++) {

            
            
            if (dealerCards[i] == 1) {
                dealerTotal += 11;
                numberOfAcesDealer += 1;
            } else if (dealerCards[i] == 11 ||  dealerCards[i] == 12 || dealerCards[i] == 13 ) {
                dealerTotal += 10;
            } else {
                dealerTotal += dealerCards[i];
            };
            while (dealerTotal > 21 && numberOfAcesDealer > 0) {
                dealerTotal -= 10; 
                numberOfAcesDealer--;
            };
        };

        for (let i = 0; i < playerCards.length; i++) {

            console.log(playerCards[i])

            if (playerCards[i] == 11 ||  playerCards[i] == 12 || playerCards[i] == 13 ) {
                playerTotal += 10;
            } else if (playerCards[i] == 1) {
                playerTotal += 11;
                numberOfAcesPlayer += 1;
            } else {
                playerTotal += playerCards[i];
            };

            while (playerTotal > 21 && numberOfAcesPlayer > 0) {
                playerTotal -= 10; 
                numberOfAcesPlayer--;
            };

        };
        
    document.getElementById('dealerInfoContent').innerHTML = `Dealer's Cards ----- Dealer Total: ${dealerTotal}`;
    document.getElementById('playerInfoContent').innerHTML = `Player's Cards ----- Player Total: ${playerTotal}`;
}

function hit() {
    playerCards.push(pickCard());
    displayCards();
    getTotals();
    checkResult();
};

function stand() {
    while (dealerTotal <= 16) {
        dealerCards.push(pickCard());
        displayCards();
        getTotals();
    };
    checkResult();

};

function reset() {
        dealerCards = [];
        playerCards = [];
        dealerTotal = '';
        playerTotal = '';
        numberOfAcesPlayer = 0;
        numberOfAcesDealer = 0;
        result = undefined;
        totalBetAmount = 0;
        buttons = '<span id="dealButton" class="pageButtons">Deal</span>';
        document.getElementById('buttonRow').innerHTML = buttons;
        displayCards();
        getTotals();
        document.getElementById('playerResult').innerHTML = '';
        document.getElementById('totalBet').innerHTML = `Total Bet: ${totalBetAmount}`;
        document.getElementById('buttonsForBets').innerHTML = `<span id='betButton1' class="betButton"><img class="imgBackground" src="Screenshot_2023-12-22_at_8.01.05_AM-removebg-preview.png"></span>
        <span id='betButton10' class="betButton"><img class="imgBackground" src="Screenshot_2023-12-22_at_8.01.05_AM-removebg-preview copy.png"></span>
        <span id='betButton50' class="betButton"><img class="imgBackground" src="Screenshot_2023-12-22_at_8.01.05_AM-removebg-preview copy 2.png"></span>
        <span id='betButton100' class="betButton"><img class="imgBackground" src="Screenshot_2023-12-22_at_8.01.05_AM-removebg-preview copy 3.png"></span>
        <span id="cancelBetButton" class="pageButtons">cancel bet</span>`;

        var dealButton = document.getElementById('dealButton');
        dealButton.addEventListener('click', deal);

        var cancelBetButton = document.getElementById('cancelBetButton');
        cancelBetButton.addEventListener('click', cancelBet);

        var betButton1 = document.getElementById('betButton1');
        betButton1.addEventListener('click', addToBet1);
        
        var betButton10 = document.getElementById('betButton10');
        betButton10.addEventListener('click', addToBet10);
        
        var betButton50 = document.getElementById('betButton50');
        betButton50.addEventListener('click', addToBet50);
        
        var betButton100 = document.getElementById('betButton100');
        betButton100.addEventListener('click', addToBet100);


};

function checkResult() {
    if (playerTotal > 21) {
        document.getElementById('playerResult').innerHTML = 'Result: Player Busted, YOU LOSE';
        buttons = '<span id="continueButton" class="pageButtons">continue</span>'
        document.getElementById('buttonRow').innerHTML = buttons;
        result = 'lose'; 
        processBet();

    } else if (playerTotal === 21 ) {
        while (dealerTotal <= 16) {
        dealerCards.push(pickCard());
        displayCards();
        getTotals();
        };
        if (playerTotal === 21 && dealerTotal === 21 ) {
        document.getElementById('playerResult').innerHTML = 'Result: BOTH BlackJack, YOU TIE';
        buttons = '<span id="continueButton" class="pageButtons">continue</span>';
        result = 'push'; 
        processBet();
        } else {
        document.getElementById('playerResult').innerHTML = 'Result: Player BlackJack, YOU WIN';
        buttons = '<span id="continueButton" class="pageButtons">continue</span>'
        result = 'win'; 
        processBet();
        };
        document.getElementById('buttonRow').innerHTML = buttons;
    } else if (dealerTotal > 21) {
        document.getElementById('playerResult').innerHTML = 'Result: Dealer Busted, YOU WIN';
        buttons = '<span id="continueButton" class="pageButtons">continue</span>'
        document.getElementById('buttonRow').innerHTML = buttons;
        result = 'win'; 
        processBet();
    } else if (dealerTotal === playerTotal) {
        document.getElementById('playerResult').innerHTML = 'Result: Same Totals, YOU TIE';
        buttons = '<span id="continueButton" class="pageButtons">continue</span>'
        document.getElementById('buttonRow').innerHTML = buttons;
        result = 'push'; 
        processBet();
    } else if (dealerTotal >= 16) {
        if (dealerTotal > playerTotal) {
        document.getElementById('playerResult').innerHTML = 'Result: Dealer has greater total, YOU LOSE';
        buttons = '<span id="continueButton" class="pageButtons">continue</span>'
        document.getElementById('buttonRow').innerHTML = buttons;
        result = 'lose'; 
        processBet();
        } else {
        document.getElementById('playerResult').innerHTML = 'Result: Player has greater total, YOU WIN';
        buttons = '<span id="continueButton" class="pageButtons">continue</span>'
        document.getElementById('buttonRow').innerHTML = buttons;
        result = 'win'; 
        processBet();
        };

    };

    var continueButton = document.getElementById('continueButton');
    continueButton.addEventListener('click', reset);



};

function addToBet1() {

    totalBetAmount += 1;
    document.getElementById('totalBet').innerHTML = `Total Bet: ${totalBetAmount}`;
    removeBetAmountFromTotalMoneyTemp();
}

function addToBet10() {

    totalBetAmount += 10;
    document.getElementById('totalBet').innerHTML = `Total Bet: ${totalBetAmount}`;
    removeBetAmountFromTotalMoneyTemp();
}

function addToBet50() {

    totalBetAmount += 50;
    document.getElementById('totalBet').innerHTML = `Total Bet: ${totalBetAmount}`;
    removeBetAmountFromTotalMoneyTemp();
}

function addToBet100() {

    totalBetAmount += 100;
    document.getElementById('totalBet').innerHTML = `Total Bet: ${totalBetAmount}`;
    removeBetAmountFromTotalMoneyTemp();
}

function cancelBet() {
    totalMoney = totalMoney + totalBetAmount;
    document.getElementById('totalMoney').innerHTML = `Total Money: ${totalMoney}`;
    totalBetAmount = 0;
    document.getElementById('totalBet').innerHTML = `Total Bet: ${totalBetAmount}`;
    

};

function removeBetAmountFromTotalMoneyTemp() {

    totalMoney = startingMoney - totalBetAmount;
    document.getElementById('totalMoney').innerHTML = `Total Money: ${totalMoney}`;

};

function processBet() {

    if (result === 'win') {
        startingMoney = startingMoney + totalBetAmount;
    } else if (result === 'lose') {
        startingMoney = startingMoney - totalBetAmount;
    } else if (result === 'push') {
        startingMoney = startingMoney;
    };
    document.getElementById('totalMoney').innerHTML = `Total Money: ${startingMoney}`;

    

};


// event listener for deal button

var dealButton = document.getElementById('dealButton');
dealButton.addEventListener('click', deal);

var cancelBetButton = document.getElementById('cancelBetButton');
cancelBetButton.addEventListener('click', cancelBet);

var betButton1 = document.getElementById('betButton1');
betButton1.addEventListener('click', addToBet1);

var betButton10 = document.getElementById('betButton10');
betButton10.addEventListener('click', addToBet10);

var betButton50 = document.getElementById('betButton50');
betButton50.addEventListener('click', addToBet50);

var betButton100 = document.getElementById('betButton100');
betButton100.addEventListener('click', addToBet100);




