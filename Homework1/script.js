fetch('schedule.json')
    .then(response => response.json())
    .then(data => {
        const scheduleContainer = document.getElementsByClassName('schedule')[0];
        data.forEach(item => {
            const scheduleItem = document.createElement('div');
            scheduleItem.classList.add('schedule__item', 'card');

            const scheduleItemBody = document.createElement('div');
            scheduleItemBody.classList.add('schedule__body', 'card-body');

            const itemName = document.createElement('div');
            itemName.classList.add('schedule__item__name', 'card-title');
            itemName.innerText = item.name;

            const itemTime = document.createElement('div');
            itemTime.classList.add('schedule__item__time', 'card-subtitle');
            itemTime.innerText = item.time;

            const itemMaxPeople = document.createElement('div');
            itemMaxPeople.classList.add('schedule__item__people', 'card-text');
            itemMaxPeople.innerText = `Набираем группу из ${item.maxPeople} человек`;

            const itemPeople = document.createElement('div');
            itemPeople.classList.add('schedule__item__people', 'card-text');
            itemPeople.innerText = `Участников: ${item.currentPeople}`;

            const button = document.createElement('button');
            button.classList.add('btn', 'btn-primary');
            button.innerText = item.currentPeople < item.maxPeople ? 'Записаться' : 'Запись завершена';
            button.disabled = item.currentPeople >= item.maxPeople;

            scheduleItem.appendChild(scheduleItemBody);
            scheduleItemBody.appendChild(itemName);
            scheduleItemBody.appendChild(itemTime);
            scheduleItemBody.appendChild(itemMaxPeople);
            scheduleItemBody.appendChild(itemPeople);
            scheduleItemBody.appendChild(button);

            let participation = false;
            button.onclick = () => {
                if (item.currentPeople < item.maxPeople && !participation) {
                    item.currentPeople++;
                    participation = true;
                    button.innerText = 'Отменить запись';
                } else {
                    item.currentPeople--;
                    participation = false;
                    button.innerText = 'Записаться';
                }
                itemPeople.innerText = `Участников: ${item.currentPeople}`;
            };

            scheduleContainer.appendChild(scheduleItem);
        });
    })
    .catch(error => console.error('Ошибка при загрузке расписания:', error));
