let correctAnswer = 0;
let pays;
let capital1;
let capital2;
let capital3;
let capital4;

const totalQuestions = 10;// Nombre total de questions dans le quiz
let currentQuestion = 0; // Index de la question actuelle
// On limitte le quizz a 10 question
function generateQuizz() {
  if (currentQuestion >= totalQuestions) {
    return endQuizz();
  }
  
//Chacque fois qu'on clique sur un question +1(currentQuestion) et on rapelle le quizz
function checkAnswer(event) {
// Empêche le comportement par défaut du clic sur le bouton, évitant ainsi le rechargement de la page
// À l'intérieur de la fonction checkAnswer()
    event.preventDefault();
    currentQuestion++;
//Si capital1 (La bonne réponce) est égal a la réponce sélectionner +1 correctAnswer
  if (capital1 === event.target.innerText) {
        correctAnswer++;
    }
    generateQuizz();
}

//On génère 4 id différent entre 1 et 194
function generateFourUniqueRandomId(min, max) {
//Un Set est une collection d'éléments uniques où chaque élément ne peut apparaître qu'une seule fois.
    const id = new Set();
    while (id.size < 4) {
//Math.random() renvoie un nombre décimal compris entre 0 et 1, et Math.floor() arrondit ce nombre à l'entier
        const randomId = Math.floor(Math.random() * (max - min + 1)) + min;
        id.add(randomId);
    }
//La méthode Array.from() crée un nouveau tableau à partir des éléments du Set.
    return Array.from(id);
}
const randomId = generateFourUniqueRandomId(1, 194);

// Extraction des données du JSON (pays.json)
fetch('pays.json')
.then(response => response.json())
.then(data => {
//On va chercher les donnée dans le fichier JSON
// data[1].Pays = Afghanistan
    pays = data[Number.parseInt(`${randomId[0]}`, 10)].Pays;
    capital1 = data[Number.parseInt(`${randomId[0]}`, 10)].Capitale;
    capital2 = data[Number.parseInt(`${randomId[1]}`, 10)].Capitale;
    capital3 = data[Number.parseInt(`${randomId[2]}`, 10)].Capitale;
    capital4 = data[Number.parseInt(`${randomId[3]}`, 10)].Capitale;
    
    console.log(data[randomId[0]].Pays)
    console.log(data[randomId[0]].Capitale)

    // Mélange aléatoire du tableau des capitales
      const capitals = [capital1, capital2, capital3, capital4];
     //On commence par le dernier élément (capitals.length - 1) et en se déplaçant vers le premier élément (i > 0).
      for (let i = capitals.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [capitals[i], capitals[j]] = [capitals[j], capitals[i]];
      }
  
      const container = document.getElementsByClassName('container')[0];
      container.innerHTML = '';
      // Création de la partie quizz aprés avoir retirer les élément HTML présent
      let questionQuizz = document.createElement("h2");
      questionQuizz.innerText = `Quelle est la capitale "${pays}"`;
      container.appendChild(questionQuizz);

    // Boucle pour créer les boutons de réponse dans le quizz
      for (let i = 0; i < capitals.length; i++) {
    // Création d'un bouton de réponse en utilisant la fonction createButton()
        let responseQuizz = createButton(capitals[i], checkAnswer);
    // Ajout du bouton de réponse au conteneur
        container.appendChild(responseQuizz);
      }

      const numberAnswer = document.createElement("p");
      numberAnswer.innerText = `Question n°${currentQuestion} |  Score ${correctAnswer}/10`
      container.appendChild(numberAnswer);

    })
    .catch(error => {
      console.error('Erreur :', error);
    });
}

//Création du bouton du quiz
function createButton(text, onClick) {
  const button = document.createElement("button");
  button.innerText = text;
  button.classList.add("btn-answer");
  button.addEventListener("click", onClick);
  return button;
}

//Bouton pour comencer le quiz
const startButton = document.getElementById('btn-start');
startButton.addEventListener("click", (event) => {
    generateQuizz();
})

function endQuizz() {
  const container = document.getElementsByClassName('container')[0];
  container.innerHTML = '';
  
  const endAnswer = document.createElement("p");
  endAnswer.innerText = `Votre score final est de ${correctAnswer}/10`
  endAnswer.classList.add("endScores");
  container.appendChild(endAnswer);

 
    const endResult = document.createElement("h3");
    container.appendChild(endResult);
    if (correctAnswer <= 3 ) {
      endResult.innerHTML = ` <i class="fa-solid fa-poo"></i>`
    } else if (correctAnswer <= 6 && correctAnswer > 3) {
      endResult.innerHTML = ` <i class="fa-regular fa-face-grin-beam-sweat"></i>`
    } else if (correctAnswer < 8 && correctAnswer > 6) {
      endResult.innerHTML = `<i class="fa-solid fa-face-grin-wink"></i>`
    } else if (correctAnswer >= 8) {
      endResult.innerHTML = `<i class="fa-solid fa-face-laugh-beam"></i>`
    }

  
  let restartQuizz = document.createElement("button");
    restartQuizz.innerText = `Rejouer`;
    restartQuizz.id = "btn-restart"
    container.appendChild(restartQuizz);
    restartQuizz = document.getElementById('btn-restart');
      restartQuizz.addEventListener("click", (event) => {
          currentQuestion = 0;
          correctAnswer = 0;
          generateQuizz();
      })

  return container;
}
