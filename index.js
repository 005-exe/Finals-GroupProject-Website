document.addEventListener('DOMContentLoaded', function() {
    
    const navLinks = document.querySelectorAll('header nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const allSections = document.querySelectorAll('.page-section');
            allSections.forEach(section => {
                section.classList.remove('active');
            });
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
    
    const categoryLinks = document.querySelectorAll('.menu-sidebar a');
    const searchInput = document.querySelector('.menu-search');
    const menuSections = document.querySelectorAll('.menu-section');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (categoryLinks.length > 0 && searchInput) {
        
        categoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const category = this.getAttribute('href').substring(1);
                searchInput.value = '';
                filterByCategory(category);
            });
        });
        
        searchInput.addEventListener('input', function() {
            const searchText = this.value.toLowerCase();
            
            if (searchText === '') {
                showAllSections();
            } else {
                filterBySearch(searchText);
            }
        });
        

        function filterByCategory(category) {
            menuSections.forEach(section => {
                const sectionCategory = section.getAttribute('data-category');
                
                if (sectionCategory === category) {
                    section.style.display = '';  
                } else {
                    section.style.display = 'none';  
                }
            });
        }
        

        function filterBySearch(searchText) {

            menuSections.forEach(section => {
                section.style.display = '';
            });
            

            menuItems.forEach(item => {
                const itemName = item.getAttribute('data-name').toLowerCase();
                
                if (itemName.includes(searchText)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
            

            menuSections.forEach(section => {
                const visibleItems = section.querySelectorAll('.menu-item:not([style*="display: none"])');
                if (visibleItems.length === 0) {
                    section.style.display = 'none';
                }
            });
        }
        
        function showAllSections() {
            menuSections.forEach(section => {
                section.style.display = '';
            });
            menuItems.forEach(item => {
                item.style.display = '';
            });
        }
    }
});