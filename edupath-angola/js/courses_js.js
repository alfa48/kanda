// ==================== COURSE FILTERING ====================
const universityFilter = document.getElementById('universityFilter');
const categoryFilter = document.getElementById('categoryFilter');
const levelFilter = document.getElementById('levelFilter');
const searchInput = document.getElementById('searchInput');
const coursesGrid = document.getElementById('coursesGrid');
const courseCards = document.querySelectorAll('.course-card');

function filterCourses() {
    const universityValue = universityFilter?.value.toLowerCase() || '';
    const categoryValue = categoryFilter?.value.toLowerCase() || '';
    const levelValue = levelFilter?.value.toLowerCase() || '';
    const searchValue = searchInput?.value.toLowerCase() || '';

    let visibleCount = 0;

    courseCards.forEach(card => {
        const university = card.dataset.university || '';
        const category = card.dataset.category || '';
        const level = card.dataset.level || '';
        const title = card.querySelector('.course-title')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.course-description')?.textContent.toLowerCase() || '';

        const matchesUniversity = !universityValue || university === universityValue;
        const matchesCategory = !categoryValue || category === categoryValue;
        const matchesLevel = !levelValue || level === levelValue;
        const matchesSearch = !searchValue || 
            title.includes(searchValue) || 
            description.includes(searchValue);

        if (matchesUniversity && matchesCategory && matchesLevel && matchesSearch) {
            card.style.display = 'flex';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    // Show "no results" message
    updateNoResultsMessage(visibleCount);
}

function updateNoResultsMessage(count) {
    let noResultsMsg = document.querySelector('.no-results-message');
    
    if (count === 0) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-message';
            noResultsMsg.innerHTML = `
                <div style="text-align: center; padding: 4rem 2rem;">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🔍</div>
                    <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">Nenhum curso encontrado</h3>
                    <p style="color: var(--gray);">Tenta ajustar os filtros ou fazer uma nova pesquisa</p>
                </div>
            `;
            coursesGrid.parentElement.appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
        coursesGrid.style.display = 'none';
    } else {
        if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }
        coursesGrid.style.display = 'grid';
    }
}

// Add event listeners to filters
if (universityFilter) {
    universityFilter.addEventListener('change', filterCourses);
}

if (categoryFilter) {
    categoryFilter.addEventListener('change', filterCourses);
}

if (levelFilter) {
    levelFilter.addEventListener('change', filterCourses);
}

if (searchInput) {
    // Debounced search
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterCourses, 300);
    });
}

// ==================== PAGINATION ====================
const pageButtons = document.querySelectorAll('.page-btn');

pageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        pageButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Scroll to top of courses
        const coursesSection = document.querySelector('.courses-section');
        if (coursesSection) {
            window.scrollTo({
                top: coursesSection.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== COURSE CARD ANIMATIONS ====================
function initCourseAnimations() {
    const cards = document.querySelectorAll('.course-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', initCourseAnimations);

// ==================== FAVORITE / BOOKMARK FUNCTIONALITY ====================
function toggleFavorite(courseId) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const index = favorites.indexOf(courseId);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(courseId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteButtons();
}

function updateFavoriteButtons() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const courseId = btn.dataset.courseId;
        if (favorites.includes(courseId)) {
            btn.classList.add('active');
            btn.textContent = '❤️';
        } else {
            btn.classList.remove('active');
            btn.textContent = '🤍';
        }
    });
}

// ==================== COURSE COMPARISON ====================
let comparisonList = [];

function addToComparison(courseId, courseName) {
    if (comparisonList.length >= 3) {
        alert('Podes comparar no máximo 3 cursos de cada vez');
        return;
    }
    
    if (!comparisonList.find(c => c.id === courseId)) {
        comparisonList.push({ id: courseId, name: courseName });
        updateComparisonBar();
    }
}

function removeFromComparison(courseId) {
    comparisonList = comparisonList.filter(c => c.id !== courseId);
    updateComparisonBar();
}

function updateComparisonBar() {
    let bar = document.querySelector('.comparison-bar');
    
    if (comparisonList.length === 0) {
        if (bar) bar.remove();
        return;
    }
    
    if (!bar) {
        bar = document.createElement('div');
        bar.className = 'comparison-bar';
        document.body.appendChild(bar);
    }
    
    bar.innerHTML = `
        <div class="comparison-content">
            <div class="comparison-items">
                ${comparisonList.map(course => `
                    <div class="comparison-item">
                        <span>${course.name}</span>
                        <button onclick="removeFromComparison('${course.id}')">✕</button>
                    </div>
                `).join('')}
            </div>
            <button class="btn btn-primary" onclick="showComparison()">
                Comparar (${comparisonList.length})
            </button>
        </div>
    `;
}

function showComparison() {
    // This would open a modal or navigate to comparison page
    console.log('Comparing courses:', comparisonList);
    alert('Funcionalidade de comparação será implementada em breve!');
}

// ==================== SORT FUNCTIONALITY ====================
function sortCourses(criteria) {
    const cards = Array.from(courseCards);
    
    cards.sort((a, b) => {
        switch(criteria) {
            case 'popular':
                const studentsA = parseInt(a.querySelector('.stat span:nth-child(2)').textContent);
                const studentsB = parseInt(b.querySelector('.stat span:nth-child(2)').textContent);
                return studentsB - studentsA;
                
            case 'rating':
                const ratingA = parseFloat(a.querySelector('.stat:nth-child(2) span:nth-child(2)').textContent);
                const ratingB = parseFloat(b.querySelector('.stat:nth-child(2) span:nth-child(2)').textContent);
                return ratingB - ratingA;
                
            case 'duration':
                const durationA = parseInt(a.querySelector('.stat:nth-child(3) span:nth-child(2)').textContent);
                const durationB = parseInt(b.querySelector('.stat:nth-child(3) span:nth-child(2)').textContent);
                return durationA - durationB;
                
            default:
                return 0;
        }
    });
    
    // Re-append sorted cards
    cards.forEach(card => coursesGrid.appendChild(card));
}

// ==================== LOAD MORE FUNCTIONALITY ====================
let currentPage = 1;
const coursesPerPage = 6;

function loadMoreCourses() {
    // This would typically fetch more courses from an API
    // For now, we'll just show a loading state
    
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.textContent = 'A carregar...';
        loadMoreBtn.disabled = true;
        
        setTimeout(() => {
            currentPage++;
            loadMoreBtn.textContent = 'Carregar Mais';
            loadMoreBtn.disabled = false;
            
            // Show message when all courses loaded
            if (currentPage >= 3) {
                loadMoreBtn.style.display = 'none';
                const endMessage = document.createElement('p');
                endMessage.textContent = 'Todos os cursos foram carregados';
                endMessage.style.textAlign = 'center';
                endMessage.style.color = 'var(--gray)';
                loadMoreBtn.parentElement.appendChild(endMessage);
            }
        }, 1000);
    }
}

// ==================== INITIALIZE ====================
document.addEventListener('DOMContentLoaded', () => {
    updateFavoriteButtons();
    
    // Add sort dropdown if exists
    const sortDropdown = document.getElementById('sortDropdown');
    if (sortDropdown) {
        sortDropdown.addEventListener('change', (e) => {
            sortCourses(e.target.value);
        });
    }
});