const fs = require('fs');
let html = fs.readFileSync('emosense_full_app.html', 'utf8');

// 1. Add CSS
const cssIndex = html.indexOf('</style>');
const authCSS = `
    /* ── AUTH ── */
    .page { display:none; }
    .page.active { display:flex; }
    #pg-app.page.active { display:block; }
    #pg-login, #pg-signup {
      min-height:100vh; align-items:stretch; position:relative; z-index:1;
      background: radial-gradient(circle at 20% 50%, rgba(0, 255, 225, 0.15), transparent 40%),
                  radial-gradient(circle at 80% 20%, rgba(255, 45, 120, 0.15), transparent 40%),
                  var(--bg);
    }
    .auth-left {
      width:45%; background:rgba(15,15,26,0.5); border-right:1px solid rgba(255,255,255,0.05);
      backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      padding:3rem; gap:1.5rem;
    }
    .auth-big { font-size:6rem; animation:authfloat 5s ease-in-out infinite; }
    @keyframes authfloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-15px)} }
    .auth-tag { font-size:2.2rem; font-weight:800; text-align:center; line-height:1.4; letter-spacing:-0.02em; }
    .auth-tag span { color:var(--accent); text-shadow: 0 0 20px rgba(0,255,225,0.4); }
    .pills { display:flex; flex-wrap:wrap; gap:0.6rem; justify-content:center; margin-top:1rem; }
    .pill { font-size:0.75rem; padding:0.4rem 1rem; border-radius:999px; border:1px solid; opacity:0.9; font-weight:600; background:rgba(0,0,0,0.3); backdrop-filter:blur(5px); }

    .auth-right { flex:1; display:flex; align-items:center; justify-content:center; padding:2rem; }
    .auth-box { 
      width:100%; max-width:420px; 
      background: rgba(22, 22, 37, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.05);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
      padding: 3rem 2.5rem; border-radius: 16px; 
    }
    .a-logo { font-size:1.8rem; font-weight:800; color:var(--accent); margin-bottom:2rem; text-align:center; }
    .a-logo span { color:var(--text); }
    .a-title { font-size:2rem; font-weight:800; margin-bottom:0.4rem; text-align:center; letter-spacing:-0.02em; }
    .a-sub { font-size:0.8rem; color:var(--muted); margin-bottom:2rem; font-family:monospace; text-align:center; }
    .fg { margin-bottom:1.2rem; }
    .fl { display:block; font-size:0.7rem; color:var(--muted); letter-spacing:0.1em; text-transform:uppercase; margin-bottom:0.5rem; font-family:monospace; font-weight:bold; }
    .fi {
      width:100%; background:rgba(0,0,0,0.2); border:1px solid rgba(255,255,255,0.1); color:var(--text);
      font-size:0.95rem; padding:0.9rem 1rem; border-radius:8px; outline:none;
      transition:all 0.3s;
    }
    .fi:focus { border-color:var(--accent); background:rgba(0,0,0,0.4); box-shadow: 0 0 15px rgba(0,255,225,0.1); }
    .fi::placeholder { color:rgba(255,255,255,0.3); }
    .btn-p {
      width:100%; background:linear-gradient(135deg, var(--accent), #00b3ff); color:#000; border:none; padding:1rem;
      font-size:1rem; font-weight:800; cursor:pointer; border-radius:8px; text-transform: uppercase; letter-spacing: 0.05em;
      transition:all 0.3s; margin-top:0.5rem; box-shadow: 0 4px 15px rgba(0,255,225,0.3);
    }
    .btn-p:hover { box-shadow:0 6px 25px rgba(0,255,225,0.5); transform: translateY(-2px); }
    .a-sw { text-align:center; margin-top:1.5rem; font-size:0.85rem; color:var(--muted); }
    .a-sw a { color:var(--accent); cursor:pointer; font-weight:600; transition:all 0.2s; }
    .a-sw a:hover { color:#fff; text-decoration:underline; }
    .a-demo { text-align:center; margin-top:0.8rem; }
    .a-demo a { color:var(--accent3); font-size:0.8rem; cursor:pointer; font-family:monospace; font-weight:600; transition:all 0.2s; }
    .a-demo a:hover { text-decoration:underline; }
    .err { background:rgba(255,45,120,0.15); border:1px solid rgba(255,45,120,0.4); color:var(--accent2); font-size:0.75rem; padding:0.8rem 1rem; border-radius:8px; margin-bottom:1.2rem; display:none; font-weight:600; text-align:center; }
    .err.show { display:block; animation:shake 0.4s ease-in-out; }
    
    /* toast */
    .toast { position:fixed; bottom:1.5rem; right:1.5rem; z-index:999; background:rgba(0,255,225,0.1); border:1px solid var(--accent); color:var(--accent); font-size:0.72rem; padding:0.7rem 1.3rem; border-radius:3px; display:none; font-family:monospace; }
`;
html = html.slice(0, cssIndex) + authCSS + '\n' + html.slice(cssIndex);

