import React from 'react'
import api from '../api'

export default function SubjectList({ subjects, clubs, user }){
  const choose = async (item, type) => {
    try{
      await api.post('/registrations', { student_id: user.user_id, subject_id: type==='subject'? item.subject_id: null, club_id: type==='club'? item.club_id: null })
      alert('ลงทะเบียนเรียบร้อย (สถานะ: รออนุมัติ)')
    }catch(err){ console.error(err); alert('เกิดข้อผิดพลาด') }
  }

  return (
    <div style={{background:'#fff', borderRadius:8, padding:12}}>
      <table style={{width:'100%', borderCollapse:'collapse'}}>
        <thead>
          <tr style={{textAlign:'left', borderBottom:'1px solid #eee'}}>
            <th style={{padding:8}}>วิชา/ชุมนุม</th>
            <th style={{padding:8}}>ครูผู้สอน</th>
            <th style={{padding:8}}>ที่ว่าง</th>
            <th style={{padding:8}}>เลือก</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map(s => (
            <tr key={s.subject_id} style={{borderBottom:'1px solid #f4f4f4'}}>
              <td style={{padding:8}}>{s.subject_name}</td>
              <td style={{padding:8}}>{s.teacher_name || '-'}</td>
              <td style={{padding:8}}>{s.capacity}</td>
              <td style={{padding:8}}><button onClick={()=>choose(s,'subject')}>เลือก</button></td>
            </tr>
          ))}

          {clubs.map(c => (
            <tr key={`c-${c.club_id}`} style={{borderBottom:'1px solid #f4f4f4'}}>
              <td style={{padding:8}}>{c.club_name}</td>
              <td style={{padding:8}}>{c.advisor_name || '-'}</td>
              <td style={{padding:8}}>{c.capacity}</td>
              <td style={{padding:8}}><button onClick={()=>choose(c,'club')}>เลือก</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
