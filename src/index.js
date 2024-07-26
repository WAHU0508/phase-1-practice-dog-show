document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('table-body');
    const form = document.getElementById('dog-form');
    form.addEventListener('submit', handleSubmit);
    let currentDogId = null
    fetchDogs();

    function fetchDogs() {
        fetch('http://localhost:3000/dogs')
        .then(res => res.json())
        .then(dogs => {
            dogs.forEach(dog => {
                fillTable(dog);
            });
        });
    }

    function fillTable(dog) {
        const row = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.textContent = dog.name;
        const td2 = document.createElement('td');
        td2.textContent = dog.breed;
        const td3 = document.createElement('td');
        td3.textContent = dog.sex;
        const td4 = document.createElement('td');
        const editBtn = document.createElement('button');
        editBtn.className = 'editButton';
        editBtn.textContent = 'Edit Dog';

        editBtn.addEventListener('click', () => editDog(dog));
        td4.appendChild(editBtn);
        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);
        tableBody.appendChild(row);
    }

    function editDog(dog) {
        form.reset();
        const nameField = document.getElementById('name');
        const breedField = document.getElementById('breed');
        const sexField = document.getElementById('sex');
        
        nameField.value = dog.name;
        breedField.value = dog.breed;
        sexField.value = dog.sex;
        
        // Store the dog ID in a data attribute
        currentDogId = dog.id;
    }

    function handleSubmit(e) {
        e.preventDefault();
        const nameField = document.getElementById('name').value;
        const breedField = document.getElementById('breed').value;
        const sexField = document.getElementById('sex').value;
        const newUpdate = {
            name: nameField,
            breed: breedField,
            sex: sexField
        };
            fetch(`http://localhost:3000/dogs/${currentDogId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newUpdate)
            })
            .then(res => res.json())
            .then(updatedDog => {
                tableBody.innerHTML = '';
                fetchDogs();
                form.reset();
                currentDogId = null; // Clear the dog ID
            });
    }
});
