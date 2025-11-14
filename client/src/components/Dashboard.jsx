import React, { useEffect, useState } from 'react'
import api from '../api'
import SubjectList from './SubjectList'

export default function Dashboard({ user }){
  const [subjects, setSubjects] = useState([])
  const [clubs, setClubs] = useState([])

  useEffect(()=>{
    api.get('/subjects').then(r=> setSubjects(r.data)).catch(()=>setSubjects([]))
    api.get('/clubs').then(r=> setClubs(r.data)).catch(()=>setClubs([]))
  },[])

  return (
    <div style={{display:'grid', gridTemplateColumns: '2fr 1fr', gap:20}}>
      <div>
        <section style={{marginBottom:20}}>
          <h2>การลงทะเบียนของฉัน</h2>
          <div style={{padding:12, background:'#fff', borderRadius:8}}>ยังไม่มีรายการที่จะแสดง</div>
        </section>

        <section>
          <h3>รายวิชาและชุมนุมที่เปิดรับ</h3>
          <SubjectList subjects={subjects} clubs={clubs} user={user} />
        </section>
      </div>

      <aside style={{padding:16, background:'#fff', borderRadius:8}}>
        <h4>ข้อมูลด่วน</h4>
        <div style={{marginTop:8, fontSize:13, color:'#555'}}>สามารถดาวน์โหลดใบลงทะเบียนเป็น PDF ได้ (ฟีเจอร์เพิ่มเติม)</div>
      </aside>
    </div>
  )
}
