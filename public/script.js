const saveButton = document.querySelector('#save-button')
const menuItems = document.querySelectorAll('header .links a')
const currentPage = location.pathname

if(window.location.pathname.includes('edit')) {
    saveButton.style.width = '45%'
}

for (const menuItem of menuItems) {
    if(currentPage.includes(menuItem.getAttribute('href'))) {
        menuItem.classList.add('active')
    }
}

