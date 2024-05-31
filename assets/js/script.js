document.addEventListener('DOMContentLoaded', function() {

    // GESTION DES LANGUES
    let langage = "fr";  

    function changeLanguage(newLanguage) { // Gère l'affiche de chaque langue via leur data-lang
        langage = newLanguage;
    
        const elements = document.querySelectorAll('[data-lang]');
        const menuLanguage = document.getElementById('menuLanguage');
    
        elements.forEach(function(element) {
            if (element !== menuLanguage && element.parentElement !== menuLanguage) { // Ne sélectionne pas les éléments du menu des langues afin que ces derniers restent afficher
                const langElement = element.getAttribute('data-lang');
    
                if (langElement === langage) {
                    element.style.display = 'block';
                } else {
                    element.style.display = 'none';
                }
            }
        });
    }

    function clickLangue() { // Extrait l'attribut data-lang de l'élément sur lequel on a cliqué et appelle la fonction changeLanguage pour mettre à jour l'affichage en fonction de la nouvelle langue sélectionnée
        const newLanguage = this.getAttribute('data-lang');
        changeLanguage(newLanguage);
    }

    const langItems = document.querySelectorAll('#menuLanguage div'); 
    langItems.forEach(function(langItem) { // Parcourt le menu des langues puis appelle la fonction clickLangue
        langItem.addEventListener('click', clickLangue);
    });

    changeLanguage('fr');

    
    // GESTION OUVERTE ET FERMETURE PARTIE INTRODUCTION, SAVOIR + ET COPYRIGHT
    function ouvrirFenetre(idElement) {
        document.getElementById(idElement).style.display = 'block';
    }

    function fermerFenetre(idElement) {
        document.getElementById(idElement).style.display = 'none';
    }

    document.getElementById('introductionButton').addEventListener('click', function() {
        ouvrirFenetre('introductionPage');
    });
    document.getElementById('closeIntroduction').addEventListener('click', function() {
        fermerFenetre('introductionPage');
    });
    document.getElementById('readMoreButton').addEventListener('click', function() {
        ouvrirFenetre('readMorePage');
    });
    document.getElementById('closeReadMore').addEventListener('click', function() {
        fermerFenetre('readMorePage');
    });
    document.getElementById('copyrightButton').addEventListener('click', function() {
        ouvrirFenetre('copyrightPage');
    });
    document.getElementById('closeCopyright').addEventListener('click', function() {
        fermerFenetre('copyrightPage');
    });



    // GESTION DES POI
    const circles = document.querySelectorAll('.circle');
    const openPOIElements = document.querySelectorAll('.openPOI');
    
    circles.forEach(circle => {
        const circleId = circle.id;
        const openPOI = document.getElementById(`openPOI${circleId.slice(3)}`);
        const closeButton = document.getElementById(`closeButtonPOI${circleId.slice(3)}`);
    
        circle.addEventListener('click', function() {
            closeOtherPOIs(openPOI);
    
            if (openPOI) {
                ouvrirFenetre(openPOI.id);
            }
        });
    
        if (closeButton) {
            closeButton.addEventListener('click', function() {
                if (openPOI) {
                    fermerFenetre(openPOI.id);
                }
            });
        }
    });
    
    const poiAngeVictoires = document.querySelectorAll ('.poi-angeVictoire');
    const openPOI4 = document.getElementById('openPOI4');

    poiAngeVictoires.forEach(poi => {
        poi.addEventListener('click', () => {
            closeOtherPOIs(openPOI4);
            
            if (openPOI4) {
                ouvrirFenetre(openPOI4.id)
            }
        });
    });
    
    const poiOutils = document.querySelectorAll('.poi-outils'); 
    const openPOI9 = document.getElementById('openPOI9');

    poiOutils.forEach(poi => { 
        poi.addEventListener('click', () => { 
            closeOtherPOIs(openPOI9); 

            if (openPOI9) {
                ouvrirFenetre(openPOI9.id);
            }
        }); 
    }); 

    function closeOtherPOIs(excludePOI) {
        openPOIElements.forEach(poielement => {
            if (poielement !== excludePOI) {
                fermerFenetre(poielement.id);
            }
        });
    }

    // GESTION DE LA NAVBAR DE LA PAGE EN SAVOIR +

    const navbarCats = document.querySelectorAll('.navbarCat');
    const openNavbarCatElements = document.querySelectorAll('.openNavbarCat');

    navbarCats.forEach(navbarCat => {
        const navbarCatId = navbarCat.id;
        const navbar = document.getElementById(`openNavbarCat${navbarCatId.slice(6)}`);

        navbarCat.addEventListener('click', function() {
            closeOtherNavbarCat(navbar);

            if (navbar) {
                ouvrirFenetre(navbar.id);
                activateFirstSubCat(navbar); // Appeler la fonction pour activer le premier subCat
            }
        });
    });

    function setActiveLink(pageId) {
        navbarCats.forEach(navbarCat => {
            if (navbarCat.id === `navbar${pageId}`) {
                navbarCat.style.color = 'rgb(0, 198, 212)';
            } else {
                navbarCat.style.color = '';
            }
        });
    }

    function closeOtherNavbarCat(excludeNavbarCat) {
        openNavbarCatElements.forEach(navbarCatElement => {
            if (navbarCatElement !== excludeNavbarCat) {
                navbarCatElement.style.display = 'none';
                // En plus de fermer la navbar, fermons également les openSubCat associés
                const subCatsToClose = navbarCatElement.querySelectorAll('.openSubCategorie');
                subCatsToClose.forEach(subCatToClose => {
                    subCatToClose.style.display = 'none';
                });
            }
        });
        if (excludeNavbarCat) {
            const pageId = excludeNavbarCat.id.slice(13);
            setActiveLink(pageId);
        }
    }

setActiveLink(1);

// GESTION DES CATEGORIES DE LA NAVBAR DE LA PAGE EN SAVOIR +

    const subCats = document.querySelectorAll('.subCategorie');
    const openSubCatElements = document.querySelectorAll('.openSubCategorie');

    subCats.forEach(subCat => {
        const subCatId = subCat.id;
        const subCategories = document.getElementById(`openSubCat${subCatId.slice(6)}`);

        subCat.addEventListener('click', function() {
            closeOtherSubCat(subCategories);

            if (subCategories) {
                ouvrirFenetre(subCategories.id);
            }
        });
    });

    function setActiveSub(subId) {
        subCats.forEach(subCat => {
            if (subCat.id === `subCat${subId}`) {
                subCat.classList.add('subCatActive');
            } else {
                subCat.classList.remove('subCatActive');
            }
        });
    }

    setActiveSub(1);

    function closeOtherSubCat(excludeSubCat) {
        openSubCatElements.forEach(subCatElement => {
            if (subCatElement !== excludeSubCat) {
                fermerFenetre(subCatElement.id);
            }
        });
        if (excludeSubCat) {
            const subId = excludeSubCat.id.slice(10)
            setActiveSub(subId)
        }
    }

    function activateFirstSubCat(navbar) {
        const firstSubCat = navbar.querySelector('.openSubCategorie');
        if (firstSubCat) {
            firstSubCat.style.display = 'block';
            setActiveSub(firstSubCat.id.slice(10));
        }
    }
});