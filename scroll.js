document.addEventListener('click', function(e) {
  if (e.target.id.indexOf('about') !== -1) {
    var about = document.querySelector('.about')
    zenscroll.to(about, 1000)
  }
  if (e.target.id.indexOf('projects') !== -1) {
    var projects = document.querySelector('.projects')
    zenscroll.to(projects, 1000)
  }
  if (e.target.id.indexOf('contact') !== -1) {
    var contact = document.querySelector('.contact')
    zenscroll.to(contact, 1000)
  }
})
