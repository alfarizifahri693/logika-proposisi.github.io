function setupHamburgerMenu() {
    const hamburgerButton = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');
    const menuOverlay = document.createElement('div');
    
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);
    
    if (!hamburgerButton || !mainNav) {
        console.error('Elemen menu tidak ditemukan');
        return;
    }
    
    hamburgerButton.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });
    
    function toggleMenu() {
        mainNav.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        hamburgerButton.classList.toggle('active');
        if (mainNav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    menuOverlay.addEventListener('click', function() {
        closeMenu();
    });
    
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', function() {
            closeMenu();
        });
    });
    
    document.addEventListener('click', function(e) {
        if (!mainNav.contains(e.target) && !hamburgerButton.contains(e.target)) {
            closeMenu();
        }
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
    
    function closeMenu() {
        mainNav.classList.remove('active');
        menuOverlay.classList.remove('active');
        hamburgerButton.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            closeMenu();
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded - Tombol jawaban siap digunakan');
    setupHamburgerMenu();
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded - Tombol jawaban siap digunakan');
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            

            if (!targetId.startsWith('#')) return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                

                history.pushState(null, null, targetId);
            }
        });
    });
    

    document.querySelectorAll('.answer-box').forEach(box => {
        box.style.display = 'none';
    });
    

    setupSectionHighlighting();
    

    addScrollToTopButton();
});

function showAnswer(exerciseNum) {
    console.log('Tombol ditekan untuk jawaban', exerciseNum);
    
    const answerElement = document.getElementById('answer' + exerciseNum);
    const button = document.querySelector(`button[onclick="showAnswer(${exerciseNum})"]`);
    
    if (!answerElement) {
        console.error('Element answer' + exerciseNum + ' tidak ditemukan');
        return;
    }
    
    if (answerElement.style.display === 'none' || answerElement.style.display === '') {
        answerElement.style.display = 'block';
        answerElement.style.animation = 'fadeIn 0.5s ease';
        
        if (button) {
            button.textContent = 'Sembunyikan Jawaban';
            button.style.backgroundColor = '#e74c3c'; 
        }
        
        console.log('Jawaban ditampilkan');
    } else {

        answerElement.style.display = 'none';
        
        if (button) {
            button.textContent = 'Lihat Jawaban';
            button.style.backgroundColor = '#3498db'; 
        }
        
        console.log('Jawaban disembunyikan');
    }
}

function setupSectionHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    

    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -70% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + currentId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    

    sections.forEach(section => {
        observer.observe(section);
    });
}

function addScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.id = 'scrollToTop';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
        z-index: 999;
    `;
    
    document.body.appendChild(scrollButton);
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.transform = 'translateY(0)';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.transform = 'translateY(10px)';
        }
    });
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentScroll = window.pageYOffset;
        let targetSection = null;
        
        if (e.key === 'ArrowDown') {
            for (let section of sections) {
                if (section.offsetTop > currentScroll + 100) {
                    targetSection = section;
                    break;
                }
            }
        } else if (e.key === 'ArrowUp') {
            for (let i = sections.length - 1; i >= 0; i--) {
                if (sections[i].offsetTop < currentScroll - 100) {
                    targetSection = sections[i];
                    break;
                }
            }
        }
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
    
    if (e.key === 'a' && e.ctrlKey) {
        e.preventDefault();
        document.querySelectorAll('.answer-box').forEach(box => {
            box.style.display = 'block';
        });
        console.log('Semua jawaban ditampilkan (debug mode)');
    }
});

document.addEventListener('click', function(e) {
    if (!e.target.closest('.exercise') && !e.target.closest('button[onclick^="showAnswer"]')) {
        document.querySelectorAll('.answer-box').forEach(box => {
            box.style.display = 'none';
        });
        
        document.querySelectorAll('button[onclick^="showAnswer"]').forEach(button => {
            button.textContent = 'Lihat Jawaban';
            button.style.backgroundColor = '';
        });
    }
});