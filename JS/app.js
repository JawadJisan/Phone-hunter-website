const searchBtn = document.getElementById('searchBtn');
const containerData = document.getElementById('phone');
const warning = document.getElementById('warning');
warning.style.display = 'none';

searchBtn.addEventListener('click', 
    function () 
    {
        const searchArea = document.getElementById('searchArea').value;
        searchArea.innerHTML = '';
        containerData.innerHTML = '';
        if (searchArea === '') {
            warning.style.display = 'block';
        } 
        else 
        {
            getPhones(searchArea);
            warning.style.display = 'none';
        }
    }
);

function getPhones(searchArea){

    const mainApi = `https://openapi.programming-hero.com/api/phones?search=${searchArea}`;

    fetch(mainApi)
        .then(res => res.json())
        .then(data => displayPhone(data.data));
}

    const displayPhone = phones => 
    {
        const phoneDiv = document.getElementById('phone');
        if (phones != null) 
        {
            phones.map(phone => 
                {
                console.log(phone.brand)
                const newDiv = document.createElement('div');
                newDiv.className = 'col-md-3';
                const phoneInfo = 
                    `
                        <a href="#clicked" class="text-decoration-none text-white">

                        <div>

                        <img class="img-fluid rounded-top" src="${phone.image}" alt="">

                        <h3 class=" py-4 px-2 mb-0">${phone.brand}</h3>

                        <h4 class=" py-4 px-2 mb-0">${phone.phone_name}</h4>

                        </div>
                        </a>
                    `;

                newDiv.innerHTML = phoneInfo;
                phoneDiv.appendChild(newDiv);
                }
            );
        } 
        else
        {
            warning.style.display = 'block';
        }
    };

 
