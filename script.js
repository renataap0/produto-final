// Dados iniciais com os nomes solicitados
let drivers = [
    { id: 1, name: 'Rafaela Santana', number: 23, nat: '🇧🇷 BRA', role: 'Principal', team: 'Racing Angels' },
    { id: 2, name: 'Renata Aparecida', number: 77, nat: '🇧🇷 BRA', role: 'Principal', team: 'Racing Angels' },
    { id: 3, name: 'Ryan Matheus', number: 11, nat: '🇧🇷 BRA', role: 'Reserva', team: 'Racing Angels' },
    { id: 4, name: 'Murilo Araujo', number: 33, nat: '🇧🇷 BRA', role: 'Academia', team: 'Racing Angels' }
  ];
  
  let laps = [
    { driverId: 1, time: '1:18.400', compound: 'Soft', status: 'OK' },
    { driverId: 2, time: '1:19.120', compound: 'Medium', status: 'OK' }
  ];
  
 
  setInterval(() => {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString('pt-BR');
  }, 1000);
  
  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }
  
  
  function doLogin() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const err = document.getElementById('login-error');
  
    if (user === 'admin' && pass === 'racing2026') {
      document.getElementById('login-screen').classList.remove('active');
      document.getElementById('app').classList.add('active');
      initApp();
    } else {
      err.textContent = 'Credenciais inválidas. Tente novamente.';
    }
  }
  
  function doLogout() {
    document.getElementById('app').classList.remove('active');
    document.getElementById('login-screen').classList.add('active');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  }
  

  function navigate(pageId, element) {
    
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    document.getElementById(`page-${pageId}`).classList.add('active');
    
    
    if(element) {
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      element.classList.add('active');
    }
  }
  
  function refreshDash() {
    showToast("Dados do Dashboard Atualizados!");
  }
  
 
  function openAddDriver() {
    document.getElementById('modal-driver').classList.add('open');
  }
  
  function openAddLap() {
    const select = document.getElementById('l-driver');
    select.innerHTML = drivers.map(d => `<option value="${d.id}">${d.name} (#${d.number})</option>`).join('');
    document.getElementById('modal-lap').classList.add('open');
  }
  
  function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('open');
  }
  

  function addDriver() {
    const name = document.getElementById('d-name').value;
    const num = document.getElementById('d-num').value;
    const nat = document.getElementById('d-nat').value;
    const role = document.getElementById('d-role').value;
  
    if(!name || !num) return showToast("Preencha todos os campos!");
  
    drivers.push({
      id: drivers.length + 1,
      name: name,
      number: num,
      nat: nat || '🏁 ---',
      role: role,
      team: 'Racing Angels'
    });
  
    closeModal('modal-driver');
    renderDrivers();
    renderStandings();
    showToast("Corredor adicionado com sucesso!");
  }
  
  function addLap() {
    const dId = document.getElementById('l-driver').value;
    const time = document.getElementById('l-time').value;
  
    if(!time) return showToast("Insira o tempo da volta!");
  
    laps.push({ driverId: parseInt(dId), time: time, compound: 'Soft', status: 'OK' });
    
    closeModal('modal-lap');
    renderLaps();
    showToast("Volta registrada com sucesso!");
  }
  
 
  function initApp() {
    renderDrivers();
    renderStandings();
    renderLaps();
    renderSelectOptions();
  }
  
  function renderDrivers() {
    const grid = document.getElementById('drivers-grid');
    grid.innerHTML = drivers.map(d => `
      <div class="driver-card">
        <div class="driver-header">
          <div class="driver-number">${d.number}</div>
          <div class="driver-info">
            <div class="driver-name">${d.name}</div>
            <div class="driver-team">${d.team}</div>
          </div>
          <div class="driver-flag">${d.nat.split(' ')[0]}</div>
        </div>
        <div class="driver-footer">
          <span class="status-pill ${d.role === 'Principal' ? 'status-active' : 'status-reserve'}">${d.role}</span>
          <button class="btn-detail">Perfil</button>
        </div>
      </div>
    `).join('');
  }
  
  function renderStandings() {
    const tbody = document.getElementById('standings-body');
    tbody.innerHTML = drivers.map((d, i) => `
      <tr>
        <td><span class="pos-badge pos-${i + 1}">${i + 1}</span></td>
        <td>${d.name}</td>
        <td>${d.team}</td>
        <td style="text-align:right">${Math.floor(Math.random() * 100)}</td>
      </tr>
    `).join('');
  }
  
  function renderLaps() {
    const tbody = document.getElementById('laps-body');
    tbody.innerHTML = laps.map(l => {
      const d = drivers.find(drv => drv.id === l.driverId);
      return `
        <tr>
          <td>${d ? d.name : 'Desc.'} (#${d ? d.number : '--'})</td>
          <td class="lap-fastest">${l.time}</td>
          <td><span class="tire-icon tire-${l.compound.toLowerCase()}">●</span> ${l.compound}</td>
          <td><span class="sector-badge sector-n">${l.status}</span></td>
        </tr>
      `;
    }).reverse().join('');
  }
  
  function renderSelectOptions() {
    const selectDriver = document.getElementById('filter-driver');
    let options = '<option value="">Todos os pilotos</option>';
    drivers.forEach(d => {
      options += `<option value="${d.id}">${d.name}</option>`;
    });
    selectDriver.innerHTML = options;
  }