// 2. Change logic around body
const authHTML = `<body>

  <!-- LOGIN -->
  <div id="pg-login" class="page active">
    <div class="auth-left">
      <div class="auth-big">🎭</div>
      <div class="auth-tag">Read Every<br><span>Emotion</span><br>In Real Time</div>
      <div class="pills">
        <div class="pill" style="color:var(--joy);border-color:var(--joy)">😄 Happy</div>
        <div class="pill" style="color:var(--sad);border-color:var(--sad)">😢 Sad</div>
        <div class="pill" style="color:var(--angry);border-color:var(--angry)">😠 Angry</div>
        <div class="pill" style="color:var(--surprised);border-color:var(--surprised)">😲 Surprised</div>
        <div class="pill" style="color:var(--fearful);border-color:var(--fearful)">😨 Fearful</div>
      </div>
    </div>
    <div class="auth-right">
      <div class="auth-box">
        <div class="a-logo">Emo<span>Sense</span></div>
        <div class="a-title">Welcome Back</div>
        <div class="a-sub">// sign in to continue</div>
        <div class="err" id="loginErr">Invalid email or password</div>
        <div class="fg"><label class="fl">Email</label><input class="fi" type="email" id="lEmail" placeholder="you@gmail.com"></div>
        <div class="fg"><label class="fl">Password</label><input class="fi" type="password" id="lPass" placeholder="••••••••"></div>
        <button class="btn-p" onclick="doLogin()">Sign In →</button>
        <div class="a-sw">Don't have an account? <a onclick="SP('pg-signup')">Sign up</a></div>
        <div class="a-demo"><a onclick="demoLogin()">→ Try Demo Account</a></div>
      </div>
    </div>
  </div>

  <!-- SIGNUP -->
  <div id="pg-signup" class="page">
    <div class="auth-left">
      <div class="auth-big">✨</div>
      <div class="auth-tag">Start Your<br><span>Emotion</span><br>Journey</div>
      <div class="pills">
        <div class="pill" style="color:var(--accent);border-color:var(--accent)">📊 Analytics</div>
        <div class="pill" style="color:var(--accent3);border-color:var(--accent3)">📅 History</div>
        <div class="pill" style="color:var(--accent2);border-color:var(--accent2)">👤 Profile</div>
      </div>
    </div>
    <div class="auth-right">
      <div class="auth-box">
        <div class="a-logo">Emo<span>Sense</span></div>
        <div class="a-title">Create Account</div>
        <div class="a-sub">// join for free</div>
        <div class="err" id="signupErr">Please fill all fields</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.9rem">
          <div class="fg"><label class="fl">First Name</label><input class="fi" type="text" id="sFirst" placeholder="Raj"></div>
          <div class="fg"><label class="fl">Last Name</label><input class="fi" type="text" id="sLast" placeholder="Patel"></div>
        </div>
        <div class="fg"><label class="fl">Email</label><input class="fi" type="email" id="sEmail" placeholder="you@gmail.com"></div>
        <div class="fg"><label class="fl">Password</label><input class="fi" type="password" id="sPass" placeholder="min 6 characters"></div>
        <button class="btn-p" onclick="doSignup()">Create Account →</button>
        <div class="a-sw">Already have account? <a onclick="SP('pg-login')">Sign in</a></div>
      </div>
    </div>
  </div>

  <div id="pg-app" class="page">
`;
html = html.replace('<body>', authHTML);

// 3. Wrap script start & end
const mainEndMatch = html.match(/(<\/main>\s*<script>)/);
if (mainEndMatch) {
  html = html.replace(mainEndMatch[1], '</main>\n  </div>\n  <div class="toast" id="toast"></div>\n  <script>');
}

