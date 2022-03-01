document.getElementById('warning').style.display = 'none';

const searchMobile = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear search field
    searchField.value = '';
    // document.getElementById()
    const mainUrl = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(mainUrl)
    .then(res => res.json())
    .then(data => console.log(data))

}
searchMobile();
