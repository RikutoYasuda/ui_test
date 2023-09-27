// script.js
const openModalButton = document.getElementById('openModal');
const closeModalButton = document.getElementById('closeModal');
const mealItemsContainer = document.getElementById('mealItems');
const mealCardsContainer = document.getElementById('mealCards');
const completeMealButton = document.getElementById('completeMeal');

let mealItemCounter = 1;

openModalButton.addEventListener('click', () => {
    mealItemsContainer.innerHTML = '';
    mealItemCounter = 1;
    modal.style.display = 'block';
    addMealItem();
});

closeModalButton.addEventListener('click', () => {
    mealItemsContainer.innerHTML = '';
    mealItemCounter = 1;
    modal.style.display = 'none';
});

function addMealItem() {
    const mealItemDiv = document.createElement('div');
    mealItemDiv.classList.add('meal-item');

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = `食事 ${mealItemCounter}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '削除';
    deleteButton.style.display = 'none';

    mealItemDiv.appendChild(input);
    mealItemDiv.appendChild(deleteButton);

    mealItemsContainer.appendChild(mealItemDiv);

    input.addEventListener('input', () => {
        if (input.value.trim() === '') {
            deleteButton.style.display = 'inline';
        } else {
        deleteButton.style.visibility = 'hidden'; // 削除ボタンを非表示に
        }
    });

    input.addEventListener('focus', () => {
        if (input === mealItemsContainer.lastElementChild.querySelector('input')) {
            mealItemCounter++;
            addMealItem();
        }
    });

    let isIMEComposing = false; // IME の確定モードをトラッキングするフラグ

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            // IME の確定モードでなければ次のテキストインプットにフォーカス
            if (!isIMEComposing) {
                event.preventDefault();
                const nextInput = mealItemDiv.nextElementSibling?.querySelector('input');
                if (nextInput) {
                    nextInput.focus();
                }
            }
        }
    });

    // IME の確定モードの開始と終了を検出
    input.addEventListener('compositionstart', () => {
        isIMEComposing = true;
    });

    input.addEventListener('compositionend', () => {
        isIMEComposing = false;
    });

    deleteButton.addEventListener('click', () => {
        mealItemsContainer.removeChild(mealItemDiv);
    });
}

completeMealButton.addEventListener('click', () => {
    const mealItems = mealItemsContainer.querySelectorAll('.meal-item input');
    const mealValues = Array.from(mealItems).map(item => item.value.trim());

    mealValues.forEach(value => {
        if (value !== '') {
            const card = document.createElement('div');
            card.classList.add('meal-card');
            card.textContent = value;

            const deleteCardButton = document.createElement('button');
            deleteCardButton.textContent = '削除';
            deleteCardButton.addEventListener('click', () => {
                mealCardsContainer.removeChild(card);
            });

            card.appendChild(deleteCardButton);

            mealCardsContainer.appendChild(card);
        }
    });

    mealItemsContainer.innerHTML = '';
    mealItemCounter = 1;
    modal.style.display = 'none';
});
