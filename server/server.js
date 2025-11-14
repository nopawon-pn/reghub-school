const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');

const SECRET = process.env.JWT_SECRET || 'changeme_dev_secret';
const PORT = process.env.PORT || 4000;

const dbFile = process.env.DB_FILE || './db.sqlite3';
const db = new sqlite3.Database(dbFile);
const app = express();
app.use(cors());
app.use(bodyParser.json());

// helper: run SQL as Promise
function run(sql, params=[]) {
  return new Promise((res, rej) => db.run(sql, params, function(err){ if(err) rej(err); else res(this); }));
}
function all(sql, params=[]) {
  return new Promise((res, rej) => db.all(sql, params, (err, rows)=> err? rej(err): res(rows)));
}
function get(sql, params=[]) {
  return new Promise((res, rej) => db.get(sql, params, (err, row)=> err? rej(err): res(row)));
}

// Simple auth endpoints (demo-only)
app.post('/api/login', async (req,res)=>{
  const { username, password } = req.body;
  try{
    const user = await get('SELECT * FROM users WHERE username = ?', [username]);
    if(!user) return res.status(401).json({error:'ไม่พบผู้ใช้'});
    // demo: skip bcrypt if password_hash empty -> allow any
    if(!user.password_hash || user.password_hash === ''){
      const token = jwt.sign({ user_id: user.user_id, role_id: user.role_id }, SECRET);
      return res.json({ token, user: { user_id: user.user_id, name: user.name, role_id: user.role_id }});
    }
    const ok = await bcrypt.compare(password, user.password_hash);
    if(!ok) return res.status(401).json({error:'รหัสผ่านไม่ถูกต้อง'});
    const token = jwt.sign({ user_id: user.user_id, role_id: user.role_id }, SECRET);
    res.json({ token, user: { user_id: user.user_id, name: user.name, role_id: user.role_id }});
  }catch(err){ res.status(500).json({error:err.message}); }
});

// Public: list subjects & clubs
app.get('/api/subjects', async (req,res)=>{
  try{
    const subs = await all('SELECT s.*, u.name as teacher_name FROM subjects s LEFT JOIN users u ON u.user_id = s.teacher_id');
    res.json(subs);
  }catch(err){ res.status(500).json({error:err.message}); }
});
app.get('/api/clubs', async (req,res)=>{
  try{
    const rows = await all('SELECT c.*, u.name as advisor_name FROM clubs c LEFT JOIN users u ON u.user_id = c.advisor_id');
    res.json(rows);
  }catch(err){ res.status(500).json({error:err.message}); }
});

// Create registration (student)
app.post('/api/registrations', async (req,res)=>{
  const { student_id, subject_id, club_id } = req.body;
  try{
    await run('INSERT INTO registrations (student_id, subject_id, club_id, status) VALUES (?,?,?,?)', [student_id, subject_id || null, club_id || null, 'pending']);
    res.json({ ok:true });
  }catch(err){ res.status(500).json({ error: err.message }); }
});

// Teacher: list registrations for their subjects or clubs
app.get('/api/registrations/teacher/:teacher_id', async (req,res)=>{
  const tid = req.params.teacher_id;
  try{
    const rows = await all(`SELECT r.*, u.name as student_name, s.subject_name, c.club_name
      FROM registrations r
      LEFT JOIN users u ON u.user_id = r.student_id
      LEFT JOIN subjects s ON s.subject_id = r.subject_id
      LEFT JOIN clubs c ON c.club_id = r.club_id
      WHERE s.teacher_id = ? OR c.advisor_id = ?`, [tid, tid]);
    res.json(rows);
  }catch(err){ res.status(500).json({error:err.message}); }
});

// Teacher: approve
app.post('/api/registrations/:id/approve', async (req,res)=>{
  const id = req.params.id; const { approver_id, status } = req.body; // status: approved/rejected
  try{
    await run('UPDATE registrations SET status = ?, approved_by = ? WHERE reg_id = ?', [status, approver_id, id]);
    res.json({ ok:true });
  }catch(err){ res.status(500).json({error:err.message}); }
});

app.listen(PORT, ()=> console.log('Server running on', PORT));
