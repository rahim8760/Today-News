// catagory add


fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then(res => res.json())
    .then(data => displayNews(data.data.news_category))
    .catch(error => console.log(error));




const displayNews = NewsCatagoris => {
    
    const showAll = document.getElementById('show-categories');
    NewsCatagoris.forEach(catagorie => {
        const list = document.createElement('div');
        list.innerHTML=`
        <button onclick="catagoryId(${catagorie.category_id})" id="catagory-btn" class="btn ">${catagorie.category_name}</button>
        `
        showAll.appendChild(list);
    })

}