import{a as y,S as L,i as v}from"./assets/vendor-BDaiwwc1.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function l(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=l(r);fetch(r.href,o)}})();const b="https://pixabay.com/api/",w="23727869-9ab5af5c09b745cc02503bdaa";async function m(e,t){const l={key:w,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:40};try{return(await y.get(b,{params:l})).data}catch(n){throw console.error(n.message),n}}const p=new L(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,overlayOpacity:.8});function u(e){return` <li class="gallery-item">
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
      </li>`}function M(e){const t=e.map(u).join("");s.gallery.innerHTML=t,p.refresh()}function S(e){const t=e.map(u).join("");s.gallery.insertAdjacentHTML("beforeend",t),p.refresh()}const q={messageColor:"#FAFAFB",messageSize:"16px",color:"#EF4040",transitionIn:"bounceInLeft",position:"topRight",displayMode:"replace",closeOnClick:!0},i=e=>{v.show({...q,message:e})},s={form:document.querySelector(".form"),btn:document.querySelector(".form-button"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),btnLoadMore:document.querySelector(".load-btn")},a={q:null,page:1,total:null};s.form.addEventListener("submit",async e=>{if(e.preventDefault(),s.gallery.innerHTML="",f(),a.q=e.target.elements.image.value.trim(),a.page=1,!a.q){s.gallery.innerHTML="",c(),i("Please enter a search term!"),g();return}try{const t=await m(a.q,a.page);if(t.hits.length===0){c(),i("No images found. Try a different search");return}M(t.hits),a.total=t.totalHits,h()}catch(t){i("Oops! Something went wrong"),console.error(t)}c()});s.btnLoadMore.addEventListener("click",async()=>{a.page+=1,f();try{const e=await m(a.q,a.page);S(e.hits),h(),P()}catch(e){i("Oops! Something went wrong"),console.error(e)}c()});function f(){s.loader.classList.remove("hidden")}function c(){s.loader.classList.add("hidden")}function O(){s.btnLoadMore.classList.remove("hidden")}function g(){s.btnLoadMore.classList.add("hidden")}function h(){const t=Math.ceil(a.total/40);a.page>=t?(g(),i("It seems you have reached the end")):O()}function P(){let l=s.gallery.firstElementChild.getBoundingClientRect().height;scrollBy({top:l*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
