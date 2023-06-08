(function($){$.fn.mauGallery=function(options){const settings=$.extend($.fn.mauGallery.defaults,options);const tagsCollection=[];return this.each(function(){createRowWrapper($(this));if(settings.lightBox){createLightBox($(this),settings.lightboxId,settings.navigation)}
listeners(settings);$(this).children(".gallery-item").each(function(index){responsiveImageItem($(this));moveItemInRowWrapper($(this));wrapItemInColumn($(this),settings.columns);const theTag=$(this).data("gallery-tag");if(settings.showTags&&theTag!==undefined&&!tagsCollection.includes(theTag)){tagsCollection.push(theTag)}});if(settings.showTags){showItemTags($(this),settings.tagsPosition,tagsCollection)}
$(this).fadeIn(500)})};$.fn.mauGallery.defaults={columns:3,lightBox:!0,lightboxId:null,showTags:!0,tagsPosition:"bottom",navigation:!0};function listeners(options){$(".gallery-item").on("click",function(){if(options.lightBox&&$(this).prop("tagName")==="IMG"){openLightBox($(this),options.lightboxId)}else{return}});$(".gallery").on("click",".nav-link",filterByTag);$(".gallery").on("click",".mg-prev",()=>prevImage(options.lightboxId));$(".gallery").on("click",".mg-next",()=>nextImage(options.lightboxId))}
function createRowWrapper(element){if(!element.children().first().hasClass("row")){element.append('<div class="gallery-items-row row"></div>')}}
function wrapItemInColumn(element,columns){let columnClasses="";if(columns.constructor===Number){columnClasses=`col-${Math.ceil(12 / columns)}`}else if(columns.constructor===Object){if(columns.xs){columnClasses+=` col-${Math.ceil(12 / columns.xs)}`}
if(columns.sm){columnClasses+=` col-sm-${Math.ceil(12 / columns.sm)}`}
if(columns.md){columnClasses+=` col-md-${Math.ceil(12 / columns.md)}`}
if(columns.lg){columnClasses+=` col-lg-${Math.ceil(12 / columns.lg)}`}
if(columns.xl){columnClasses+=` col-xl-${Math.ceil(12 / columns.xl)}`}}else{console.error(`Columns should be defined as numbers or objects. ${typeof columns} is not supported.`);return}
element.wrap(`<div class="item-column mb-4 ${columnClasses}"></div>`)}
function moveItemInRowWrapper(element){element.appendTo(".gallery-items-row")}
function responsiveImageItem(element){if(element.prop("tagName")==="IMG"){element.addClass("img-fluid")}}
function openLightBox(element,lightboxId){$(`#${lightboxId}`).find(".lightboxImage").attr("src",element.attr("src"));$(`#${lightboxId}`).modal("toggle")}
function prevImage(lightboxId){const activeImage=$(".lightboxImage").attr("src");const activeTag=$(".tags-bar span.active-tag").data("images-toggle");const imagesCollection=[];if(activeTag==="all"){$(".item-column img.gallery-item").each(function(){imagesCollection.push($(this).attr("src"))})}else{$(".item-column img.gallery-item").each(function(){if($(this).data("gallery-tag")===activeTag){imagesCollection.push($(this).attr("src"))}})}
const index=imagesCollection.indexOf(activeImage);const prevIndex=(index-1+imagesCollection.length)%imagesCollection.length;const prevImage=imagesCollection[prevIndex];$(".lightboxImage").attr("src",prevImage)}
function nextImage(lightboxId){const activeImage=$(".lightboxImage").attr("src");const activeTag=$(".tags-bar span.active-tag").data("images-toggle");const imagesCollection=[];if(activeTag==="all"){$(".item-column img.gallery-item").each(function(){imagesCollection.push($(this).attr("src"))})}else{$(".item-column img.gallery-item").each(function(){if($(this).data("gallery-tag")===activeTag){imagesCollection.push($(this).attr("src"))}})}
const index=imagesCollection.indexOf(activeImage);const nextIndex=(index+1)%imagesCollection.length;const nextImage=imagesCollection[nextIndex];$(".lightboxImage").attr("src",nextImage)}
function createLightBox(gallery,lightboxId,navigation){gallery.append(`
      <div class="modal fade" id="${lightboxId ? lightboxId : "galleryLightbox"}" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-body">
              ${navigation ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>' : '<span style="display:none;" />'}
              <img class="lightboxImage img-fluid" alt="Contenu de l'image affichée dans la modale au clique"/>
              ${navigation ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>' : '<span style="display:none;" />'}
            </div>
          </div>
        </div>
      </div>
    `)}
function showItemTags(gallery,position,tags){let tagItems='<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">Tous</span></li>';$.each(tags,function(index,value){tagItems+=`<li class="nav-item active">
        <span class="nav-link" data-images-toggle="${value}">${value}</span>
      </li>`});const tagsRow=`<ul class="my-4 tags-bar nav nav-pills">${tagItems}</ul>`;if(position==="bottom"){gallery.append(tagsRow)}else if(position==="top"){gallery.prepend(tagsRow)}else{console.error(`Unknown tags position: ${position}`)}}
function filterByTag(){if($(this).hasClass("active-tag")){return}
$(".active-tag").removeClass("active active-tag");$(this).addClass("active-tag");const tag=$(this).data("images-toggle");$(".gallery-item").each(function(){$(this).parents(".item-column").hide();if(tag==="all"){$(this).parents(".item-column").show(300)}else if($(this).data("gallery-tag")===tag){$(this).parents(".item-column").show(300)}})}
$(document).ready(function(){$('.gallery').mauGallery({columns:{xs:1,sm:2,md:3,lg:3,xl:3},lightBox:!0,lightboxId:'myAwesomeLightbox',showTags:!0,tagsPosition:'top'})})})(jQuery)