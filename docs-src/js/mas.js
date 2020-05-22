document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages = document.querySelectorAll("img.lazy");    
  
  lazyloadImages.forEach(function(img) {
    img.src = img.dataset.src;
    img.classList.remove('lazy');
  });
});
