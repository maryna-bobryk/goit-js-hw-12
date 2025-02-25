import{a as h,S as y,i as L}from"./assets/vendor-BDaiwwc1.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function l(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=l(r);fetch(r.href,o)}})();const v="https://pixabay.com/api/",b="23727869-9ab5af5c09b745cc02503bdaa";async function m(e,t){const l={key:b,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:40};try{return(await h.get(v,{params:l})).data}catch(n){throw console.error(n.message),n}}const p=new y(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,overlayOpacity:.8});function u(e){return` <li class="gallery-item">
        <a class="gallery-link" href="${e.largeImageURL}">
          <img
            class="card-image"
            src="${e.webformatURL}"
            alt="${e.tags}"
          />
          <div class="card-descr">
            <div class="card-descr-elem">
              <p class="elem-titel">Likes</p>
              <p class="elem-value">${e.likes}</p>
            </div>

            <div class="card-descr-elem">
              <p class="elem-titel">Views</p>
              <p class="elem-value">${e.views}</p>
            </div>

            <div class="card-descr-elem">
              <p class="elem-titel">Comments</p>
              <p class="elem-value">${e.comments}</p>
            </div>

            <div class="card-descr-elem">
              <p class="elem-titel">Downloads</p>
              <p class="elem-value">${e.downloads}</p>
            </div>
          </div>
        </a>
      </li>`}function w(e){const t=e.map(u).join("");s.gallery.innerHTML=t,p.refresh()}function M(e){const t=e.map(u).join("");s.gallery.insertAdjacentHTML("beforeend",t),p.refresh()}const S={messageColor:"#FAFAFB",messageSize:"16px",color:"#EF4040",transitionIn:"bounceInLeft",position:"topRight",displayMode:"replace",closeOnClick:!0},c=e=>{L.show({...S,message:e})},s={form:document.querySelector(".form"),btn:document.querySelector(".form-button"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),btnLoadMore:document.querySelector(".load-btn")},a={q:null,page:1,total:null};s.form.addEventListener("submit",async e=>{if(e.preventDefault(),s.gallery.innerHTML="",f(),a.q=e.target.elements.image.value.trim(),a.page=1,!a.q){i(),c("Please enter a search term!");return}try{const t=await m(a.q,a.page);if(t.hits.length===0){i(),c("No images found. Try a different search");return}w(t.hits),a.total=t.totalHits,g()}catch(t){c("Oops! Something went wrong"),console.error(t)}i()});s.btnLoadMore.addEventListener("click",async()=>{a.page+=1,f();try{const e=await m(a.q,a.page);M(e.hits),g(),P()}catch(e){c("Oops! Something went wrong"),console.error(e)}i()});function f(){s.loader.classList.remove("hidden")}function i(){s.loader.classList.add("hidden")}function q(){s.btnLoadMore.classList.remove("hidden")}function O(){s.btnLoadMore.classList.add("hidden")}function g(){const t=Math.ceil(a.total/40);a.page>=t?(O(),c("It seems you have reached the end")):q()}function P(){let l=s.gallery.firstElementChild.getBoundingClientRect().height;scrollBy({top:l*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
