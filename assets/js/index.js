const themeToggleButton = document.getElementById('theme-toggle-button');
const htmlElement = document.documentElement; 

themeToggleButton.addEventListener('click', function() {
    htmlElement.classList.toggle('dark');

    const isDarkMode = htmlElement.classList.contains('dark');

    themeToggleButton.setAttribute('aria-pressed', isDarkMode);

    if (isDarkMode) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

window.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        htmlElement.classList.remove('dark');
        themeToggleButton.setAttribute('aria-pressed', 'false');
    } else {
        htmlElement.classList.add('dark');
        themeToggleButton.setAttribute('aria-pressed', 'true');
    }
});
const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const observerOptions = {
        root: null,
        threshold: 0.3, 
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('active');
                });

                const activeLink = document.querySelector(`.nav-links a[href="#${currentId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        if (section.getAttribute('id')) {
            observer.observe(section);
        }
    });
const filterButtons = document.querySelectorAll('.portfolio-filter');
const portfolioItems = document.querySelectorAll('.portfolio-item');

const activeClasses = ['bg-linear-to-r', 'from-primary', 'to-secondary', 'text-white', 'hover:shadow-primary/50'];
const inactiveClasses = ['bg-white', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300', 'hover:bg-slate-100', 'dark:hover:bg-slate-700', 'border', 'border-slate-300', 'dark:border-slate-700'];

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        filterButtons.forEach(btn => {
            btn.classList.remove('active', ...activeClasses);
            btn.classList.add(...inactiveClasses);
            btn.setAttribute('aria-pressed', 'false');
        });

        button.classList.remove(...inactiveClasses);
        button.classList.add('active', ...activeClasses);
        button.setAttribute('aria-pressed', 'true');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === itemCategory) {
                item.classList.remove('hidden');
                
                setTimeout(function() {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.95)';
                
                setTimeout(function() {
                    item.classList.add('hidden');
                }, 300); 
            }
        });
    });
});

const carousel = document.getElementById('testimonials-carousel');
const cards = document.querySelectorAll('.testimonial-card');
const nextBtn = document.getElementById('next-testimonial');
const prevBtn = document.getElementById('prev-testimonial');
const indicators = document.querySelectorAll('.carousel-indicator');

if (carousel && cards.length > 0) {
    let currentIndex = 0;

    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        
        carousel.style.transform = `translateX(${currentIndex * cardWidth}px)`;

        for (const dot of indicators) {
            const dotIndex = parseInt(dot.getAttribute('data-index'));
            
            if (dotIndex === currentIndex) {
                dot.classList.remove('bg-slate-400', 'dark:bg-slate-600');
                dot.classList.add('bg-accent');
                dot.setAttribute('aria-selected', 'true');
            } else {
                dot.classList.remove('bg-accent');
                dot.classList.add('bg-slate-400', 'dark:bg-slate-600');
                dot.setAttribute('aria-selected', 'false');
            }
        }
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            const visibleCards = Math.round(carousel.parentElement.offsetWidth / cards[0].offsetWidth);
            const maxIndex = cards.length - visibleCards;
            
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarousel();
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    }

    for (const dot of indicators) {
        dot.addEventListener('click', function() {
            currentIndex = parseInt(dot.getAttribute('data-index'));
            updateCarousel();
        });
    }

    window.addEventListener('resize', function() {
        updateCarousel();
    });
}
const settingsToggleBtn = document.getElementById('settings-toggle');
const settingsSidebar = document.getElementById('settings-sidebar');
const closeSettingsBtn = document.getElementById('close-settings');
const fontOptions = document.querySelectorAll('.font-option');
const bodyElement = document.body;

if (settingsToggleBtn && settingsSidebar && closeSettingsBtn) {
    settingsToggleBtn.addEventListener('click', function() {
        settingsSidebar.classList.toggle('translate-x-full');
        
        const isExpanded = !settingsSidebar.classList.contains('translate-x-full');
        settingsToggleBtn.setAttribute('aria-expanded', isExpanded);
    });

    closeSettingsBtn.addEventListener('click', function() {
        settingsSidebar.classList.add('translate-x-full');
        settingsToggleBtn.setAttribute('aria-expanded', 'false');
    });
}

const fontClasses = ['font-tajawal', 'font-cairo', 'font-alexandria'];
const savedFont = localStorage.getItem('selectedFont');

if (savedFont) {
    bodyElement.classList.remove(...fontClasses);
    bodyElement.classList.add(`font-${savedFont}`);
    
    for (const option of fontOptions) {
        if (option.getAttribute('data-font') === savedFont) {
            option.classList.add('active', 'border-primary');
            option.setAttribute('aria-checked', 'true');
        } else {
            option.classList.remove('active', 'border-primary');
            option.setAttribute('aria-checked', 'false');
        }
    }
}

for (const option of fontOptions) {
    option.addEventListener('click', function() {
        for (const opt of fontOptions) {
            opt.classList.remove('active', 'border-primary');
            opt.setAttribute('aria-checked', 'false');
        }

        option.classList.add('active', 'border-primary');
        option.setAttribute('aria-checked', 'true');

        const selectedFont = option.getAttribute('data-font');

        bodyElement.classList.remove(...fontClasses);
        bodyElement.classList.add(`font-${selectedFont}`);

        localStorage.setItem('selectedFont', selectedFont);
    });
}

const resetSettingsBtn = document.getElementById('reset-settings');
if (resetSettingsBtn) {
    resetSettingsBtn.addEventListener('click', function() {
        localStorage.removeItem('selectedFont');
        localStorage.removeItem('theme');
        
        window.location.reload();
    });
}
const colorsGrid = document.getElementById('theme-colors-grid');
const rootElement = document.documentElement;

const colorThemes = [
    { id: 'default', primary: '#6366f1', secondary: '#8b5cf6', accent: '#ec4899' },
    { id: 'ocean',   primary: '#0ea5e9', secondary: '#3b82f6', accent: '#06b6d4' },
    { id: 'nature',  primary: '#10b981', secondary: '#84cc16', accent: '#22c55e' },
    { id: 'sunset',  primary: '#f43f5e', secondary: '#f97316', accent: '#eab308' },
    { id: 'amethyst',primary: '#a855f7', secondary: '#d946ef', accent: '#ec4899' },
    { id: 'teal',    primary: '#14b8a6', secondary: '#0ea5e9', accent: '#06b6d4' },
    { id: 'amber',   primary: '#f59e0b', secondary: '#ea580c', accent: '#f97316' },
    { id: 'rose',    primary: '#e11d48', secondary: '#be123c', accent: '#fb7185' }
];

if (colorsGrid) {
    for (const theme of colorThemes) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'color-btn w-full aspect-square rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 relative outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900';
        btn.style.backgroundColor = theme.primary;
        btn.setAttribute('data-theme-id', theme.id);
        
        btn.innerHTML = `<i class="fa-solid fa-check text-white opacity-0 transition-opacity duration-300 pointer-events-none text-xl drop-shadow-md"></i>`;
        
        colorsGrid.appendChild(btn);
    }

    const colorButtons = document.querySelectorAll('.color-btn');
    const savedThemeId = localStorage.getItem('selectedColorTheme') || 'default';

    function applyColorTheme(themeId) {
        let selectedTheme = null;
        
        for (const theme of colorThemes) {
            if (theme.id === themeId) {
                selectedTheme = theme;
                break;
            }
        }

        if (selectedTheme) {
            rootElement.style.setProperty('--color-primary', selectedTheme.primary);
            rootElement.style.setProperty('--color-secondary', selectedTheme.secondary);
            rootElement.style.setProperty('--color-accent', selectedTheme.accent);

            for (const btn of colorButtons) {
                const icon = btn.querySelector('i');
                if (btn.getAttribute('data-theme-id') === themeId) {
                    icon.classList.remove('opacity-0');
                    icon.classList.add('opacity-100');
                    btn.style.setProperty('--tw-ring-color', selectedTheme.primary);
                } else {
                    icon.classList.remove('opacity-100');
                    icon.classList.add('opacity-0');
                }
            }
        }
    }

    applyColorTheme(savedThemeId);

    for (const btn of colorButtons) {
        btn.addEventListener('click', function() {
            const themeId = btn.getAttribute('data-theme-id');
            applyColorTheme(themeId);
            localStorage.setItem('selectedColorTheme', themeId);
        });
    }
}

const scrollToTopBtn = document.getElementById('scroll-to-top');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.remove('opacity-0', 'invisible');
            scrollToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            scrollToTopBtn.classList.remove('opacity-100', 'visible');
            scrollToTopBtn.classList.add('opacity-0', 'invisible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}