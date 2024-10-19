document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); 
        const targetId = this.getAttribute('href'); 
        const targetSection = document.querySelector(targetId); 

        
        targetSection.scrollIntoView({ behavior: 'smooth' });

        
        history.pushState(null, null, 'https://2validck.github.io/SBPlug.github.io/'); 
    });
});
