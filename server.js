const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// API routes
app.post('/api/verify', require('./dashboard/api/verify'));
app.post('/api/list', require('./dashboard/api/list'));
app.post('/api/update', require('./dashboard/api/update'));
app.post('/api/upload', require('./dashboard/api/upload'));
app.post('/auth/login', require('./dashboard/auth/login'));

// Direct download link - opens version selection modal
app.get('/download', (req, res) => {
  res.redirect('/?showDownload=1');
});

// Auto-login route with password parameter
app.get('/ipa-:version/password=:password', (req, res) => {
  const { version, password } = req.params;
  const decodedPassword = decodeURIComponent(password);
  
  // Load and check password
  try {
    const passwordFilePath = path.join(__dirname, 'assets/config/password/password.json');
    const passwordData = JSON.parse(fs.readFileSync(passwordFilePath, 'utf8'));
    
    // Check if password matches
    const isValid = passwordData[version] === decodedPassword.trim();
    
    console.log(`[Auto-Login] Version: ${version}, Password: ${decodedPassword}, Valid: ${isValid}`);
    
    if (isValid) {
      // Redirect to home with password as query parameter
      res.redirect(`/?auto=1&version=${version}&pwd=${encodeURIComponent(decodedPassword)}`);
    } else {
      // Password sai - hiển thị trang lỗi
      res.send(`
        <!DOCTYPE html>
        <html lang="vi">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Mật Khẩu Sai</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
          <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700&display=swap&subset=vietnamese" rel="stylesheet">
          <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet">
          <style>
            :root {
              --bg-body: #f2f5f9;
              --text-dark: #334155;
              --grid-line: rgba(0,0,0,0.06);
              --glass-border-light: rgba(255,255,255,0.6);
            }

            * { box-sizing: border-box; margin: 0; padding: 0; }

            body {
              font-family: 'Baloo 2', 'Inter', sans-serif;
              background-color: var(--bg-body);
              background-image:
                linear-gradient(90deg, var(--grid-line) 1px, transparent 1px),
                linear-gradient(var(--grid-line) 1px, transparent 1px);
              background-size: 36px 36px, 36px 36px;
              background-position: 0 0, 0 0;
              background-repeat: repeat, repeat;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              padding: 20px;
              color: var(--text-dark);
              overflow-x: hidden;
            }

            .error-container {
              position: relative;
              max-width: 500px;
              width: 100%;
              text-align: center;
            }

            .error-card {
              position: relative;
              background: linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.35));
              border-radius: 18px;
              border: 1px solid var(--glass-border-light);
              box-shadow: 0 12px 30px rgba(2,6,23,0.12);
              backdrop-filter: blur(12px) saturate(120%);
              -webkit-backdrop-filter: blur(12px) saturate(120%);
              padding: 40px 30px;
              animation: slideIn 0.5s ease-out;
            }

            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateY(-20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .error-icon {
              font-size: 80px;
              margin-bottom: 20px;
              animation: shake 0.6s ease-in-out;
            }

            @keyframes shake {
              0%, 100% { transform: translate(0, 0); }
              25% { transform: translate(-10px, 0); }
              75% { transform: translate(10px, 0); }
            }

            .error-title {
              font-size: 28px;
              font-weight: 700;
              color: var(--text-dark);
              margin-bottom: 12px;
              font-family: 'Luckiest Guy', sans-serif;
            }

            .error-text {
              font-size: 15px;
              color: #667085;
              margin-bottom: 30px;
              line-height: 1.6;
            }

            .button-group {
              display: flex;
              flex-direction: column;
              gap: 12px;
              margin-bottom: 20px;
            }

            .btn {
              position: relative;
              padding: 12px 24px;
              border: none;
              border-radius: 10px;
              font-size: 14px;
              font-weight: 600;
              font-family: 'Baloo 2', sans-serif;
              cursor: pointer;
              transition: all 0.3s ease;
              overflow: hidden;
              display: inline-block;
              text-decoration: none;
            }

            .btn::before {
              content: '';
              position: absolute;
              top: 0;
              left: -100%;
              width: 100%;
              height: 100%;
              background: rgba(255,255,255,0.2);
              transition: left 0.3s ease;
              z-index: -1;
            }

            .btn:hover::before {
              left: 100%;
            }

            .btn-primary {
              background: linear-gradient(135deg, #2e4192 0%, #1a2d5e 100%);
              color: white;
              box-shadow: 0 4px 15px rgba(46, 65, 146, 0.3);
            }

            .btn-primary:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(46, 65, 146, 0.5);
            }

            .btn-primary:active {
              transform: translateY(0);
              box-shadow: 0 2px 10px rgba(46, 65, 146, 0.3);
            }

            .btn-secondary {
              background: linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2));
              color: var(--text-dark);
              border: 1.5px solid rgba(46, 65, 146, 0.3);
              box-shadow: 0 4px 15px rgba(2,6,23,0.08);
            }

            .btn-secondary:hover {
              background: linear-gradient(135deg, rgba(255,255,255,0.5), rgba(255,255,255,0.3));
              border-color: rgba(46, 65, 146, 0.5);
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(2,6,23,0.12);
            }

            .btn-secondary:active {
              transform: translateY(0);
              box-shadow: 0 2px 10px rgba(2,6,23,0.08);
            }

            .contact-hint {
              font-size: 13px;
              color: #667085;
              padding-top: 20px;
              border-top: 1px solid rgba(0,0,0,0.08);
              margin-top: 20px;
            }

            .contact-link {
              color: #2e4192;
              text-decoration: none;
              font-weight: 600;
              transition: all 0.2s ease;
              position: relative;
            }

            .contact-link::after {
              content: '';
              position: absolute;
              bottom: -2px;
              left: 0;
              width: 0;
              height: 2px;
              background: #2e4192;
              transition: width 0.3s ease;
            }

            .contact-link:hover::after {
              width: 100%;
            }

            @media (prefers-reduced-motion: reduce) {
              .error-card,
              .error-icon,
              .btn {
                animation: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="error-container">
            <div class="error-card">
              <div class="error-icon">❌</div>
              <h1 class="error-title">Mật Khẩu Sai!</h1>
              <p class="error-text">
                Mật khẩu bạn nhập không chính xác. Vui lòng kiểm tra lại hoặc liên hệ admin để nhận mật khẩu đúng.
              </p>
              
              <div class="button-group">
                <button class="btn btn-primary" onclick="window.location.href='/'">
                  🏠 Quay Lại Trang Chủ
                </button>
                <button class="btn btn-secondary" onclick="showContactOptions()">
                  📞 Liên Hệ Admin
                </button>
              </div>

              <div class="contact-hint">
                Bạn cần hỗ trợ? <a href="https://tuiducios.xyz" target="_blank" class="contact-link">Click vào đây</a>
              </div>
            </div>
          </div>

          <script>
            function showContactOptions() {
              window.location.href = 'https://tuiducios.xyz';
            }

            // Apply click effect
            document.querySelectorAll('.btn').forEach(btn => {
              btn.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = \`
                  position: absolute;
                  width: \${size}px;
                  height: \${size}px;
                  background: rgba(255, 255, 255, 0.5);
                  border-radius: 50%;
                  left: \${x}px;
                  top: \${y}px;
                  pointer-events: none;
                  animation: ripple 0.6s ease-out;
                \`;
                
                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
              });
            });

            const style = document.createElement('style');
            style.textContent = \`
              @keyframes ripple {
                to {
                  transform: scale(4);
                  opacity: 0;
                }
              }
            \`;
            document.head.appendChild(style);
          </script>
        </body>
        </html>
      `);
    }
  } catch (err) {
    console.error('Auto-login error:', err);
    res.status(500).send('Lỗi server');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});