// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Setup smooth scrolling
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Skip if it's not a section link
            if (!targetId.startsWith('#')) return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Setup exercise answer toggles
    setupAnswerToggles();
    
    // Setup section highlighting
    setupSectionHighlighting();
    
    // Initialize answer boxes as hidden
    document.querySelectorAll('.answer-box').forEach(box => {
        box.style.display = 'none';
    });
});

// Function to setup answer toggles
function setupAnswerToggles() {
    // Remove inline onclick handlers and use event delegation instead
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('cta-button') && 
            e.target.textContent.includes('Jawaban')) {
            
            // Find the closest exercise container
            const exercise = e.target.closest('.exercise');
            if (exercise) {
                const answerBox = exercise.querySelector('.answer-box');
                if (answerBox) {
                    answerBox.style.display = answerBox.style.display === 'none' ? 'block' : 'none';
                    
                    // Change button text
                    e.target.textContent = answerBox.style.display === 'block' 
                        ? 'Sembunyikan Jawaban' 
                        : 'Lihat Jawaban';
                }
            }
        }
    });
}

// Function to show/hide exercise answers (kept for compatibility)
function showAnswer(exerciseNum) {
    const answerElement = document.getElementById('answer' + exerciseNum);
    if (!answerElement) return;
    
    if (answerElement.style.display === 'none' || answerElement.style.display === '') {
        answerElement.style.display = 'block';
    } else {
        answerElement.style.display = 'none';
    }
}

// Function to setup section highlighting
function setupSectionHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    // Create intersection observer for section highlighting
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -70% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                
                // Update navigation
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + currentId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);
    
    // Observe each section
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Function to generate a simple truth table dynamically (optional enhancement)
function generateTruthTable() {
    // This is an example function that could be expanded
    console.log('Truth table generation function is ready');
    
    // Example: Add functionality to generate custom truth tables
    const tableContainer = document.querySelector('.truth-table-container table');
    if (tableContainer) {
        // You could add interactive features here
        // For example: let users choose which connectives to display
    }
}

// Function to copy code examples (optional enhancement)
function setupCodeCopying() {
    document.querySelectorAll('.code-example').forEach(codeBlock => {
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
        copyButton.className = 'copy-button';
        copyButton.style.cssText = `
            position: absolute;
            top: 5px;
            right: 5px;
            background: #3498db;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 3px;
            cursor: pointer;
            font-size: 0.8rem;
        `;
        
        codeBlock.style.position = 'relative';
        codeBlock.appendChild(copyButton);
        
        copyButton.addEventListener('click', function() {
            const codeText = codeBlock.textContent.replace('Copy', '').trim();
            navigator.clipboard.writeText(codeText)
                .then(() => {
                    const originalText = copyButton.innerHTML;
                    copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    setTimeout(() => {
                        copyButton.innerHTML = originalText;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        });
    });
}

// Initialize additional features when page loads
window.addEventListener('load', function() {
    // Generate any dynamic content
    generateTruthTable();
    
    // Setup code copying (uncomment if you want this feature)
    // setupCodeCopying();
    
    // Add a scroll-to-top button
    addScrollToTopButton();
});

// Function to add scroll-to-top button
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
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.transform = 'translateY(0)';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.transform = 'translateY(10px)';
        }
    });
    
    // Scroll to top when clicked
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Optional: Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Use arrow keys to navigate sections
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const currentScroll = window.pageYOffset;
        let targetSection = null;
        
        if (e.key === 'ArrowDown') {
            // Find next section
            for (let section of sections) {
                if (section.offsetTop > currentScroll + 100) {
                    targetSection = section;
                    break;
                }
            }
        } else if (e.key === 'ArrowUp') {
            // Find previous section (reverse order)
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
});