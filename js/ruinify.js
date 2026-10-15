/* Mount images into the placeholder slots when the file exists. */
document.querySelectorAll('.doc-fig[data-img]').forEach(function(fig){
  var img = new Image();
  img.alt = fig.querySelector('strong') ? fig.querySelector('strong').textContent : '';
  img.onload = function(){ fig.classList.add('has_media'); fig.insertBefore(img, fig.firstChild); };
  img.src = fig.getAttribute('data-img');
});
