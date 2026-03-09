
document.addEventListener('DOMContentLoaded', () => {

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,.35)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });


  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.dataset.section === current) link.classList.add('active');
    });
  });


  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const email   = document.getElementById('emailInput').value.trim();
      const subject = document.getElementById('subjectInput').value.trim();
      const detail  = document.getElementById('detailInput').value.trim();

      if (!email || !subject || !detail) {
        showToast('กรุณากรอกข้อมูลให้ครบถ้วน', 'warning');
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showToast('รูปแบบอีเมลไม่ถูกต้อง', 'danger');
        return;
      }

      const modalEl = document.getElementById('myModal');
      const modal   = bootstrap.Modal.getInstance(modalEl);
      modal.hide();

      document.getElementById('emailInput').value   = '';
      document.getElementById('subjectInput').value = '';
      document.getElementById('detailInput').value  = '';

      showToast('ส่งข้อมูลเรียบร้อยแล้ว! ขอบคุณที่ติดต่อเรา 🎉', 'success');
    });
  }


  function showToast(message, type = 'success') {
    const colors = {
      success: 'linear-gradient(135deg,#0d6efd,#f72585)',
      warning: 'linear-gradient(135deg,#f59e0b,#ef4444)',
      danger:  'linear-gradient(135deg,#ef4444,#b91c1c)',
    };

    const toast = document.createElement('div');
    toast.style.cssText = `
      position:fixed; bottom:2rem; right:2rem; z-index:9999;
      background:${colors[type]}; color:#fff;
      padding:.9rem 1.6rem; border-radius:12px;
      font-family:'Kanit',sans-serif; font-size:.97rem;
      box-shadow:0 8px 28px rgba(0,0,0,.25);
      opacity:0; transform:translateY(16px);
      transition:.35s cubic-bezier(.4,0,.2,1);
      max-width:340px;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity  = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity   = '0';
      toast.style.transform = 'translateY(16px)';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }


  document.querySelectorAll('.btn-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.closest('.card').querySelector('.card-title').textContent;
      showToast(`กำลังโหลดข้อมูล: ${title}`, 'success');
    });
  });

});
