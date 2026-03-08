/* ============================================================
   VitalArc — Application Logic
   ============================================================ */

/* ---------- Storage ---------- */
class Storage {
  static get(key, def = null) { try { const v = localStorage.getItem('va_'+key); return v ? JSON.parse(v) : def; } catch { return def; } }
  static set(key, val) { try { localStorage.setItem('va_'+key, JSON.stringify(val)); } catch {} }
}

/* ---------- Toast ---------- */
function toast(msg, type='') {
  const el = document.getElementById('toast');
  el.textContent = msg; el.className = 'toast show' + (type ? ' '+type : '');
  clearTimeout(el._t); el._t = setTimeout(() => el.className = 'toast', 3200);
}

/* ---------- Router ---------- */
class Router {
  constructor() { this.current = 'dashboard'; }
  navigate(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const sec = document.getElementById(section);
    const nav = document.getElementById('nav-'+section);
    if (sec) sec.classList.add('active');
    if (nav) nav.classList.add('active');
    this.current = section;
    window.app.closeSidebar();
    if (section === 'dashboard') window.app.dashboard.render();
    if (section === 'progress') window.app.progressTracker.renderChart();
    if (section === 'exercises' && !window.app.exerciseLibrary.rendered) window.app.exerciseLibrary.render();
    if (section === 'routines') window.app.routineGenerator.renderSaved();
    if (section === 'nutrition') window.app.nutritionTracker.render();
  }
}

/* ---------- Dashboard ---------- */
class Dashboard {
  render() {
    const logs = Storage.get('workouts', []);
    const meals = Storage.get('meals', []);
    const today = new Date().toISOString().slice(0,10);
    // Greeting
    const h = new Date().getHours();
    let greeting = 'Good Evening 🌙';
    if (h < 12) greeting = 'Good Morning 🌅';
    else if (h < 18) greeting = 'Good Afternoon ☀️';
    document.getElementById('dashGreeting').textContent = `${greeting}, User.`;
    document.getElementById('dashDate').textContent = new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
    // Stats
    document.getElementById('statWorkouts').textContent = logs.length;
    const totalCals = meals.reduce((a,m) => a + (m.calories||0), 0);
    document.getElementById('statCalories').textContent = totalCals.toLocaleString();
    // Streak
    const streak = this.calcStreak(logs);
    document.getElementById('statStreak').textContent = streak;
    const thisWeek = logs.filter(l => { const d = new Date(l.date); const now = new Date(); const diff = (now - d) / 86400000; return diff <= 7; }).length;
    document.getElementById('statWeekly').textContent = `${thisWeek}/5`;
    // Recent activity
    const recent = [...logs].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,5);
    const ra = document.getElementById('recentActivity');
    if (recent.length === 0) {
      ra.innerHTML = `<div class="empty-state"><div class="empty-icon">📋</div><p>No activity yet. Start your first workout!</p><button class="btn btn-primary" onclick="app.router.navigate('routines')">Get Started</button></div>`;
    } else {
      ra.innerHTML = recent.map(l => `<div class="activity-item"><div class="activity-dot"></div><div class="activity-info"><div class="activity-name">${l.routine||'Workout'}</div><div class="activity-meta">${new Date(l.date).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}${l.notes ? ' · '+l.notes : ''}</div></div><div class="activity-dur">${l.duration||0} min</div></div>`).join('');
    }
    // Last routine
    const savedRoutines = Storage.get('saved_routines', []);
    const lastCard = document.getElementById('lastRoutineCard');
    if (savedRoutines.length > 0) {
      const last = savedRoutines[savedRoutines.length - 1];
      lastCard.style.display = '';
      document.getElementById('lastRoutineBody').innerHTML = `<div class="last-routine-info"><div class="lri-item"><div class="lri-label">Routine</div><div class="lri-value">${last.name}</div></div><div class="lri-item"><div class="lri-label">Days</div><div class="lri-value">${last.days.length} days/week</div></div><div class="lri-item"><div class="lri-label">Focus</div><div class="lri-value">${last.goal.replace('_',' ')}</div></div></div>`;
    } else { lastCard.style.display = 'none'; }
    // Progress stats sync
    document.getElementById('pStatWeek').textContent = thisWeek;
    document.getElementById('pStatTotal').textContent = logs.length;
    document.getElementById('pStatMinutes').textContent = logs.reduce((a,l)=>a+(l.duration||0),0);
    document.getElementById('pStatBest').textContent = streak;
  }
  calcStreak(logs) {
    if (!logs.length) return 0;
    const dates = [...new Set(logs.map(l=>l.date))].sort().reverse();
    let streak = 0, cur = new Date(); cur.setHours(0,0,0,0);
    for (const d of dates) {
      const dd = new Date(d); dd.setHours(0,0,0,0);
      const diff = Math.round((cur - dd) / 86400000);
      if (diff <= 1) { streak++; cur = dd; } else break;
    }
    return streak;
  }
}

