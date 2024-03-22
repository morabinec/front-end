// Variable declaration
let cards = [];
let dealerCards = [];
let dealerSum = 0;
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";

// References to HTML elements
let messageEl = document.getElementById("message-el");
let dealerEl = document.getElementById("dealer-el");
let dealerSumEl = document.getElementById("dealerSum-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");

// Function to generate a card with a random value
function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber > 10 && randomNumber !== 11) {
        return 10;
    } else {
        return randomNumber;
    }
}

// Function to start a game
function startGame() {
    isAlive = true;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    let dealerCard = getRandomCard();
    dealerCards = [dealerCard]; // allocating dealer's card to its array
    cards = [firstCard, secondCard]; //allocating players's card to its array
    dealerSum = dealerCard;
    sum = firstCard + secondCard;
    renderGame(); // Calls the renderGame function to see the updated game state
}

// Function to render the game state to the screen
function renderGame() {

    // Displays the dealer's cards and sum
    dealerEl.textContent = "Dealer: ";
    for (let i = 0; i < dealerCards.length; i++)
    {
        dealerEl.textContent += dealerCards[i] + " ";
    }
    dealerSumEl.textContent = "Dealer's Sum: " + dealerSum + " ";

    // Displays the player's cards and sum
    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < cards.length; i++) 
    {
        cardsEl.textContent += cards[i] + " ";
    }
    sumEl.textContent = "Sum: " + sum;

    // Displays the current state of the game
    if (sum < 21) {
        message = "Hit or Stand?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
    } else {
        message = "You're out of the game!";
        isAlive = false;
    }
    document.getElementById("message-el").textContent = message;

}

// Function to draw a new card for the player
function newCard() {
    if (isAlive === true && hasBlackJack === false) 
    {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();
    }
}

// Function for the dealer to draw a card
function dealerDraws ()
{
    if (isAlive === true)
    {
        let card = getRandomCard();
        dealerSum += card;
        dealerCards.push(card);
        renderGame();
    }
}

// Function to stand (stop drawing cards)
function stand() 
{
    // Keep drawing cards for the dealer until sum is 17 or higher
    while (dealerSum < 17) 
    {
        dealerDraws();
    }

    if (sum < dealerSum && dealerSum <= 21) {
        message = "You have lost!";
    } else if (sum === dealerSum) {
        message = "You are tied!";
    } else {
        message = "You have won!";
    }

    messageEl.textContent = message;
    
}
