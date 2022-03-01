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
                console.log(phone.slug)
                const newDiv = document.createElement('div');
                newDiv.className = 'col-md-3';
                const phoneInfo = 
                    `
                        <a href="#clicked" class="text-decoration-none text-white">

                        <div id="clicked" onclick="displayDetails('${phone.slug}')" class="bg-info rounded text-center h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">

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

    const displayDetails = id =>{
        const url = `https://openapi.programming-hero.com/api/phone/${id}`;
        fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneInfo(data.data))
    };

    const displayPhoneInfo = phone =>{
        console.log(phone)
        const phoneDetailsDiv = document.getElementById('phoneDetails');

        phoneDetailsDiv.innerHTML = `
            <img class="img-fluid rounded mb-4" src="${phone.image}" alt="">
            <h4>Name: ${phone.name}</h4>
            <h4>Release Date: ${phone.releaseDate}</h4>
            <h3 class="pt-3">Main Features </h3>
            <ul class="list-unstyled mb-0">
            <li>✅ChipSet: ${phone.mainFeatures.chipSet}</li>
            <li>✅Display Size:${phone.mainFeatures.displaySize}</li>
            <li>✅Memomry: ${phone.mainFeatures.memory}</li>
            <li>✅Storage${phone.mainFeatures.storage}</li>
            <li>✅Sensors: ${phone.mainFeatures.sensors}</li>
        
        
        `
    }

 
