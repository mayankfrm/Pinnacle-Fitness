/* ============================================================
   VitalArc — Data Layer: Exercises & Routine Templates
   ============================================================ */

const EXERCISES = [
  // CHEST
  { id:'bench_press', name:'Barbell Bench Press', emoji:'🏋️', muscle:'chest', equipment:'barbell', difficulty:'intermediate',
    sets:'4', reps:'6-10', rest:'90s', desc:'The king of chest exercises. Lie flat on a bench, grip the bar slightly wider than shoulder-width, lower to chest and press up explosively.',
    tips:['Keep feet flat on the floor','Retract your shoulder blades and arch your lower back slightly','Control the descent — 2-3 seconds down','Bar should touch mid-chest, not neck'] },
  { id:'incline_db_press', name:'Incline Dumbbell Press', emoji:'💪', muscle:'chest', equipment:'dumbbell', difficulty:'intermediate',
    sets:'3', reps:'8-12', rest:'75s', desc:'Targets the upper chest. Set the bench to 30-45 degrees, press dumbbells from shoulder level upward.',
    tips:['Keep elbows at 60° from body, not flared wide','Squeeze chest at the top','Go through full range of motion'] },
  { id:'push_up', name:'Push Up', emoji:'🤸', muscle:'chest', equipment:'bodyweight', difficulty:'beginner',
    sets:'3', reps:'10-20', rest:'60s', desc:'Classic bodyweight chest exercise. Maintain a rigid plank position, lower chest to ground and push back up.',
    tips:['Core tight throughout','Hands slightly wider than shoulders','Full range of motion — chest near floor'] },
  { id:'cable_fly', name:'Cable Chest Fly', emoji:'⚡', muscle:'chest', equipment:'cables', difficulty:'intermediate',
    sets:'3', reps:'12-15', rest:'60s', desc:'Isolation movement for chest. Stand between cables, pull handles together in a hugging arc.',
    tips:['Slight bend in elbows throughout','Focus on squeezing chest, not pulling with arms','Control the return'] },
  { id:'dips', name:'Chest Dips', emoji:'🔥', muscle:'chest', equipment:'bodyweight', difficulty:'intermediate',
    sets:'3', reps:'8-15', rest:'75s', desc:'Lean forward slightly to target chest. Lower until shoulders are below elbows, press back up.',
    tips:['Lean torso forward for chest focus','Control the descent','Lock out elbows at top'] },
  // BACK
  { id:'pull_up', name:'Pull Up', emoji:'🧗', muscle:'back', equipment:'bodyweight', difficulty:'intermediate',
    sets:'4', reps:'5-12', rest:'90s', desc:'Foundational upper-body pulling movement. Hang from bar, pull chest to bar leading with elbows.',
    tips:['Start from dead hang','Drive elbows down and back','Think "chest to bar"','Use full range of motion'] },
  { id:'barbell_row', name:'Barbell Bent-Over Row', emoji:'🏋️', muscle:'back', equipment:'barbell', difficulty:'intermediate',
    sets:'4', reps:'6-10', rest:'90s', desc:'Hinge at hips, keep back flat, row bar to lower chest. Excellent for overall back thickness.',
    tips:['Keep spine neutral, not rounded','Pull to lower chest/belly button','Squeeze shoulder blades together'] },
  { id:'lat_pulldown', name:'Lat Pulldown', emoji:'⬇️', muscle:'back', equipment:'machine', difficulty:'beginner',
    sets:'3', reps:'10-12', rest:'75s', desc:'Machine version of pull-ups. Pull bar down to upper chest while leaning back slightly.',
    tips:['Depress shoulders before pulling','Drive elbows down, not back','Control the return'] },
  { id:'db_row', name:'Dumbbell Row', emoji:'💪', muscle:'back', equipment:'dumbbell', difficulty:'beginner',
    sets:'3', reps:'10-15', rest:'60s', desc:'Single-arm row for lat and mid-back development. Support on bench, row dumbbell to hip.',
    tips:['Keep hips square','Row to hip, not shoulder','Full stretch at the bottom'] },
  { id:'deadlift', name:'Deadlift', emoji:'🏆', muscle:'back', equipment:'barbell', difficulty:'advanced',
    sets:'4', reps:'4-6', rest:'120s', desc:'The ultimate full-body strength exercise. Hinge and pull bar from floor to hip lockout.',
    tips:['Bar over mid-foot at setup','Push floor away, do not jerk','Hinge hips back to lower bar'] },
  // LEGS
  { id:'squat', name:'Barbell Back Squat', emoji:'🦵', muscle:'legs', equipment:'barbell', difficulty:'intermediate',
    sets:'4', reps:'6-10', rest:'120s', desc:'King of lower-body exercises. Bar on traps, squat to parallel or below, drive through heels.',
    tips:['Knees track over toes','Chest up, core braced','Break parallel for full activation','Drive knees out'] },
  { id:'rdl', name:'Romanian Deadlift', emoji:'⬇️', muscle:'legs', equipment:'barbell', difficulty:'intermediate',
    sets:'3', reps:'8-12', rest:'90s', desc:'Hip hinge movement targeting hamstrings and glutes. Keep legs mostly straight, hinge until stretch felt.',
    tips:['Keep bar close to legs','Feel hamstring stretch','Squeeze glutes to return','Keep back flat'] },
  { id:'leg_press', name:'Leg Press', emoji:'🦿', muscle:'legs', equipment:'machine', difficulty:'beginner',
    sets:'3', reps:'10-15', rest:'75s', desc:'Machine quad and glute builder. Press platform away without locking knees at the top.',
    tips:['Feet at shoulder-width','Go deep — past 90°','Do not lock knees out','Keep lower back on pad'] },
  { id:'lunges', name:'Walking Lunges', emoji:'🚶', muscle:'legs', equipment:'bodyweight', difficulty:'beginner',
    sets:'3', reps:'12 each leg', rest:'60s', desc:'Step forward into a lunge, bring feet together and repeat. Targets quads, glutes and balance.',
    tips:['Front knee stays over ankle','Keep torso upright','Drive through front heel to stand'] },
  { id:'goblet_squat', name:'Goblet Squat', emoji:'🏺', muscle:'legs', equipment:'dumbbell', difficulty:'beginner',
    sets:'3', reps:'12-15', rest:'60s', desc:'Hold dumbbell at chest, squat deep. Excellent for beginners learning squat mechanics.',
    tips:['Elbows track inside knees','Full depth — thighs parallel','Keep weight in heels and mid-foot'] },
  { id:'calf_raise', name:'Standing Calf Raise', emoji:'🦶', muscle:'legs', equipment:'bodyweight', difficulty:'beginner',
    sets:'4', reps:'15-20', rest:'45s', desc:'Rise onto toes, hold, lower slowly. Works the gastrocnemius and soleus.',
    tips:['Full range of motion','Hold peak contraction 1 second','Slow controlled descent'] },
  // SHOULDERS
  { id:'ohp', name:'Overhead Press', emoji:'🙌', muscle:'shoulders', equipment:'barbell', difficulty:'intermediate',
    sets:'4', reps:'6-10', rest:'90s', desc:'Press bar from shoulders overhead to full lockout. The premier shoulder mass builder.',
    tips:['Bar starts at collarbone','Keep core tight and glutes squeezed','Elbows slightly forward of bar'] },
  { id:'db_lateral', name:'Dumbbell Lateral Raise', emoji:'↔️', muscle:'shoulders', equipment:'dumbbell', difficulty:'beginner',
    sets:'3', reps:'12-15', rest:'60s', desc:'Elevate dumbbells to sides to shoulder height. Isolates the lateral deltoid for width.',
    tips:['Slight bend in elbow','Lead with elbow, not wrist','Control the descent — 3 seconds'] },
  { id:'face_pull', name:'Face Pull', emoji:'🎯', muscle:'shoulders', equipment:'cables', difficulty:'beginner',
    sets:'3', reps:'15-20', rest:'45s', desc:'Cable pulled to face level, elbows flared high. Vital for rear delt and rotator cuff health.',
    tips:['Pull to forehead — not chin','Elbows above wrists and shoulders','External rotate at the end'] },
  // ARMS
  { id:'barbell_curl', name:'Barbell Curl', emoji:'💪', muscle:'arms', equipment:'barbell', difficulty:'beginner',
    sets:'3', reps:'8-12', rest:'60s', desc:'Classic bicep builder. Keep elbows at sides, curl bar to chin, lower controlled.',
    tips:['No swinging — strict form','Squeeze at top','Full extension at bottom'] },
  { id:'tricep_pushdown', name:'Tricep Pushdown', emoji:'⬇️', muscle:'arms', equipment:'cables', difficulty:'beginner',
    sets:'3', reps:'10-15', rest:'60s', desc:'Cable pushdown isolating the triceps. Keep upper arms stationary, push down to lockout.',
    tips:['Lock elbows to sides','Full extension at bottom','Control the return'] },
  { id:'db_curl', name:'Dumbbell Hammer Curl', emoji:'🔨', muscle:'arms', equipment:'dumbbell', difficulty:'beginner',
    sets:'3', reps:'10-15', rest:'60s', desc:'Neutral grip curl hitting biceps and brachialis for arm thickness.',
    tips:['Keep thumbs up','No swinging','Alternate or both arms'] },
  { id:'skull_crusher', name:'Skull Crusher', emoji:'💀', muscle:'arms', equipment:'barbell', difficulty:'intermediate',
    sets:'3', reps:'10-12', rest:'60s', desc:'Lying tricep extension. Lower bar to forehead, extend to lockout.',
    tips:['Keep upper arms perpendicular to floor','Control descent','Elbows pointing to ceiling'] },
  // CORE
  { id:'plank', name:'Plank', emoji:'🪵', muscle:'core', equipment:'bodyweight', difficulty:'beginner',
    sets:'3', reps:'30-60s hold', rest:'45s', desc:'Hold a push-up position with forearms on the ground. Total core stability exercise.',
    tips:['Hips level — no sag or pike','Squeeze every muscle','Breathe steadily'] },
  { id:'crunch', name:'Crunch', emoji:'🌀', muscle:'core', equipment:'bodyweight', difficulty:'beginner',
    sets:'3', reps:'15-25', rest:'45s', desc:'Lie on back, curl shoulders toward knees. Basic abdominal exercise.',
    tips:['Hands behind head, not pulling neck','Focus on contracting abs','Short range of motion — no full sit-up needed'] },
  { id:'leg_raise', name:'Hanging Leg Raise', emoji:'🦵', muscle:'core', equipment:'bodyweight', difficulty:'advanced',
    sets:'3', reps:'10-15', rest:'60s', desc:'Hang from bar, raise straight legs to parallel. Targets lower abs.',
    tips:['Control the swing','Full hang, no kipping','Tuck if too difficult'] },
  { id:'ab_wheel', name:'Ab Wheel Rollout', emoji:'🔄', muscle:'core', equipment:'bodyweight', difficulty:'advanced',
    sets:'3', reps:'8-12', rest:'60s', desc:'Roll wheel out from kneeling position, extend body and pull back. Extreme core challenge.',
    tips:['Start from knees','Go as far as you can maintain control','Squeeze core and glutes throughout'] },
  // CARDIO
  { id:'hiit_sprint', name:'HIIT Sprint Intervals', emoji:'🏃', muscle:'cardio', equipment:'bodyweight', difficulty:'intermediate',
    sets:'8', reps:'20s sprint / 40s walk', rest:'—', desc:'Alternate between maximum effort sprints and recovery walks. Excellent for fat loss.',
    tips:['Warm up 5 min first','Go all-out during sprints','Stay consistent with intervals'] },
  { id:'jump_rope', name:'Jump Rope', emoji:'🪢', muscle:'cardio', equipment:'bodyweight', difficulty:'beginner',
    sets:'5', reps:'1 min on / 30s off', rest:'30s', desc:'Skipping rope for cardiovascular fitness and coordination.',
    tips:['Land on balls of feet','Keep elbows close to body','Start slow, build speed'] },
  { id:'rowing', name:'Rowing Machine', emoji:'🚣', muscle:'cardio', equipment:'machine', difficulty:'beginner',
    sets:'1', reps:'20 min steady state', rest:'—', desc:'Low-impact full-body cardio. Drive with legs, lean back, then pull handle to chest.',
    tips:['Legs → lean back → arms (in sequence)','Maintain 24-28 strokes per minute','Keep back straight'] },
  { id:'battle_ropes', name:'Battle Ropes', emoji:'🌊', muscle:'cardio', equipment:'machine', difficulty:'intermediate',
    sets:'5', reps:'30s on / 30s rest', rest:'30s', desc:'Alternating or simultaneous rope waves for conditioning and upper-body endurance.',
    tips:['Keep core tight','Use whole body — not just arms','Vary patterns: waves, slams, circles'] },
];

