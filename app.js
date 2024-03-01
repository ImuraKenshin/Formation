// JS doit lire le document avant de traiter
window.addEventListener("DOMContentLoaded",chargement)
function chargement(){
    console.log("Lecture du DOM")
}

// la section contient les fonctions liées au Json escape-game

// je vais chercher le fichier json
fetch("./escape-game.json")
// j'extrais les données du fichier json
.then(data =>{
    return data.json()  
})
// je crée les noms fonctions dont je vais avoir besoin et je renseigne les données json dont elles vont avoir besoin
.then(game =>{
    // liste des fonctions liées au json
    // fonction banniere
    banniere(game.entreprise)

    //fonction activites
    activites(game.entreprise.activites)
    
    //fonction infoJeu
    infoJeu(game.entreprise.avantagesClients)

    // fonction avis
    avis(game.entreprise.temoignages)

})

// la section traite le contenu de la banniere
/**
 * la fonction injecte du contenu dynamique dans une div
 * @param {.json()} donnees 
 */
function banniere(donnees){
    // j'appel mes variables
    let content = document.querySelector(".banniereContent")
    //je modifie le contenu de mes variables à l'aide des données de ma fonction
    content.innerHTML = `<div><img class="picto pictoTitre img" src="./images/Eye.png" alt="picto oeil"></div>
    <h1 class="alignCenter large-12 medium-12 small-12">${donnees.nomCommercial}</h1>
    <p class="paraTitre">${donnees.phraseAccroche}</p>
    <div class="buttonContainer flex large-12 medium-12 small-12"><a class="button" href="" title="reservation">${donnees.texteAppelAction}</a></div>`
}

// la section traite le contenu de la div articleContainer
/**
 * la fonction injecte du contenu dynamique dans une div
 * @param {.json()} donnees 
 */
function activites(donnees){
    // j'appel mes variables
    let article = document.querySelector(".articleContainer")
    // le contenu de la donnée json activites est un tableau
    // pour chaque élement du tableau
    donnees.forEach(donnee => {
        // je modifie le contenu de ma variable et je publie l'article
        article.innerHTML += `<article class="articleContent flex"><div class="articleImg large-12 average-12 medium-12 small-12"><img class="img" src="./images/${donnee.image}" alt="photo d'une activité"></div>
        <div class="activite large-12 medium-12 small-12">
            <h2 class="titreActivite ">${donnee.nom}</h2>
            <p class="paraActivite ">${donnee.description}</p>
        </div>
        <div class=""><a class="button" href="" title="reservation">Réservez cette salle</a></div></article>`
    });
}

// la section traite le contenu de la div infoJeu
/**
 * la fonction inject le contenu d'un tableau de façon dynamique dans une div
 * @param {Array} donnees 
 */
function infoJeu(donnees){
    // j'appel mes variables
    let content = document.querySelector(".infoJeu")
    // le contenu de la donnée json avantagesClients est un tableau
    // pour chaque élement du tableau
    donnees.forEach(donnee => {
        // je modifie le contenu de ma variable et je publie l'info
        content.innerHTML += `<div class="infoJeuContent flex container large-3 medium-3 small-10">
        <div class="flex infoJeuImg large-12 medium-12 small-12"><img class="picto img" src="./images/${donnee.picto}" alt="image d'une carte"></div>
        <p class="paraInfoJeu large-9 medium-9 small-9">${donnee.texte}</p>
    </div>`        
    });
}

// la section traite le contenu de la div avisContainer

// la fonction gère la note en étoile
/**
 * la fonction teste les données d'un tableau et retourne une chaine de caractère
 * @param {Array} donnee 
 * @returns "chaine de caractère"
 */
function etoile (donnee){
    //j'appel mes varaibles
    let content = ""
    // si la note est strictement égale à 0 => je publie 5 étoiles vides
    if(donnee === 0){
        return content = "☆☆☆☆☆"
    }
    // si la note est strictement égale à 1 => je publie 1 étoile pleine et 4 étoiles vides
    else if(donnee === 1){
        return content = "★☆☆☆☆"
    }
    // si la note est strictement égale à 2 => je publie 2 étoiles pleines et 3 étoiles vides
    else if(donnee === 2){
        return content = "★★☆☆☆"
    }
    // si la note est strictement égale à 3 => je publie 3 étoiles pleines et 2 étoiles vides
    else if(donnee === 3){
        return content = "★★★☆☆"
    }
    //// si la note est strictement égale à 4 => je publie 4 étoiles pleines et 1 étoiles vides
    else if(donnee === 4){
        return content = "★★★★☆"
    }
    // si la note est strictement égale à 5 => je publie 5 étoiles pleines
    else if(donnee === 5){
        return content = "★★★★★"
    }
    // dans le cas peut probable où le client ne renseigne pas de note
    else{
        return content = "Pas d'avis renseigné"
    }
}



// la fonction affiche le contenu sur la page
/**
 * la fonction injecte les données de tableaux de façon dynamique dans une div
 * @param {Array} donnees 
 */
function avis (donnees){
    // j'appel mes variables
    let content = document.querySelector(".avisContainer")
    // le contenu de la donnée json temoignages est un tableau
    // pour chaque élément du tableau
    donnees.forEach(donnee => {
        // je modifie le contenu de ma variable et je publie l'article
        content.innerHTML += `<article class="avis large-3 medium-8 small-8">
        <div class="profil flex large-12 medium-12 small-12">
            <div class="avisImg"><img class="img" src="./images/${donnee.photo}" alt="photo de profil"></div>
            <div class="profilContent large-7 medium-7 small-7 flex">
                <h5 class="large-12 medium-12 small-12">${donnee.prenom}</h5>
                <p class="large-12 medium-12 small-12">${donnee.typeExperience}</p>
                <div class ="etoile">${etoile(donnee.note)}</div>
                <div></div>
            </div>
        </div>
        <div class="paraAvis">
            <p>${donnee.commentaire}</p>
        </div>
    </article>`        
    });
}