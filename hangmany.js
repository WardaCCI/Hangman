$(document).ready(function() {
  // Liste des mots de programmation pour le jeu
  var programming_languages = [
    "informatique",
    "developpement",
    "web",
    // Autres mots de programmation...
    "oracle",
  ]

  let answer = '';
  let maxWrong = 6;
  let mistakes = 0;
  let guessed = [];
  let wordStatus = null;

  // Sélectionne un mot aléatoire dans la liste de mots de programmation
  function randomWord() {
    answer = programming_languages[Math.floor(Math.random() * programming_languages.length)];
  }

  // Génère les boutons du clavier virtuel avec les lettres de l'alphabet
  function generateButtons() {
    let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
      `
        <button
          class="btn btn-lg btn-primary m-2 alphabet"
          id='` + letter + `'
        >
          ` + letter + `
        </button>
      `).join('');
    $('#keyboard').html(buttonsHTML);
  }

  // Gestion du clic sur une lettre du clavier virtuel
  $(document).on('click', '.alphabet', function() {
    handleGuess(this.id);
  });

  // Fonction pour gérer la lettre choisie par le joueur
  function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === -1 ? guessed.push(chosenLetter) : null;
    $('#' + chosenLetter).attr('disabled', true);
    if (answer.indexOf(chosenLetter) >= 0) {
      guessedWord();
      checkIfGameWon();
    } else if (answer.indexOf(chosenLetter) === -1) {
      mistakes++;
      updateMistakes();
      checkIfGameLost();
      updateHangmanPicture();
    }
  }

  // Met à jour l'image du pendu en fonction du nombre d'erreurs
  function updateHangmanPicture() {
    $('#hangmanPic').attr('src', './images/' + mistakes + '.jpg');
  }

  // Vérifie si le joueur a gagné la partie
  function checkIfGameWon() {
    if (wordStatus === answer) {
      $('#keyboard').html('Bravo tu as gagné!!!');
    }
  }

  // Vérifie si le joueur a perdu la partie
  function checkIfGameLost() {
    if (mistakes === maxWrong) {
      $('#wordSpotlight').html('La réponse était : ' + answer);
      $('#keyboard').html('Perdu !!!');
    }
  }

  // Met à jour l'affichage du mot avec les lettres devinées
  function guessedWord() {
    wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');
    $('#wordSpotlight').html(wordStatus);
  }

  // Met à jour le nombre d'erreurs affiché
  function updateMistakes() {
    $('#mistakes').html(mistakes);
  }

  // Réinitialise le jeu
  function reset() {
    mistakes = 0;
    guessed = [];
    $('#hangmanPic').attr('src', './images/0.jpg');
    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
  }

  // Gestion du clic sur le bouton de réinitialisation
  $('#resetButton').on('click', function() {
    reset();
  });

  // Affiche le nombre maximal d'erreurs autorisées
  $('#maxWrong').html(maxWrong);

  // Sélectionne un mot aléatoire, génère les boutons du clavier et affiche le mot initial
  randomWord();
  generateButtons();
  guessedWord();
});