/* ---------- Routine Generator ---------- */
class RoutineGenerator {
  constructor() {
    this.generated = null;
    document.querySelectorAll('.option-cards').forEach(group => {
      group.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', () => {
          group.querySelectorAll('.option-card').forEach(c => c.classList.remove('selected'));
          card.classList.add('selected');
        });
      });
    });
  }
  getVal(groupId) {
    const sel = document.querySelector(`#${groupId} .option-card.selected`);
    return sel ? sel.dataset.value : null;
  }
  generate() {
    const goal = this.getVal('optGoal');
    const level = this.getVal('optLevel');
    const numDays = parseInt(this.getVal('optDays'));
    const equipment = this.getVal('optEquipment');
    const requestedKey = `${goal}_${level}_${numDays}`;
    
    let template = ROUTINE_TEMPLATES[requestedKey];
    const alertDiv = document.getElementById('routineFallbackAlert');
    const alertMsg = document.getElementById('routineFallbackMessage');
    
    if (template) {
      alertDiv.style.display = 'none';
      this.generated = { ...template, goal, level, equipment, key: requestedKey };
    } else {
      const fallbackKey = getFallbackKey(goal, level, numDays);
      template = ROUTINE_TEMPLATES[fallbackKey];
      this.generated = { ...template, goal, level, equipment, key: fallbackKey };
      
      const parts = fallbackKey.split('_');
      const fDays = parseInt(parts[parts.length - 1]);
      const fLevel = parts[parts.length - 2];
      
      let msg = "";
      if (fDays !== numDays) msg += `For your chosen experience level, it is highly advised to follow a <strong>${fDays}-day ${template.name}</strong> schedule for optimal recovery and results. `;
      if (fLevel !== level) msg += `The difficulty has been adjusted to match available templates. `;
      
      alertMsg.innerHTML = msg;
      alertDiv.style.display = 'flex';
    }

    this.renderOutput(this.generated);
    const out = document.getElementById('routineOutput');
    out.style.display = '';
    // Collapse the form so output is immediately in view
    document.getElementById('routineForm').style.display = 'none';
    document.getElementById('routineModifyBtn').style.display = '';
    toast('✅ Routine generated! Scroll down to see your plan.');
    setTimeout(() => out.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
  }
  showForm() {
    document.getElementById('routineForm').style.display = '';
    document.getElementById('routineModifyBtn').style.display = 'none';
    document.querySelector('.routine-generator-card').scrollIntoView({ behavior:'smooth', block:'start' });
  }
  renderOutput(r) {
    const equipSuffix = r.equipment === 'dumbbells' ? ' • Dumbbells Only' : (r.equipment === 'bodyweight' ? ' • Bodyweight' : '');
    document.getElementById('routineTitle').textContent = r.name + equipSuffix;
    document.getElementById('routineDesc').textContent = r.desc;
    const grid = document.getElementById('routineDays');
    grid.innerHTML = r.days.map((day, i) => {
      const exs = day.exercises.map(e => {
        let ex = EXERCISES.find(x => x.id === e.id) || { name: e.id, sets:'3', reps:'10', muscle:'general', equipment:'barbell' };
        
        // Handle difficulty: no HIIT for beginners
        if (r.level === 'beginner' && ex.id === 'hiit_sprint') {
          ex = EXERCISES.find(x => x.id === 'jump_rope') || ex;
        }

        // Swap exercise if incompatible with user's equipment choice
        if (r.equipment === 'dumbbells' && ex.equipment !== 'dumbbell' && ex.equipment !== 'bodyweight') {
           let swap = EXERCISES.find(x => x.muscle === ex.muscle && (x.equipment === 'dumbbell' || x.equipment === 'bodyweight'));
           if (!swap) swap = EXERCISES.find(x => x.equipment === 'dumbbell');
           if (swap) ex = swap;
        } else if (r.equipment === 'bodyweight' && ex.equipment !== 'bodyweight') {
           let swap = EXERCISES.find(x => x.muscle === ex.muscle && x.equipment === 'bodyweight');
           if (!swap) swap = EXERCISES.find(x => x.id === 'push_up' || x.id === 'plank'); // Generic bodyweight fallback
           if (swap) ex = swap;
        }

        return `<div class="exercise-row"><span class="ex-name">${ex.emoji||'💪'} ${ex.name}</span><span class="ex-muscle">${ex.muscle}</span><span class="ex-sets">${ex.sets}×${ex.reps}</span></div>`;
      }).join('');
      return `<div class="day-card"><div class="day-card-header"><span class="day-number">Day ${i+1}</span><span class="day-focus">${day.focus}</span></div><div class="day-body">${exs}</div></div>`;
    }).join('');
  }
  saveRoutine() {
    if (!this.generated) return;
    const saved = Storage.get('saved_routines', []);
    const exists = saved.find(r => r.key === this.generated.key);
    if (exists) { toast('Routine already saved!'); return; }
    saved.push({ ...this.generated, savedAt: new Date().toISOString() });
    Storage.set('saved_routines', saved);
    this.renderSaved();
    toast('✅ Routine saved!');
  }
  renderSaved() {
    const saved = Storage.get('saved_routines', []);
    const card = document.getElementById('savedRoutinesCard');
    const list = document.getElementById('savedRoutinesList');
    if (!saved.length) { card.style.display = 'none'; return; }
    card.style.display = '';
    list.innerHTML = saved.map((r, i) => `
      <div class="saved-routine-item">
        <div>
          <div class="saved-routine-name">💪 ${r.name}</div>
          <div class="saved-routine-meta">${r.days.length} days/week · ${r.goal.replace('_',' ')} · ${r.level}</div>
        </div>
        <button class="btn btn-outline btn-sm" onclick="app.routineGenerator.loadSaved(${i})">Load</button>
        <button class="btn btn-danger btn-sm" onclick="app.routineGenerator.deleteSaved(${i})">✕</button>
      </div>`).join('');
  }
  loadSaved(i) {
    const saved = Storage.get('saved_routines', []);
    this.generated = saved[i];
    this.renderOutput(this.generated);
    const out = document.getElementById('routineOutput');
    out.style.display = '';
    requestAnimationFrame(() => out.scrollIntoView({ behavior:'smooth', block:'start' }));
  }
  deleteSaved(i) {
    const saved = Storage.get('saved_routines', []);
    saved.splice(i, 1);
    Storage.set('saved_routines', saved);
    this.renderSaved();
    toast('Routine deleted.');
  }
  startWorkout() {
    if (!this.generated) return;
    window.app.progressTracker.openLogModal();
    document.getElementById('logRoutineName').value = this.generated.name;
    toast('🏁 Log your session when done!');
  }
}

