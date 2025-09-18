const pressBtn = document.getElementById('pressBtn');
const screenText1 = document.getElementById('screen');
const screenText2 = document.getElementById('screen2');
const body = document.body;

// Create energy particles
function createEnergyParticle(x, y) {
  const particle = document.createElement('div');
  particle.className = 'energy-particle';
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  
  // Random direction for particle movement
  const angle = Math.random() * Math.PI * 2;
  const distance = 50 + Math.random() * 100;
  const dx = Math.cos(angle) * distance;
  const dy = Math.sin(angle) * distance;
  
  particle.style.setProperty('--dx', dx + 'px');
  particle.style.setProperty('--dy', dy + 'px');
  
  document.body.appendChild(particle);
  
  // Remove particle after animation
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, 2000);
}

// Create multiple energy particles around the button
function createEnergyBurst(centerX, centerY) {
  const particleCount = 12;
  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * Math.PI * 2;
    const radius = 20 + Math.random() * 30;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    createEnergyParticle(x, y);
  }
}

// Energize effect for text elements with glass morphism
function energizeText() {
  if (screenText1) {
    screenText1.classList.add('energized-glass');
    setTimeout(() => {
      screenText1.classList.remove('energized-glass');
    }, 1000);
  }
  
  if (screenText2) {
    screenText2.classList.add('energized-glass');
    const spans = screenText2.querySelectorAll('span');
    spans.forEach((span, index) => {
      setTimeout(() => {
        span.style.background = 'rgba(255, 255, 255, 0.2)';
        span.style.transform = 'scale(1.2)';
        setTimeout(() => {
          span.style.background = '';
          span.style.transform = '';
        }, 500);
      }, index * 100);
    });
    setTimeout(() => {
      screenText2.classList.remove('energized-glass');
    }, 1000);
  }
}

// Main energize effect with glass morphism
function energizeEverything() {
  // Add energized glass effect to button
  if (pressBtn) {
    pressBtn.classList.add('energized-glass');
    setTimeout(() => {
      pressBtn.classList.remove('energized-glass');
    }, 1000);
  }
  
  // Create energy burst at button center
  const rect = pressBtn.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  createEnergyBurst(centerX, centerY);
  
  // Energize text with glass effects
  energizeText();
  
  // Add original animation
  if (screenText1 && screenText2) {
    screenText1.classList.add('animate');
    screenText2.classList.add('animate');
  }
}

if (pressBtn) {
  pressBtn.addEventListener('click', async () => {
    try {
      const origin = window.location.origin;
      const response = await fetch(`${origin}/server/press`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log('POST /press successful');
    } catch (error) {
      console.error('Fetch error:', error);
    }

    // Trigger all energize effects
    energizeEverything();
  });
} else {
  console.error('Press button not found');
}