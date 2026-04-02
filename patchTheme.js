const fs = require('fs');

function updateTheme() {
    let content = fs.readFileSync('emosense_full_app.html', 'utf8');

    // CSS Variables
    content = content.replace('--bg: #0a0a0f;', '--bg: #f8fafc;');
    content = content.replace('--surface: #111118;', '--surface: #ffffff;');
    content = content.replace('--border: #1e1e2e;', '--border: #cbd5e1;');
    content = content.replace('--accent: #00ffe1;', '--accent: #2563eb;');
    content = content.replace('--accent2: #ff2d78;', '--accent2: #e11d48;');
    content = content.replace('--accent3: #ffe600;', '--accent3: #d97706;');
    content = content.replace('--text: #e8e8f0;', '--text: #0f172a;');
    content = content.replace('--muted: #555570;', '--muted: #64748b;');
    content = content.replace('--joy: #ffe600;', '--joy: #d97706;');
    content = content.replace('--angry: #ff2d78;', '--angry: #e11d48;');

    // Grid Background
    content = content.replace('rgba(0, 255, 225, 0.03)', 'rgba(37, 99, 235, 0.05)');

    // Header & Top level Surface
    content = content.replace('rgba(15, 15, 26, 0.8)', 'rgba(255, 255, 255, 0.8)');

    // Overlays & Panels
    content = content.replace('rgba(22, 22, 37, 0.6)', 'rgba(255, 255, 255, 0.8)');
    content = content.replace('rgba(22, 22, 37, 0.4)', 'rgba(255, 255, 255, 0.7)');
    content = content.replace('rgba(15, 15, 26, 0.5)', 'rgba(255, 255, 255, 0.6)');
    content = content.replace('rgba(10, 10, 16, 0.8)', 'rgba(248, 250, 252, 0.8)');
    content = content.replace('rgba(22, 22, 37, 0.95)', 'rgba(255, 255, 255, 0.95)');
    content = content.replace(/rgba\(15, 15, 26/g, 'rgba(255, 255, 255');

    // Inputs & Pills
    content = content.replace('rgba(0, 0, 0, 0.3)', 'rgba(241, 245, 249, 0.8)');
    content = content.replace('rgba(0, 0, 0, 0.2)', 'rgba(255, 255, 255, 0.9)');
    content = content.replace('rgba(0, 0, 0, 0.4)', 'rgba(255, 255, 255, 1)');

    // Borders & Shadows
    content = content.replace('rgba(255, 255, 255, 0.05)', 'rgba(0, 0, 0, 0.08)');
    content = content.replace('rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.12)');
    content = content.replace('rgba(0, 0, 0, 0.5)', 'rgba(37, 99, 235, 0.15)');
    content = content.replace('rgba(0, 0, 0, 0.4)', 'rgba(37, 99, 235, 0.12)');
    content = content.replace('rgba(0, 0, 0, 0.3)', 'rgba(37, 99, 235, 0.1)');

    // Box Shadow for .btn-start hover 
    content = content.replace('box-shadow: 0 0 12px var(--accent)', 'box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4)');
    content = content.replace('box-shadow: 0 0 4px var(--accent)', 'box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2)');

    // Glowing Effects (Auth gradients, input focus)
    content = content.replace('rgba(0, 255, 225, 0.15)', 'rgba(37, 99, 235, 0.1)');
    content = content.replace('rgba(0, 255, 225, 0.1)', 'rgba(37, 99, 235, 0.15)');
    content = content.replace('rgba(0, 255, 225, 0.4)', 'rgba(37, 99, 235, 0.4)');
    content = content.replace('rgba(0, 255, 225, 0.3)', 'rgba(37, 99, 235, 0.3)');
    content = content.replace('rgba(0, 255, 225, 0.5)', 'rgba(37, 99, 235, 0.5)');
    content = content.replace('rgba(0, 255, 225, 0.8)', 'rgba(37, 99, 235, 0.8)');

    // Red Auth glow
    content = content.replace('rgba(255, 45, 120, 0.15)', 'rgba(225, 29, 72, 0.1)');
    content = content.replace('rgba(255, 45, 120, 0.4)', 'rgba(225, 29, 72, 0.4)');
    content = content.replace('rgba(255, 45, 120, 0.1)', 'rgba(225, 29, 72, 0.1)');
    content = content.replace('rgba(255, 45, 120, 0.3)', 'rgba(225, 29, 72, 0.3)');

    // Button Gradients
    content = content.replace('#00b3ff', '#60a5fa');

    // Auth Specifics
    content = content.replace('rgba(255, 255, 255, 0.3)', 'rgba(100, 116, 139, 0.6)'); // Placeholders

    // Primary button text color #000 -> white
    content = content.replace('color: #000;', 'color: #fff;');
    content = content.replace('color:#000;', 'color:#fff;');

    // Hardcoded JS variables
    content = content.replace("happy: '#ffe600'", "happy: '#d97706'");
    content = content.replace("angry: '#ff2d78'", "angry: '#e11d48'");
    content = content.replace("|| '#fff'", "|| '#0f172a'");

    // Status Ready 
    content = content.replace('background: #69f0ae;', 'background: #10b981;'); // Green

    fs.writeFileSync('emosense_full_app.html', content, 'utf8');
}

updateTheme();