/* ---------- Exercise Library ---------- */
class ExerciseLibrary {
  constructor() { this.rendered = false; }
  render() {
    this.rendered = true;
    this.filter();
  }
  filter() {
    const q = (document.getElementById('exerciseSearch').value || '').toLowerCase();
    const muscle = document.getElementById('filterMuscle').value;
    const equip = document.getElementById('filterEquipment').value;
    const filtered = EXERCISES.filter(ex => {
      const matchQ = !q || ex.name.toLowerCase().includes(q) || ex.muscle.includes(q);
      const matchM = !muscle || ex.muscle === muscle;
      const matchE = !equip || ex.equipment === equip;
      return matchQ && matchM && matchE;
    });
    const grid = document.getElementById('exercisesGrid');
    if (!filtered.length) { grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon">🔍</div><p>No exercises found. Try adjusting your filters.</p></div>`; return; }
    grid.innerHTML = filtered.map(ex => `
      <div class="exercise-card" onclick="app.exerciseLibrary.showModal('${ex.id}')">
        <div class="exercise-emoji">${ex.emoji}</div>
        <div class="exercise-name">${ex.name}</div>
        <div class="exercise-tags">
          <span class="tag tag-muscle">${ex.muscle}</span>
          <span class="tag tag-equipment">${ex.equipment}</span>
          <span class="tag tag-difficulty-${ex.difficulty}">${ex.difficulty}</span>
        </div>
      </div>`).join('');
  }
  showModal(id) {
    const ex = EXERCISES.find(e => e.id === id);
    if (!ex) return;
    document.getElementById('exerciseModalContent').innerHTML = `
      <div class="ex-modal-header">
        <div class="ex-modal-emoji">${ex.emoji}</div>
        <div>
          <div class="ex-modal-title">${ex.name}</div>
          <div class="ex-modal-tags">
            <span class="tag tag-muscle">${ex.muscle}</span>
            <span class="tag tag-equipment">${ex.equipment}</span>
            <span class="tag tag-difficulty-${ex.difficulty}">${ex.difficulty}</span>
          </div>
        </div>
      </div>
      <div class="ex-modal-stats">
        <div class="ex-stat"><span class="ex-stat-value">${ex.sets}</span><span class="ex-stat-label">Sets</span></div>
        <div class="ex-stat"><span class="ex-stat-value">${ex.reps}</span><span class="ex-stat-label">Reps</span></div>
        <div class="ex-stat"><span class="ex-stat-value">${ex.rest}</span><span class="ex-stat-label">Rest</span></div>
      </div>
      <div class="ex-modal-section"><h3>Description</h3><p>${ex.desc}</p></div>
      <div class="ex-modal-section"><h3>Tips</h3><ul class="tips-list">${ex.tips.map(t=>`<li>💡 ${t}</li>`).join('')}</ul></div>`;
    document.getElementById('exerciseModal').classList.add('open');
  }
  closeModal(e) { if (e.target === document.getElementById('exerciseModal')) this.closeModalBtn(); }
  closeModalBtn() { document.getElementById('exerciseModal').classList.remove('open'); }
}

/* ---------- Progress Tracker ---------- */
class ProgressTracker {
  constructor() { this.chart = null; }
  openLogModal() {
    document.getElementById('logDate').value = new Date().toISOString().slice(0,10);
    document.getElementById('logRoutineName').value = '';
    document.getElementById('logDuration').value = '';
    document.getElementById('logNotes').value = '';
    document.getElementById('logWorkoutModal').classList.add('open');
  }
  closeLogModal(e) { if (e.target === document.getElementById('logWorkoutModal')) this.closeLogModalBtn(); }
  closeLogModalBtn() { document.getElementById('logWorkoutModal').classList.remove('open'); }
  saveLog() {
    const date = document.getElementById('logDate').value;
    const routine = document.getElementById('logRoutineName').value.trim();
    const duration = parseInt(document.getElementById('logDuration').value) || 0;
    const notes = document.getElementById('logNotes').value.trim();
    if (!date || !routine) { toast('Please fill in date and workout name.', 'error'); return; }
    const logs = Storage.get('workouts', []);
    logs.push({ id: Date.now(), date, routine, duration, notes });
    Storage.set('workouts', logs);
    this.closeLogModalBtn();
    this.renderHistory();
    this.renderChart();
    window.app.dashboard.render();
    toast('✅ Workout logged!');
  }
  renderHistory() {
    const logs = Storage.get('workouts', []).sort((a,b)=>new Date(b.date)-new Date(a.date));
    const el = document.getElementById('workoutHistory');
    if (!logs.length) { el.innerHTML = `<div class="empty-state"><div class="empty-icon">🏋️</div><p>No workouts logged yet.</p></div>`; return; }
    el.innerHTML = logs.map(l => `
      <div class="workout-log-item">
        <div class="log-icon">🏋️</div>
        <div class="log-info">
          <div class="log-name">${l.routine}</div>
          <div class="log-meta">${new Date(l.date).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}${l.notes?' · '+l.notes:''}</div>
        </div>
        <div class="log-dur">${l.duration} min</div>
        <button class="delete-btn" onclick="app.progressTracker.deleteLog(${l.id})">🗑</button>
      </div>`).join('');
  }
  deleteLog(id) {
    let logs = Storage.get('workouts', []);
    logs = logs.filter(l => l.id !== id);
    Storage.set('workouts', logs);
    this.renderHistory();
    this.renderChart();
    window.app.dashboard.render();
    toast('Log removed.');
  }
  renderChart() {
    this.renderHistory();
    const logs = Storage.get('workouts', []);
    const weeks = [];
    for (let i = 7; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i * 7);
      const start = new Date(d); start.setDate(start.getDate() - start.getDay());
      const end = new Date(start); end.setDate(end.getDate() + 6);
      const label = start.toLocaleDateString('en-US',{month:'short',day:'numeric'});
      const count = logs.filter(l => { const ld = new Date(l.date); return ld >= start && ld <= end; }).length;
      weeks.push({ label, count });
    }
    const ctx = document.getElementById('progressChart').getContext('2d');
    if (this.chart) this.chart.destroy();
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: weeks.map(w=>w.label),
        datasets: [{ label:'Workouts', data: weeks.map(w=>w.count), backgroundColor:'rgba(0,212,184,0.25)', borderColor:'rgba(0,212,184,0.9)', borderWidth:2, borderRadius:6 }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend:{ display:false } },
        scales: {
          x: { grid:{ color:'rgba(255,255,255,0.05)' }, ticks:{ color:'#8892a4', font:{ family:'Inter', size:11 } } },
          y: { grid:{ color:'rgba(255,255,255,0.05)' }, ticks:{ color:'#8892a4', stepSize:1, font:{ family:'Inter', size:11 } }, beginAtZero:true }
        }
      }
    });
  }
}

