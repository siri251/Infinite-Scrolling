

const key='R0u8DBUewrel-U49Yx7MkfH_HgOYwuhXme4XE3EETts';
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let photosArray = [];
let ready=false;
imagesloaded=0;
totalimages=0;

const count = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${key}&count=${count}`;

function imageloader(){
  imagesloaded++;
  if(imagesloaded===totalimages){
    ready = true;
    loader.hidden=true;
    console.log(imagesloaded)
    
  }

}




function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}


function displayPhotos() {
  
  totalimages=photosArray.length
  imagesloaded=0
  photosArray.forEach((photo) => {
    
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title:photo.alt_description
      
      
    });
   
    
    img.addEventListener('load',imageloader)
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
    try {
      const response = await fetch(apiUrl);
      photosArray = await response.json();
      displayPhotos();
    } catch (error) {
      
    }
  }


window.addEventListener('scroll',()=>{
  if(window.scrollY+window.innerHeight>=document.body.offsetHeight-1000 && ready){
    ready=false;
    getPhotos();
    
  }
})

getPhotos();


  

