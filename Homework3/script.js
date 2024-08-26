document.addEventListener("DOMContentLoaded", () => {
  const accessKey = 'POGT1Nn6BvamjViS8uZO_tEWdJmTHyze_kb4o55NHpw';
  const photo = document.querySelector('.container__photo');
  const author = document.querySelector('.container__author');
  const like = document.querySelector('.container__like');
  const likeCounter = document.querySelector('.container__like-counter');
  const prevButton = document.querySelector('.container__prev-button');
  const nextButton = document.querySelector('.container__next-button');

  let counter = parseInt(localStorage.getItem('totalLikes'), 10) || 0;

  let history = JSON.parse(localStorage.getItem('photoHistory')) || [];
  let currentIndex = history.length > 0 ? history.length - 1 : 0;

  // Общее количество лайков
  const updateLikeCounter = (count) => {
    localStorage.setItem('totalLikes', count);
    likeCounter.textContent = `Всего лайков: ${count}`;
  };

  // Отображение лайка
  const updateLikeButton = (liked) => {
    like.style.backgroundImage = liked
      ? `url(img/fillLike.svg)`
      : `url(img/emptyLike.svg)`;
  };

  // Управление состоянием лайков
  const toggleLike = () => {
    if (history[currentIndex]) {
      const currentPhoto = history[currentIndex];
      if (!currentPhoto.isLiked) {
        updateLikeButton(true);
        currentPhoto.isLiked = true;
        counter += 1;
      } else {
        updateLikeButton(false);
        currentPhoto.isLiked = false;
        counter = Math.max(counter - 1, 0);
      }

      updateLikeCounter(counter);
      localStorage.setItem('totalLikes', counter);
      localStorage.setItem('photoHistory', JSON.stringify(history));
    }
  };

  // Показ фото
  const displayPhoto = (photoData) => {
    if (photo && author && like) {
      photo.style.backgroundImage = `url(${photoData.urls.regular})`;
      author.textContent = `Автор: ${photoData.user.name}`;

      // Состояние кнопки лайка
      const isLiked = history[currentIndex]?.isLiked || false;
      updateLikeButton(isLiked);

      like.removeEventListener('click', toggleLike);
      like.addEventListener('click', toggleLike);
    
      updateLikeCounter(counter);
      toggleButtons();
    } else {
      console.error('Нет нужных элементов на странице');
    }
  };

  // Сохранение фото в историю
  const savePhotoToHistory = (photoData) => {
    if (history.length > 0) {
      history[history.length - 1].isLiked = like.style.backgroundImage.includes('fillLike.svg');
    }

    // Состояние лайка для нового фото
    photoData.isLiked = false;
    history.push(photoData);
    localStorage.setItem('photoHistory', JSON.stringify(history));
  };

  // Показ следующего фото
  const showPreviousPhoto = () => {
    if (currentIndex > 0) {
      currentIndex--;
      displayPhoto(history[currentIndex]);
    }
  };

  //Показ предыдущего фото
  const showNextPhoto = () => {
    if (currentIndex < history.length - 1) {
      currentIndex++;
      displayPhoto(history[currentIndex]);
    }
  };

  // Состояние кнопок
  const toggleButtons = () => {
    prevButton.classList.toggle('disable', currentIndex === 0);
    nextButton.classList.toggle('disable', currentIndex === history.length - 1);
  };

  prevButton.addEventListener('click', showPreviousPhoto);
  nextButton.addEventListener('click', showNextPhoto);

  // Загрузка контента по API и добавление в историю
  fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (history.length > 0) {
        history[history.length - 1].isLiked = like.style.backgroundImage.includes('fillLike.svg');
        localStorage.setItem('photoHistory', JSON.stringify(history));
      }

      savePhotoToHistory(data);
      currentIndex = history.length - 1;
      displayPhoto(data);
    })
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
    });

  // Инициализация состояния при загрузке страницы
  if (history.length > 0) {
    displayPhoto(history[currentIndex]);
  }
});