const headerEndRegex = /<\/header>/;
const headerReplacement = `
        <div style="margin-left:auto; display:flex; align-items:center; gap:1.2rem;">
          <div style="font-family:'Space Mono',monospace; font-size:0.8rem; color:var(--text); letter-spacing:0.05em">HI, <span id="userGreeting" style="color:var(--accent);font-weight:700">USER</span></div>
          <button onclick="doLogout()" style="background:transparent; border:1px solid var(--border); color:var(--muted); padding:0.4rem 0.8rem; border-radius:4px; font-family:'Syne',sans-serif; font-size:0.75rem; font-weight:700; cursor:pointer; text-transform:uppercase; letter-spacing:0.05em; transition:all 0.2s;">Logout</button>
        </div>
        </header>
`;

html = html.replace(headerEndRegex, headerReplacement);

// 4. Update JS logic
const jsStartStr = "const MODEL_URL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights';";
const newJsStarts = `const MODEL_URL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@0.22.2/weights';

    let users = JSON.parse(localStorage.getItem('emo_users')||'[]');
    let cu = JSON.parse(localStorage.getItem('emo_cu')||'null');
    let modelsLoaded = false;

    function SP(id) {
      document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
      document.getElementById(id).classList.add('active');
    }

    function toast(msg,err=false) {
      const t=document.getElementById('toast');
      if(!t) return;
      t.textContent=msg; t.style.display='block';
      t.style.color=err?'var(--accent2)':'var(--accent)';
      t.style.borderColor=err?'var(--accent2)':'var(--accent)';
      setTimeout(()=>t.style.display='none',3000);
    }

    function doLogin() {
      const em=document.getElementById('lEmail').value.trim();
      const pw=document.getElementById('lPass').value;
      const err=document.getElementById('loginErr');
      if(!em.endsWith('@gmail.com')){err.textContent='Only @gmail.com is allowed';err.classList.add('show');return;}
      const u=users.find(x=>x.email===em&&x.password===pw);
      if(!u){err.textContent='Invalid email or password';err.classList.add('show');return;}
      err.classList.remove('show');
      cu=u; localStorage.setItem('emo_cu',JSON.stringify(u)); enterApp();
    }
    function demoLogin() {
      let d=users.find(u=>u.email==='demo@gmail.com');
      if(!d){d={firstName:'Demo',lastName:'User',email:'demo@gmail.com',password:'demo123',joined:new Date().toLocaleDateString()};users.push(d);localStorage.setItem('emo_users',JSON.stringify(users));}
      cu=d; localStorage.setItem('emo_cu',JSON.stringify(d)); enterApp();
    }
    function doSignup() {
      const f=document.getElementById('sFirst').value.trim();
      const l=document.getElementById('sLast').value.trim();
      const e=document.getElementById('sEmail').value.trim();
      const p=document.getElementById('sPass').value;
      const err=document.getElementById('signupErr');
      if(!f||!e||p.length<6){err.textContent='Fill all fields (password 6+ chars)';err.classList.add('show');return;}
      if(!e.endsWith('@gmail.com')){err.textContent='Only @gmail.com is allowed';err.classList.add('show');return;}
      if(users.find(u=>u.email===e)){err.textContent='Email already registered';err.classList.add('show');return;}
      err.classList.remove('show');
      const u={firstName:f,lastName:l,email:e,password:p,joined:new Date().toLocaleDateString()};
      users.push(u); localStorage.setItem('emo_users',JSON.stringify(users));
      cu=u; localStorage.setItem('emo_cu',JSON.stringify(u)); enterApp();
    }
    function doLogout() {
      if(btnStop) btnStop.click();
      cu=null; localStorage.removeItem('emo_cu'); SP('pg-login');
    }
    function enterApp() {
      SP('pg-app');
      if(document.getElementById('userGreeting')) document.getElementById('userGreeting').textContent = cu ? cu.firstName.toUpperCase() : 'USER';
      if(!modelsLoaded) {
        document.getElementById('loadingOverlay').classList.remove('hidden');
        loadModels();
      }
    }
`;
html = html.replace(jsStartStr, newJsStarts);

html = html.replace("window.addEventListener('load', loadModels);", `
    window.addEventListener('load', () => {
      if(cu) enterApp(); else SP('pg-login');
    });
`);

const loadModelEnd = "setTimeout(() => {";
html = html.replace(loadModelEnd, "modelsLoaded = true;\\n      setTimeout(() => {");

fs.writeFileSync('emosense_full_app.html', html);
