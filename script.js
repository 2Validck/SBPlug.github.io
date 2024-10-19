document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor behavior
        const targetId = this.getAttribute('href'); // Get the href attribute
        const targetSection = document.querySelector(targetId); // Find the target section

        // Scroll smoothly to the target section
        targetSection.scrollIntoView({ behavior: 'smooth' });

        // Update the URL without the hash
        history.pushState(null, null, 'index.html'); // Change this to your actual file name if different
    });
});