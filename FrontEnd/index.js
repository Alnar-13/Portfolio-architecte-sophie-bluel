document.addEventListener('DOMContentLoaded', () => {
    // URLs des API
    const apiUrlWorks = 'http://localhost:5678/api/works';
    const apiUrlCategories = 'http://localhost:5678/api/categories';
    
    // Sélection des éléments de la galerie et des filtres
    const galleryElement = document.querySelector('.gallery');
    const filtersElement = document.querySelector('#filters');
  
    // Fonction pour créer une figure avec une image et une légende
    const createFigure = (work) => {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      const figcaption = document.createElement('figcaption');
  
      img.src = work.imageUrl;
      img.alt = work.title;
      figcaption.textContent = work.title;
  
      figure.appendChild(img);
      figure.appendChild(figcaption);
  
      return figure;
    };
  
    // Fonction pour récupérer et afficher les travaux
    const fetchAndDisplayWorks = async (categoryId = null) => {
      try {
        const response = await fetch(apiUrlWorks);
        if (!response.ok) {
          throw new Error('Erreur de réseau');
        }
        const works = await response.json();
        galleryElement.innerHTML = ''; // Efface le contenu actuel
  
        const filteredWorks = categoryId ? works.filter(work => work.categoryId === categoryId) : works;
  
        filteredWorks.forEach(work => {
          const figure = createFigure(work);
          galleryElement.appendChild(figure);
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };
  
    // Fonction pour créer un bouton de filtre
    const createFilterButton = (name, categoryId = null) => {
      const button = document.createElement('button');
      button.textContent = name;
  
      button.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons
        const allButtons = document.querySelectorAll('.filters button');
        allButtons.forEach(btn => btn.classList.remove('active'));
  
        // Ajouter la classe active au bouton cliqué
        button.classList.add('active');
  
        // Filtrer les travaux
        fetchAndDisplayWorks(categoryId);
      });
  
      return button;
    };
  
    // Fonction pour récupérer et afficher les catégories
    const fetchAndDisplayCategories = async () => {
      try {
        const response = await fetch(apiUrlCategories);
        if (!response.ok) {
          throw new Error('Erreur de réseau');
        }
        const categories = await response.json();
  
        // Ajout du bouton "Tous"
        const allButton = createFilterButton('Tous');
        allButton.classList.add('active'); // Par défaut, le bouton "Tous" est actif
        filtersElement.appendChild(allButton);
  
        categories.forEach(category => {
          const button = createFilterButton(category.name, category.id);
          filtersElement.appendChild(button);
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };
  
    // Appeler les fonctions pour récupérer et afficher les catégories et les travaux
    fetchAndDisplayCategories();
    fetchAndDisplayWorks();
  });
  