/* ---------- Nutrition Tracker ---------- */
class NutritionTracker {
  constructor() { this.editMode = false; }
  render() {
    const targets = Storage.get('nut_targets', { calories:2000, protein:150, carbs:250, fat:65 });
    document.getElementById('targetCalories').value = targets.calories;
    document.getElementById('targetProtein').value = targets.protein;
    document.getElementById('targetCarbs').value = targets.carbs;
    document.getElementById('targetFat').value = targets.fat;
    this.renderRings();
    this.renderMeals();
    this.renderHistory();
  }
  toggleTargetsEdit() {
    this.editMode = !this.editMode;
    document.getElementById('nutritionTargetsEdit').style.display = this.editMode ? '' : 'none';
    document.getElementById('nutritionTargetsDisplay').style.display = this.editMode ? 'none' : '';
  }
  saveTargets() {
    const targets = {
      calories: parseInt(document.getElementById('targetCalories').value)||2000,
      protein: parseInt(document.getElementById('targetProtein').value)||150,
      carbs: parseInt(document.getElementById('targetCarbs').value)||250,
      fat: parseInt(document.getElementById('targetFat').value)||65,
    };
    Storage.set('nut_targets', targets);
    this.toggleTargetsEdit();
    this.renderRings();
    toast('✅ Targets saved!');
  }
  getTodayMeals() {
    const today = new Date().toISOString().slice(0,10);
    return Storage.get('meals', []).filter(m => m.date === today);
  }
  renderRings() {
    const targets = Storage.get('nut_targets', { calories:2000, protein:150, carbs:250, fat:65 });
    const meals = this.getTodayMeals();
    const consumed = {
      calories: meals.reduce((a,m)=>a+(m.calories||0),0),
      protein: meals.reduce((a,m)=>a+(m.protein||0),0),
      carbs: meals.reduce((a,m)=>a+(m.carbs||0),0),
      fat: meals.reduce((a,m)=>a+(m.fat||0),0)
    };
    const fields = [
      { key:'calories', label:'Calories', color:'var(--orange)', unit:'kcal' },
      { key:'protein', label:'Protein', color:'var(--teal)', unit:'g' },
      { key:'carbs', label:'Carbs', color:'var(--purple)', unit:'g' },
      { key:'fat', label:'Fat', color:'var(--green)', unit:'g' },
    ];
    const r = 36; const circ = 2 * Math.PI * r;
    const ringsHtml = fields.map(f => {
      const pct = Math.min((consumed[f.key]||0) / (targets[f.key]||1), 1);
      const offset = (circ - pct * circ).toFixed(2);
      return `<div class="ring-wrapper">
        <svg class="ring-svg" viewBox="0 0 90 90">
          <circle class="ring-bg" cx="45" cy="45" r="${r}"/>
          <circle class="ring-fill" cx="45" cy="45" r="${r}" stroke="${f.color}" style="stroke-dasharray:${circ.toFixed(2)};stroke-dashoffset:${offset}"/>
        </svg>
        <div class="ring-values"><span class="ring-consumed" style="color:${f.color}">${consumed[f.key]||0}</span><span class="ring-target">of ${targets[f.key]} ${f.unit}</span></div>
        <div class="ring-label">${f.label}</div>
      </div>`;
    }).join('');
    const container = `<div class="macro-rings">${ringsHtml}</div>`;
    document.getElementById('nutritionTargetsDisplay').innerHTML = container;
    document.getElementById('macroRings').innerHTML = ringsHtml;
  }
  renderMeals() {
    const meals = this.getTodayMeals();
    const el = document.getElementById('todayMeals');
    if (!meals.length) { el.innerHTML=`<div class="empty-state"><div class="empty-icon">🥗</div><p>No meals logged today.</p></div>`; return; }
    const icons = ['🍳','🥗','🥩','🍱','🥛','🍎','🥜','🍚'];
    el.innerHTML = meals.map((m,i)=>`<div class="meal-item"><div class="meal-icon">${icons[i%icons.length]}</div><div class="meal-info"><div class="meal-name">${m.name}</div><div class="meal-macros">P: ${m.protein||0}g · C: ${m.carbs||0}g · F: ${m.fat||0}g</div></div><div class="meal-calories">${m.calories||0} kcal</div><button class="delete-btn" onclick="app.nutritionTracker.deleteMeal(${m.id})">🗑</button></div>`).join('');
  }
  renderHistory() {
    const all = Storage.get('meals', []);
    const byDate = {};
    all.forEach(m => { if (!byDate[m.date]) byDate[m.date] = []; byDate[m.date].push(m); });
    const dates = Object.keys(byDate).sort().reverse().slice(0,7);
    const el = document.getElementById('nutritionHistory');
    if (!dates.length) { el.innerHTML=`<div class="empty-state"><div class="empty-icon">📊</div><p>No history yet.</p></div>`; return; }
    el.innerHTML = dates.map(d => {
      const ms = byDate[d];
      const cals = ms.reduce((a,m)=>a+(m.calories||0),0);
      const prot = ms.reduce((a,m)=>a+(m.protein||0),0);
      const carbs = ms.reduce((a,m)=>a+(m.carbs||0),0);
      const fat = ms.reduce((a,m)=>a+(m.fat||0),0);
      return `<div class="nut-history-item"><div class="nut-history-date">${new Date(d).toLocaleDateString('en-US',{month:'short',day:'numeric'})}</div><div class="nut-history-cals">${cals} kcal</div><div class="nut-history-macros">P: ${prot}g · C: ${carbs}g · F: ${fat}g</div></div>`;
    }).join('');
  }
  openMealModal() {
    ['mealName','mealCalories','mealProtein','mealCarbs','mealFat'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('mealModal').classList.add('open');
  }
  closeMealModal(e) { if (e.target === document.getElementById('mealModal')) this.closeMealModalBtn(); }
  closeMealModalBtn() { document.getElementById('mealModal').classList.remove('open'); }
  saveMeal() {
    const name = document.getElementById('mealName').value.trim();
    if (!name) { toast('Please enter a meal name.', 'error'); return; }
    const meal = {
      id: Date.now(), date: new Date().toISOString().slice(0,10), name,
      calories: parseInt(document.getElementById('mealCalories').value)||0,
      protein: parseInt(document.getElementById('mealProtein').value)||0,
      carbs: parseInt(document.getElementById('mealCarbs').value)||0,
      fat: parseInt(document.getElementById('mealFat').value)||0,
    };
    const meals = Storage.get('meals', []);
    meals.push(meal);
    Storage.set('meals', meals);
    this.closeMealModalBtn();
    this.render();
    window.app.dashboard.render();
    toast('🥗 Meal logged!');
  }
  deleteMeal(id) {
    let meals = Storage.get('meals', []);
    meals = meals.filter(m => m.id !== id);
    Storage.set('meals', meals);
    this.render();
    window.app.dashboard.render();
    toast('Meal removed.');
  }
}

/* ---------- App ---------- */
class App {
  constructor() {
    this.router = new Router();
    this.dashboard = new Dashboard();
    this.routineGenerator = new RoutineGenerator();
    this.exerciseLibrary = new ExerciseLibrary();
    this.progressTracker = new ProgressTracker();
    this.nutritionTracker = new NutritionTracker();
    this.initNav();
    this.initMobileMenu();
    this.dashboard.render();
    this.exerciseLibrary.render();
  }
  initNav() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();
        this.router.navigate(item.dataset.section);
      });
    });
  }
  initMobileMenu() {
    document.getElementById('menuBtn').addEventListener('click', () => {
      document.getElementById('sidebar').classList.add('open');
      document.getElementById('sidebarOverlay').classList.add('open');
    });
  }
  closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('open');
  }
}

window.addEventListener('DOMContentLoaded', () => { window.app = new App(); });