/* ============================================================
   ROUTINE TEMPLATES
   key: `${goal}_${level}_${days}`
   ============================================================ */
const ROUTINE_TEMPLATES = {
  // ---- WEIGHT LOSS ----
  weight_loss_beginner_3: { name:'Fat Burn Starter — 3 Day Full Body', desc:'3-day full body circuit to kickstart fat loss. High reps, short rests.', days:[
    { focus:'Full Body + Cardio', exercises:[{id:'push_up'},{id:'goblet_squat'},{id:'db_row'},{id:'plank'},{id:'jump_rope'}] },
    { focus:'Full Body + Core', exercises:[{id:'lunges'},{id:'db_curl'},{id:'tricep_pushdown'},{id:'crunch'},{id:'hiit_sprint'}] },
    { focus:'Full Body Circuit', exercises:[{id:'lat_pulldown'},{id:'leg_press'},{id:'db_lateral'},{id:'plank'},{id:'jump_rope'}] },
  ]},
  weight_loss_beginner_4: { name:'Fat Burn Starter — 4 Day Split', desc:'Upper/Lower split focused on calorie burn and conditioning.',days:[
    { focus:'Upper Body + Cardio', exercises:[{id:'push_up'},{id:'db_row'},{id:'db_lateral'},{id:'db_curl'},{id:'jump_rope'}] },
    { focus:'Lower Body + Core', exercises:[{id:'goblet_squat'},{id:'lunges'},{id:'calf_raise'},{id:'plank'},{id:'crunch'}] },
    { focus:'Upper Body + HIIT', exercises:[{id:'lat_pulldown'},{id:'incline_db_press'},{id:'tricep_pushdown'},{id:'face_pull'},{id:'hiit_sprint'}] },
    { focus:'Lower Body + Cardio', exercises:[{id:'leg_press'},{id:'rdl'},{id:'leg_raise'},{id:'jump_rope'},{id:'rowing'}] },
  ]},
  weight_loss_beginner_5: { name:'Fat Burn Starter — 5 Day', desc:'Daily sessions targeting fat loss through high-volume training.',days:[
    { focus:'Chest & Triceps', exercises:[{id:'push_up'},{id:'incline_db_press'},{id:'cable_fly'},{id:'tricep_pushdown'},{id:'crunch'}] },
    { focus:'Back & Biceps', exercises:[{id:'lat_pulldown'},{id:'db_row'},{id:'db_curl'},{id:'face_pull'},{id:'plank'}] },
    { focus:'Cardio & Core', exercises:[{id:'hiit_sprint'},{id:'jump_rope'},{id:'plank'},{id:'crunch'},{id:'leg_raise'}] },
    { focus:'Legs', exercises:[{id:'goblet_squat'},{id:'lunges'},{id:'leg_press'},{id:'calf_raise'},{id:'rdl'}] },
    { focus:'Shoulders & HIIT', exercises:[{id:'db_lateral'},{id:'ohp'},{id:'face_pull'},{id:'battle_ropes'},{id:'rowing'}] },
  ]},
  weight_loss_intermediate_3: { name:'Shred Protocol — 3 Day', desc:'3-day fat shredding routine combining compound lifts with cardio finishers.',days:[
    { focus:'Push + HIIT Finisher', exercises:[{id:'bench_press'},{id:'incline_db_press'},{id:'ohp'},{id:'cable_fly'},{id:'hiit_sprint'}] },
    { focus:'Pull + Core', exercises:[{id:'barbell_row'},{id:'pull_up'},{id:'db_row'},{id:'barbell_curl'},{id:'ab_wheel'}] },
    { focus:'Legs + Cardio', exercises:[{id:'squat'},{id:'rdl'},{id:'leg_press'},{id:'lunges'},{id:'jump_rope'}] },
  ]},
  weight_loss_intermediate_4: { name:'Shred Protocol — 4 Day', desc:'Upper/Lower split with cardio finishers for maximum fat loss.',days:[
    { focus:'Upper Push + Cardio', exercises:[{id:'bench_press'},{id:'incline_db_press'},{id:'ohp'},{id:'tricep_pushdown'},{id:'battle_ropes'}] },
    { focus:'Upper Pull + Core', exercises:[{id:'pull_up'},{id:'barbell_row'},{id:'face_pull'},{id:'barbell_curl'},{id:'ab_wheel'}] },
    { focus:'Lower + HIIT', exercises:[{id:'squat'},{id:'rdl'},{id:'goblet_squat'},{id:'calf_raise'},{id:'hiit_sprint'}] },
    { focus:'Full Body Circuit', exercises:[{id:'deadlift'},{id:'push_up'},{id:'db_row'},{id:'lunges'},{id:'rowing'}] },
  ]},
  weight_loss_intermediate_5: { name:'Shred Protocol — 5 Day', desc:'5-day fat loss programme with dedicated cardio sessions.',days:[
    { focus:'Chest', exercises:[{id:'bench_press'},{id:'incline_db_press'},{id:'cable_fly'},{id:'dips'},{id:'push_up'}] },
    { focus:'Back', exercises:[{id:'pull_up'},{id:'barbell_row'},{id:'lat_pulldown'},{id:'db_row'},{id:'deadlift'}] },
    { focus:'Cardio & HIIT', exercises:[{id:'hiit_sprint'},{id:'battle_ropes'},{id:'jump_rope'},{id:'rowing'},{id:'plank'}] },
    { focus:'Legs', exercises:[{id:'squat'},{id:'rdl'},{id:'leg_press'},{id:'lunges'},{id:'calf_raise'}] },
    { focus:'Shoulders & Arms', exercises:[{id:'ohp'},{id:'db_lateral'},{id:'face_pull'},{id:'barbell_curl'},{id:'skull_crusher'}] },
  ]},
  weight_loss_advanced_3: { name:'Elite Cut — 3 Day', desc:'Advanced 3-day fat-loss programme with heavy compound lifts and intense cardio.',days:[
    { focus:'Push Heavy + HIIT', exercises:[{id:'bench_press'},{id:'ohp'},{id:'incline_db_press'},{id:'skull_crusher'},{id:'hiit_sprint'}] },
    { focus:'Pull Heavy + Core', exercises:[{id:'deadlift'},{id:'pull_up'},{id:'barbell_row'},{id:'barbell_curl'},{id:'ab_wheel'}] },
    { focus:'Legs Heavy + Cardio', exercises:[{id:'squat'},{id:'rdl'},{id:'leg_press'},{id:'calf_raise'},{id:'battle_ropes'}] },
  ]},
  weight_loss_advanced_4: { name:'Elite Cut — 4 Day', desc:'Advanced 4-day upper/lower with max intensity.',days:[
    { focus:'Upper Heavy + HIIT', exercises:[{id:'bench_press'},{id:'barbell_row'},{id:'ohp'},{id:'pull_up'},{id:'battle_ropes'}] },
    { focus:'Lower Heavy + Core', exercises:[{id:'squat'},{id:'deadlift'},{id:'rdl'},{id:'lunges'},{id:'ab_wheel'}] },
    { focus:'Upper Hypertrophy', exercises:[{id:'incline_db_press'},{id:'cable_fly'},{id:'db_lateral'},{id:'barbell_curl'},{id:'skull_crusher'}] },
    { focus:'Lower Hypertrophy + HIIT', exercises:[{id:'leg_press'},{id:'goblet_squat'},{id:'calf_raise'},{id:'jump_rope'},{id:'hiit_sprint'}] },
  ]},
  weight_loss_advanced_5: { name:'Elite Cut — 5 Day', desc:'5-day advanced shred programme.',days:[
    { focus:'Chest Heavy', exercises:[{id:'bench_press'},{id:'incline_db_press'},{id:'cable_fly'},{id:'dips'},{id:'push_up'}] },
    { focus:'Back Heavy', exercises:[{id:'deadlift'},{id:'pull_up'},{id:'barbell_row'},{id:'lat_pulldown'},{id:'face_pull'}] },
    { focus:'Legs Heavy', exercises:[{id:'squat'},{id:'rdl'},{id:'leg_press'},{id:'lunges'},{id:'calf_raise'}] },
    { focus:'Shoulders & Arms', exercises:[{id:'ohp'},{id:'db_lateral'},{id:'barbell_curl'},{id:'skull_crusher'},{id:'ab_wheel'}] },
    { focus:'Full Body HIIT', exercises:[{id:'hiit_sprint'},{id:'battle_ropes'},{id:'rowing'},{id:'jump_rope'},{id:'plank'}] },
  ]},
  // ---- MUSCLE GAIN ----
  muscle_gain_beginner_3: { name:'Mass Builder — 3 Day Full Body', desc:'3-day full body programme to build foundational muscle and strength.',days:[
    { focus:'Full Body A', exercises:[{id:'squat'},{id:'bench_press'},{id:'barbell_row'},{id:'db_lateral'},{id:'plank'}] },
    { focus:'Full Body B', exercises:[{id:'rdl'},{id:'incline_db_press'},{id:'lat_pulldown'},{id:'barbell_curl'},{id:'crunch'}] },
    { focus:'Full Body C', exercises:[{id:'leg_press'},{id:'dips'},{id:'db_row'},{id:'ohp'},{id:'calf_raise'}] },
  ]},
  muscle_gain_beginner_4: { name:'Mass Builder — 4 Day Upper/Lower', desc:'Classic upper/lower split for beginner hypertrophy.',days:[
    { focus:'Upper A', exercises:[{id:'bench_press'},{id:'barbell_row'},{id:'ohp'},{id:'barbell_curl'},{id:'tricep_pushdown'}] },
    { focus:'Lower A', exercises:[{id:'squat'},{id:'rdl'},{id:'leg_press'},{id:'calf_raise'},{id:'plank'}] },
    { focus:'Upper B', exercises:[{id:'incline_db_press'},{id:'lat_pulldown'},{id:'db_lateral'},{id:'db_curl'},{id:'dips'}] },
    { focus:'Lower B', exercises:[{id:'goblet_squat'},{id:'lunges'},{id:'rdl'},{id:'calf_raise'},{id:'crunch'}] },
  ]},
  muscle_gain_beginner_5: { name:'Mass Builder — 5 Day Bro Split', desc:'Classic 5-day body-part split for a beginner.',days:[
    { focus:'Chest', exercises:[{id:'bench_press'},{id:'incline_db_press'},{id:'cable_fly'},{id:'dips'},{id:'push_up'}] },
    { focus:'Back', exercises:[{id:'barbell_row'},{id:'lat_pulldown'},{id:'db_row'},{id:'pull_up'},{id:'face_pull'}] },
    { focus:'Legs', exercises:[{id:'squat'},{id:'rdl'},{id:'leg_press'},{id:'lunges'},{id:'calf_raise'}] },
    { focus:'Shoulders', exercises:[{id:'ohp'},{id:'db_lateral'},{id:'face_pull'},{id:'crunch'},{id:'plank'}] },
    { focus:'Arms', exercises:[{id:'barbell_curl'},{id:'db_curl'},{id:'skull_crusher'},{id:'tricep_pushdown'},{id:'ab_wheel'}] },
  ]},
  muscle_gain_intermediate_3: { name:'Hypertrophy 3 Day PPL', desc:'Push/Pull/Legs for intermediate muscle building.',days:[
    { focus:'Push', exercises:[{id:'bench_press'},{id:'ohp'},{id:'incline_db_press'},{id:'cable_fly'},{id:'skull_crusher'}] },
    { focus:'Pull', exercises:[{id:'deadlift'},{id:'pull_up'},{id:'barbell_row'},{id:'face_pull'},{id:'barbell_curl'}] },
    { focus:'Legs', exercises:[{id:'squat'},{id:'rdl'},{id:'leg_press'},{id:'lunges'},{id:'calf_raise'}] },
  ]},
  muscle_gain_intermediate_4: { name:'Hypertrophy 4 Day Upper/Lower', desc:'Intensity-focused upper/lower split.',days:[
    { focus:'Upper Strength', exercises:[{id:'bench_press'},{id:'barbell_row'},{id:'ohp'},{id:'pull_up'},{id:'barbell_curl'}] },
    { focus:'Lower Strength', exercises:[{id:'squat'},{id:'deadlift'},{id:'rdl'},{id:'calf_raise'},{id:'plank'}] },
    { focus:'Upper Hypertrophy', exercises:[{id:'incline_db_press'},{id:'cable_fly'},{id:'db_lateral'},{id:'db_curl'},{id:'tricep_pushdown'}] },
    { focus:'Lower Hypertrophy', exercises:[{id:'leg_press'},{id:'rdl'},{id:'goblet_squat'},{id:'lunges'},{id:'ab_wheel'}] },
  ]},
  muscle_gain_intermediate_5: { name:'Hypertrophy 5 Day PPL+', desc:'PPL with specialisation days for max muscle growth.',days:[
    { focus:'Push', exercises:[{id:'bench_press'},{id:'ohp'},{id:'incline_db_press'},{id:'cable_fly'},{id:'skull_crusher'}] },
    { focus:'Pull', exercises:[{id:'pull_up'},{id:'barbell_row'},{id:'lat_pulldown'},{id:'db_row'},{id:'barbell_curl'}] },
    { focus:'Legs', exercises:[{id:'squat'},{id:'rdl'},{id:'leg_press'},{id:'lunges'},{id:'calf_raise'}] },
    { focus:'Shoulders & Arms', exercises:[{id:'ohp'},{id:'db_lateral'},{id:'face_pull'},{id:'db_curl'},{id:'tricep_pushdown'}] },
    { focus:'Chest & Back', exercises:[{id:'incline_db_press'},{id:'cable_fly'},{id:'dips'},{id:'deadlift'},{id:'face_pull'}] },
  ]},
  muscle_gain_advanced_3: { name:'Strength & Size — 3 Day', desc:'Heavy compound + volume accessory for advanced lifters.',days:[
    { focus:'Push Heavy', exercises:[{id:'bench_press'},{id:'ohp'},{id:'incline_db_press'},{id:'cable_fly'},{id:'skull_crusher'}] },
    { focus:'Pull Heavy', exercises:[{id:'deadlift'},{id:'barbell_row'},{id:'pull_up'},{id:'face_pull'},{id:'barbell_curl'}] },
    { focus:'Legs Heavy', exercises:[{id:'squat'},{id:'rdl'},{id:'leg_press'},{id:'lunges'},{id:'calf_raise'}] },
  ]},
  muscle_gain_advanced_4: { name:'Strength & Size — 4 Day', desc:'Upper/lower with heavy loading for advanced hypertrophy.',days:[
    { focus:'Upper Heavy', exercises:[{id:'bench_press'},{id:'barbell_row'},{id:'ohp'},{id:'pull_up'},{id:'barbell_curl'}] },
    { focus:'Lower Heavy', exercises:[{id:'squat'},{id:'deadlift'},{id:'rdl'},{id:'calf_raise'},{id:'ab_wheel'}] },
    { focus:'Upper Volume', exercises:[{id:'incline_db_press'},{id:'cable_fly'},{id:'db_lateral'},{id:'skull_crusher'},{id:'face_pull'}] },
    { focus:'Lower Volume', exercises:[{id:'leg_press'},{id:'rdl'},{id:'goblet_squat'},{id:'lunges'},{id:'plank'}] },
  ]},
  muscle_gain_advanced_5: { name:'Strength & Size — 5 Day', desc:'Advanced 5-day programme with high frequency and volume.',days:[
    { focus:'Chest', exercises:[{id:'bench_press'},{id:'incline_db_press'},{id:'cable_fly'},{id:'dips'},{id:'push_up'}] },
    { focus:'Back', exercises:[{id:'deadlift'},{id:'barbell_row'},{id:'pull_up'},{id:'lat_pulldown'},{id:'db_row'}] },
    { focus:'Legs', exercises:[{id:'squat'},{id:'rdl'},{id:'leg_press'},{id:'lunges'},{id:'calf_raise'}] },
    { focus:'Shoulders', exercises:[{id:'ohp'},{id:'db_lateral'},{id:'face_pull'},{id:'cable_fly'},{id:'ab_wheel'}] },
    { focus:'Arms', exercises:[{id:'barbell_curl'},{id:'db_curl'},{id:'skull_crusher'},{id:'tricep_pushdown'},{id:'plank'}] },
  ]},
  // ---- ENDURANCE ----
  endurance_beginner_3: { name:'Endurance Base Builder — 3 Day', desc:'Build aerobic capacity and muscular endurance.',days:[
    { focus:'Cardio & Core', exercises:[{id:'jump_rope'},{id:'hiit_sprint'},{id:'plank'},{id:'crunch'},{id:'leg_raise'}] },
    { focus:'Circuit Training', exercises:[{id:'push_up'},{id:'goblet_squat'},{id:'db_row'},{id:'lunges'},{id:'rowing'}] },
    { focus:'Endurance Cardio', exercises:[{id:'rowing'},{id:'battle_ropes'},{id:'jump_rope'},{id:'plank'},{id:'hiit_sprint'}] },
  ]},
  endurance_intermediate_4: { name:'Endurance Protocol — 4 Day', desc:'Build stamina with mixed cardio and strength endurance.',days:[
    { focus:'HIIT + Core', exercises:[{id:'hiit_sprint'},{id:'battle_ropes'},{id:'plank'},{id:'ab_wheel'},{id:'leg_raise'}] },
    { focus:'Strength Endurance Upper', exercises:[{id:'push_up'},{id:'pull_up'},{id:'db_row'},{id:'db_lateral'},{id:'jump_rope'}] },
    { focus:'Strength Endurance Lower', exercises:[{id:'goblet_squat'},{id:'lunges'},{id:'rdl'},{id:'calf_raise'},{id:'rowing'}] },
    { focus:'Cardio Blast', exercises:[{id:'rowing'},{id:'jump_rope'},{id:'battle_ropes'},{id:'hiit_sprint'},{id:'plank'}] },
  ]},
  endurance_advanced_5: { name:'Elite Endurance — 5 Day', desc:'Advanced endurance training for peak cardiovascular fitness.',days:[
    { focus:'HIIT Sprint Training', exercises:[{id:'hiit_sprint'},{id:'battle_ropes'},{id:'jump_rope'},{id:'ab_wheel'},{id:'plank'}] },
    { focus:'Upper Endurance Circuit', exercises:[{id:'pull_up'},{id:'push_up'},{id:'face_pull'},{id:'barbell_curl'},{id:'rowing'}] },
    { focus:'Lower Endurance Circuit', exercises:[{id:'squat'},{id:'lunges'},{id:'rdl'},{id:'calf_raise'},{id:'leg_raise'}] },
    { focus:'Steady State Cardio', exercises:[{id:'rowing'},{id:'jump_rope'},{id:'plank'},{id:'crunch'},{id:'ab_wheel'}] },
    { focus:'Full Body Blast', exercises:[{id:'deadlift'},{id:'push_up'},{id:'battle_ropes'},{id:'goblet_squat'},{id:'hiit_sprint'}] },
  ]},
  // ---- FLEXIBILITY ----
  flexibility_beginner_3: { name:'Flex & Mobility — 3 Day', desc:'Improve flexibility and joint mobility with dynamic training.',days:[
    { focus:'Full Body Mobility + Core', exercises:[{id:'push_up'},{id:'goblet_squat'},{id:'lunges'},{id:'plank'},{id:'crunch'}] },
    { focus:'Lower Body + Stretch Flow', exercises:[{id:'rdl'},{id:'leg_raise'},{id:'goblet_squat'},{id:'calf_raise'},{id:'plank'}] },
    { focus:'Upper Body + Cardio', exercises:[{id:'push_up'},{id:'db_row'},{id:'db_lateral'},{id:'jump_rope'},{id:'ab_wheel'}] },
  ]},
  flexibility_intermediate_4: { name:'Flex & Strength — 4 Day', desc:'Balance flexibility with functional strength.',days:[
    { focus:'Upper Body Mobility', exercises:[{id:'face_pull'},{id:'db_lateral'},{id:'push_up'},{id:'db_row'},{id:'plank'}] },
    { focus:'Lower Body Mobility', exercises:[{id:'goblet_squat'},{id:'rdl'},{id:'lunges'},{id:'calf_raise'},{id:'leg_raise'}] },
    { focus:'Core & Stability', exercises:[{id:'plank'},{id:'crunch'},{id:'ab_wheel'},{id:'leg_raise'},{id:'jump_rope'}] },
    { focus:'Full Body Flow', exercises:[{id:'pull_up'},{id:'squat'},{id:'push_up'},{id:'rdl'},{id:'battle_ropes'}] },
  ]},
  flexibility_advanced_5: { name:'Elite Flex & Power — 5 Day', desc:'Advanced mobility and performance programme.',days:[
    { focus:'Upper Strength + Mobility', exercises:[{id:'ohp'},{id:'pull_up'},{id:'face_pull'},{id:'db_lateral'},{id:'plank'}] },
    { focus:'Lower Strength + Mobility', exercises:[{id:'squat'},{id:'rdl'},{id:'lunges'},{id:'calf_raise'},{id:'leg_raise'}] },
    { focus:'Core Power', exercises:[{id:'deadlift'},{id:'ab_wheel'},{id:'leg_raise'},{id:'plank'},{id:'crunch'}] },
    { focus:'Cardio + Flexibility Flow', exercises:[{id:'hiit_sprint'},{id:'jump_rope'},{id:'battle_ropes'},{id:'rowing'},{id:'goblet_squat'}] },
    { focus:'Full Body Integration', exercises:[{id:'bench_press'},{id:'barbell_row'},{id:'squat'},{id:'db_lateral'},{id:'face_pull'}] },
  ]},
};

// Fallback for combinations not explicitly defined
function getFallbackKey(goal, level, days) {
  const keysForGoal = Object.keys(ROUTINE_TEMPLATES).filter(k => k.startsWith(goal + '_'));
  if (keysForGoal.length > 0) {
    const matchLevel = keysForGoal.find(k => k.includes(`_${level}_`));
    if (matchLevel) return matchLevel;
    const matchDays = keysForGoal.find(k => k.endsWith(`_${days}`));
    if (matchDays) return matchDays;
    return keysForGoal[0];
  }
  return 'muscle_gain_beginner_3';
}
