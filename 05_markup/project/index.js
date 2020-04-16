const sections = document.querySelectorAll('section')
const tank = document.getElementById('tank')

for (let section of sections) {
    section.addEventListener('mouseenter', (e) => {
        const turretDir = e.target.dataset.turretDirection
        tank.classList.add(`tank_turret__${turretDir}`)
    })
    section.addEventListener('mouseleave', (e) => {
        const turretDir = e.target.dataset.turretDirection
        tank.classList.remove(`tank_turret__${turretDir}`)
    })
}

sections[0].addEventListener('click', (e) => {
    document.body.classList.add('toggle')
})

const tankAway = document.getElementById('tankScroll')
let lastPos = 0;
let lasScrollTop = 0
sections[0].addEventListener('scroll', (e) => {
    let curruntTop = e.target.scrollTop
    let diff = curruntTop - lasScrollTop
    lastPos += diff / 2
    tankAway.style.transform = `translateX(${lastPos}px)`
    lasScrollTop = curruntTop
})