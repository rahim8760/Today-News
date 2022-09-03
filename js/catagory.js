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
// loader/spenar

const lodingSpaner=isLoading=>{
    const spaner=document.getElementById('spnerSection');
    if (isLoading) {
        spaner.classList.remove('d-none')
    }else{
        spaner.classList.add('d-none')

    }
}



// All news Start

function catagoryId(id) {
    lodingSpaner(true);
const allNewsByCatagory= async()=>{
    const url=`https://openapi.programming-hero.com/api/news/category/0${id}`
    const res =await fetch(url);
    const data=await res.json();
    allNews(data.data)
}

const allNews=catagoryNews=>{
    const errorMassage=document.getElementById('error')
    // no news Found
    if (catagoryNews.length===0) {
        errorMassage.classList.remove('d-none');
    }else(
        errorMassage.classList.add('d-none')
    )
    // console.log(catagoryNews);
    const newsCount=document.getElementById('newsCount')
    newsCount.innerText=catagoryNews.length
    const newsFild=document.getElementById('news-fild');
    newsFild.innerHTML=''

    // sort code
    catagoryNews.sort((a, b) => b.total_view - a.total_view);


    catagoryNews.forEach(news => {
         const newsDiv=document.createElement('div')
        newsDiv.classList.add('col')
        newsDiv.innerHTML=`
        <div class="card rounded text-center mt-5 p-2" style="width: 18rem;">
            <img src="${news.thumbnail_url?news.thumbnail_url:'No Image Found'}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title ">${news.title.slice(0 , 70)}</h5>
            <p class="card-text">${news.details.slice(0 , 200)}...</p>
            </div>
            <div class="card-body">
                <img src="${news.author.img ?news.author.img:'No Image Found'}" class=" w-25 rounded-circle " alt="...">
                <a href="#" class="card-link text-dark text-decoration-none">${news.author.name ?news.author.name:'anonymous'}</a>
            </div>
            <div class="card-body">
                
                <a href="#" class="card-link text-dark text-decoration-none">${news.total_view ?news.total_view:'You are first'} views</a>
            </div>
            <div class="card-body">
                <a href="#" class="card-link text-dark text-decoration-none">${news.rating.number ?news.rating.number:'1'}</a>
                <a href="#" class="card-link text-dark text-decoration-none">${news.rating.badge ?news.rating.badge:'good'}</a>
                
            </div>
            <div class="card-body">
                <button onclick="newsId('${news._id}')" class="btn btn-primary rounded" data-bs-toggle="modal" data-bs-target="#exampleModal">Read More</button>
                </div>
            </div>
                `
                
        newsFild.appendChild(newsDiv);
        lodingSpaner(false);
    });

    
}
allNewsByCatagory()

}

//  modal section js code
function newsId(id)  {
    
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
    .then(res => res.json())
    .then(data => news(data.data))
    .catch(error => console.log('error'));
}
const news= id => {
    newsModal.innerHTML=''
    id.forEach(modal_Id => {
    const newsModal=document.getElementById('newsModal');  
    const newsModalDit=document.createElement('dmodal-contentiv')
    newsModalDit.classList.add('modal-body')
    newsModalDit.innerHTML=`
        <div class="modal-header">
            <h1 class="card-title ">${modal_Id.title ?modal_Id.title:"No Titel Found"}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div  class="modal-body">
            <div class="card text-white bg-black rounded text-center">
                <img src="${modal_Id.thumbnail_url ?modal_Id.thumbnail_url:"No image Found"}" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">${modal_Id.details ?modal_Id.details:"No description Found"}</p>
                </div>
                <div class="card-body">
                    <img src="${modal_Id.author.img ?modal_Id.author.img:"No Titel Found"}" class=" w-25 rounded-circle " alt="...">
                    <a href="#" class="card-link text-white text-decoration-none">${modal_Id.author.name ?modal_Id.author.name:"anonymous"}</a>
                </div>
                <div class="card-body">
                    
                    <a href="#" class="card-link text-white text-decoration-none">${modal_Id.total_view ?modal_Id.total_view:"you are first"} views</a>
                </div>
                <div class="card-body">
                    <a href="#" class="card-link text-white text-decoration-none">${modal_Id.rating.number ?modal_Id.rating.number:"1"}</a>
                    <a href="#" class="card-link text-white text-decoration-none">${modal_Id.rating.badge ?modal_Id.rating.badge:"Good"}</a>
                    
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    `
    newsModal.appendChild(newsModalDit)
})
}