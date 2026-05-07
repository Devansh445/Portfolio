const soundCloud = document.querySelector('.sound-cloud')
const off = document.querySelector('#off')
const on = document.querySelector('#on')
const myAudio = document.querySelector('#myAudio')

off.addEventListener('click', () => soundTrack('off'))
on.addEventListener('click', () => soundTrack('on'))

const soundTrack = (soundState) => {
  if (soundState === 'off') {
    on.style.display = 'block'
    off.style.display = 'none'
    soundCloud.style.color = '#08fdd8'
    myAudio.play()
  } else if (soundState === 'on') {
    on.style.display = 'none'
    off.style.display = 'block'
    soundCloud.style.color = '#f50057'
    myAudio.pause()
  }
}


const btnBars = document.querySelector('.bars')
const btnTimes = document.querySelector('.times')
const SideNav = document.querySelector('.aside')
const navLinks = document.querySelectorAll('.nav-links a')

btnBars.addEventListener('click', () => myFunc('open'))
btnTimes.addEventListener('click', () => myFunc('close'))

// Keyboard accessibility - Close menu with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && SideNav.classList.contains('show-nav')) {
    myFunc('close')
  }
})

// Close nav when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => myFunc('close'))
})

const myFunc = (navCondition) => {
  if (navCondition === 'open') {
    SideNav.classList.add('show-nav')
    btnTimes.style.display = 'block'
    btnBars.style.display = 'none'
    btnTimes.setAttribute('aria-expanded', 'true')
    btnBars.setAttribute('aria-expanded', 'false')
    // Focus on first nav link for better keyboard navigation
    navLinks[0]?.focus()
  } else if (navCondition === 'close') {
    SideNav.classList.remove('show-nav')
    btnTimes.style.display = 'none'
    btnBars.style.display = 'block'
    btnTimes.setAttribute('aria-expanded', 'false')
    btnBars.setAttribute('aria-expanded', 'true')
    // Return focus to menu button
    btnBars.focus()
  }
}

$(document).ready(function () {
  if (
    !$('#myCanvas').tagcanvas(
      {
        textColour: '#08fdd8',
        outlineColour: 'transparent',
        reverse: true,
        depth: 0.8,
        maxSpeed: 0.05,
        weight: true,
      },
      'tags',
    )
  ) {
    $('#myCanvasContainer')
  }
})


const nameInput = document.querySelector('.name')
const emailInput = document.querySelector('.email')
const subjectInput = document.querySelector('.subject')
const textareaInput = document.querySelector('.textarea')

const contactForm = document.querySelector('.contact-form')

contactForm.addEventListener('submit', (evt) => {
  evt.preventDefault()
  validateInput()
})

const validateInput = () => {
  let email = emailInput.value
  let textarea = textareaInput.value

  if (!email && !textarea) {
    setError(emailInput.parentElement)
    setError(textareaInput.parentElement)
    showMessage('Please fill in the required inputs')
  } else if (!email && textarea) {
    setError(emailInput.parentElement)
    showMessage("Oops Email can't be empty")
  } else if (!textarea && email) {
    setError(textareaInput.parentElement)
    showMessage('Please provide a message')
  } else if (email && textarea) {
    emailjs.sendForm(
      'service_n81314u',
      'template_zkgfj5m',
      contactForm,
      'CX9xIm_8-hiag-jOT',
    )
    .then(() => {
      setSuccess(emailInput.parentElement)
      setSuccess(textareaInput.parentElement)
      showMessage('Message sent successfully', 'green')
      textareaInput.value = ''
      emailInput.value = ''
      nameInput.value = ''
      subjectInput.value = ''
    })
    .catch((error) => {
      console.error('EmailJS error:', error)
      setError(emailInput.parentElement)
      setError(textareaInput.parentElement)
      showMessage('Failed to send message. Please try again.', 'red')
    })
  }
}

const setError = (input) => {
  if (input.classList.contains('success')) {
    input.classList.remove('success')
  } else {
    input.classList.add('error')
  }
}
const setSuccess = (input) => {
  if (input.classList.contains('error')) {
    input.classList.remove('error')
  } else {
    input.classList.add('success')
  }
}

const messageDiv = document.querySelector('.message')
const showMessage = (message, updateColor) => {
  const divContent = document.createElement('div')
  divContent.textContent = message
  divContent.classList.add('message-content')
  divContent.style.backgroundColor = updateColor
  messageDiv.prepend(divContent)

  messageDiv.style.transform = `translate(${(0, 0)}%)`
  setTimeout(() => {
    divContent.classList.add('hide')
    divContent.addEventListener('transitionend', () => {
      divContent.remove()
    })
  }, 5000)
}


const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");
const cursor = document.querySelector(".cursor");

// Check if device prefers reduced motion or is mobile
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Variables for cursor visibility control
let isMoving = false;
let moveTimeout;
const IDLE_TIME = 1000; // Hide cursor after 1 second of no movement

// Only initialize cursor animation on desktop devices
if (!isMobile && !prefersReducedMotion) {
  circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    circle.style.opacity = '0'; // Start invisible
  });

  window.addEventListener("mousemove", function (e) {
    coords.x = e.clientX;
    coords.y = e.clientY;

    // Show cursor when moving
    if (!isMoving) {
      isMoving = true;
      cursor.style.opacity = '1';
      circles.forEach(circle => {
        circle.style.transition = 'opacity 0.3s ease-in-out';
        circle.style.opacity = '1';
      });
    }

    // Clear previous timeout
    clearTimeout(moveTimeout);

    // Set new timeout to hide cursor after idle time
    moveTimeout = setTimeout(() => {
      isMoving = false;
      circles.forEach(circle => {
        circle.style.transition = 'opacity 0.5s ease-in-out';
        circle.style.opacity = '0';
      });
    }, IDLE_TIME);
  });

  function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    cursor.style.top = x;
    cursor.style.left = y;
    
    circles.forEach(function (circle, index) {
      circle.style.left = x + "px";
      circle.style.top = y + "px";

      circle.style.scale = (circles.length - index) / circles.length;

      circle.x = x;
      circle.y = y;

      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.x - x) * 0.3;
      y += (nextCircle.y - y) * 0.3;

      const hue = Math.floor((x / window.innerWidth) * 360) + Math.floor((y / window.innerHeight) * 120);
      const saturation = 80 + Math.floor(((x + y) / (window.innerWidth + window.innerHeight)) * 20);
      const lightness = 50 + Math.floor(((x - y) / (window.innerWidth - window.innerHeight)) * 20);
      circle.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    });

    requestAnimationFrame(animateCircles);
  }

  animateCircles();
} else {
  // Hide cursor animation on mobile/reduced motion
  cursor.style.display = 'none';
}
