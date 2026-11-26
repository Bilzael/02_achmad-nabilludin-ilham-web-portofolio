/* ================= MOBILE NAVBAR & SCROLL SPY ================= */

const header = document.getElementById('header');
const menuToggle = document.getElementById('menu-icon');
const menuIconGlyph = menuToggle.querySelector('i');
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const closeMobileMenu = () => {
    navbar.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuIconGlyph.classList.replace('bx-x', 'bx-menu');
};

menuToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuIconGlyph.classList.toggle('bx-menu', !isOpen);
    menuIconGlyph.classList.toggle('bx-x', isOpen);
});

navLinks.forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
});

const handleScroll = () => {
    const scrollY = window.scrollY;
    header.classList.toggle('sticky', scrollY > 40);

    sections.forEach((sec) => {
        const offset = sec.offsetTop - 160;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollY >= offset && scrollY < offset + height) {
            navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
};

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

/* ================= VANILLA TYPING EFFECT ================= */

const typedTarget = document.getElementById('typed-text');
const roles = [
    'Siswa SMKS Krian 1 Sidoarjo',
    'Siswa X RPL 1',
    'Frontend Developer'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const runTyping = () => {
    if (!typedTarget) return;

    const currentRole = roles[roleIndex];
    typedTarget.textContent = currentRole.slice(0, charIndex);

    let delay = isDeleting ? 55 : 95;

    if (!isDeleting && charIndex === currentRole.length) {
        delay = 1400;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 350;
    } else {
        charIndex += isDeleting ? -1 : 1;
    }

    setTimeout(runTyping, delay);
};

runTyping();

/* ================= SCROLL REVEAL (INTERSECTION OBSERVER) ================= */

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.14 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
} else {
    revealElements.forEach((el) => el.classList.add('visible'));
}

/* ================= PROJECT MODAL ================= */

const projectData = {
    tanaman1: {
        title: 'Menanam Kangkung: Tugas Ketahanan Pangan Mapel PPLG',
        category: 'PPLG • Ketahanan Pangan',
        image: 'tanaman-1.jpg',
        description:
            'Proyek ketahanan pangan mata pelajaran Pengembangan Perangkat Lunak dan Gim (PPLG) berupa kegiatan budidaya tanaman kangkung, yang menggabungkan proses pembelajaran agrikultur praktis untuk mendukung kemandirian pangan.'
    },
    tanaman2: {
        title: 'Menanam 10 Jenis TOGA: Projek Kesehatan Mandiri dan Lingkungan',
        category: 'Projek Lingkungan • TOGA',
        image: 'tanaman-2.jpg',
        description:
            'Proyek ketahanan pangan dan pemanfaatan lahan sekolah melalui budidaya 10 jenis Tanaman Obat Keluarga (TOGA) pilihan, yang memadukan kegiatan agrikultur praktis dengan penerapan teknologi digital untuk mendukung kesehatan mandiri dan edukasi lingkungan.'
    }
};

const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalCategory = document.getElementById('modalCategory');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');

const openProject = (projectId) => {
    const project = projectData[projectId];
    if (!project) return;

    modalImage.src = project.image;
    modalImage.alt = project.title;
    modalCategory.textContent = project.category;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
};

const closeProject = () => {
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
};

document.querySelectorAll('.plant-project').forEach((card) => {
    const projectId = card.dataset.project;

    card.addEventListener('click', () => openProject(projectId));
    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openProject(projectId);
        }
    });
});

modalClose.addEventListener('click', closeProject);

modal.addEventListener('click', (event) => {
    if (event.target === modal) closeProject();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeProject();
        closeMobileMenu();
    }
});

/* ================= CONTACT FORM VALIDATION ================= */

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
        formStatus.textContent = 'Mohon lengkapi nama, email, subjek, dan pesan terlebih dahulu.';
        formStatus.className = 'form-status error';
        return;
    }
if (!name || !email || !subject || !message) {
      formStatus.textContent = 'Mohon lengkapi nama, email, subjek, dan pesan terlebih dahulu.';
      formStatus.className = 'form-status error';
      return;
    }
  }); // <--- Baris 195 (Penutup fungsi contactForm)

  // ==========================================
  // TEMPELKAN KODE FILTER SERTIFIKAT DI SINI
  // ==========================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const certificateCards = document.querySelectorAll('.certificate-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      certificateCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        formStatus.textContent = 'Format alamat email belum valid.';
        formStatus.className = 'form-status error';
        return;
    }

    formStatus.textContent = `Terima kasih, ${name}! Pesan berhasil divalidasi dan siap dikirim.`;
    formStatus.className = 'form-status success';
    contactForm.reset();
});
// ==========================================
// KODE FILTER SERTIFIKAT
// ==========================================
const filterButtons = document.querySelectorAll('.filter-btn');
const certificateCards = document.querySelectorAll('.certificate-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');

    certificateCards.forEach(card => {
      const category = card.getAttribute('data-category');

      if (filterValue === 'all' || category === filterValue) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});    
