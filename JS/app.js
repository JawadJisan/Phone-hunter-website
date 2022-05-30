const searchBtn = document.getElementById('searchBtn');
const containerData = document.getElementById('phone');
const warning = document.getElementById('warning');
warning.style.display = 'none';

// spinner
const toggleSpinner = displaySpinner =>{
    document.getElementById('spinner').style.display = displaySpinner;
    
}

searchBtn.addEventListener('click', 
    function () 
    {
        const searchArea = document.getElementById('searchArea').value;

    const searchField = document.getElementById('searchArea');
    // clear data
    searchField.value = '';
        toggleSpinner('block');
        // document.getElementById('searchArea') = '';
        containerData.innerHTML = '';
        if (searchArea === '' && searchArea != getPhones  ) {
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
        // phones.forEach(phone => {
        
        // });
        const phoneDiv = document.getElementById('phone');

        if (phones != null){
            phones.forEach(phone => 
                {
                // console.log(phone)
                console.log('the',phones.lenght)

                // console.log(phone)
                // console.log(phone.slug)
                const newDiv = document.createElement('div');
                newDiv.className = 'col-lg-4';

                const phoneInfo = 
                    `

                        <div id="clicked"  class="p-3 rounded text-center h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">

                        <img class="img-fluid w-75 rounded-top" src="${phone.image}" alt="">

                        <h3 class=" py-4 px-2 mb-0">Brand: ${phone.brand}</h3>

                        <h4 class=" py-4 px-2 mb-0">Model: ${phone.phone_name}</h4>
                        <button id="details-btn" onclick="displayDetails('${phone.slug}')" class="btn btn-primary" type="button">Details</button>
                        </div>
                    `
                    ;

                newDiv.innerHTML = phoneInfo;
                phoneDiv.appendChild(newDiv);
                }
            );
            toggleSpinner('none')
        } 

        else if(phones.lenght == 0 && !phones)
        {
            warning.style.display = 'block';
            toggleSpinner('none')

        }
        else{
            warning.style.display = 'block';
            toggleSpinner('none')
        }

    };

    // display mobile phone search result
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
            <div id="phone-details">
            <img class="img-fluid rounded-top" src="${phone.image}" alt="">
            <h4>Name: ${phone.name}</h4>
            <h4>Release Date: ${phone.releaseDate ? phone.releaseDate: 'No Release Date Found!!' }</h4>
            </div>
            <h3 class="pt-3 text-center">Main Features </h3>
            
        <ul class="list-unstyled mb-0">
            <li>✅ChipSet: ${phone.mainFeatures.chipSet}</li>
            <li>✅Display Size: ${phone.mainFeatures.displaySize}</li>
            <li>✅Memomry: ${phone.mainFeatures.memory}</li>
            <li>✅Storage: ${phone.mainFeatures.storage}</li>

            <h3 class="pt-3 text-center">Sensors</h3>
            <li>✅Sensors: ${phone.mainFeatures.sensors}</li>

            <h3 class="pt-3 text-center">Others</h3>
            <li>✅Blututh: ${phone.others.Bluetooth ? phone.others.Bluetooth: 'Not Available' }</li>
            <li>✅GPS: ${phone.others.GPS}</li>
            <li>✅NFC: ${phone.others.NFC}</li>
            <li>✅Radio: ${phone.others.Radio}</li>
            <li>✅USB: ${phone.others.USB}</li>
            <li>✅WLAN: ${phone.others.WLAN}</li>
        </ul>
        
        `
    };

 
