import React, { useState } from 'react'
import Dashboard from './components/Dashboard'

export default function App(){
  const [user] = useState({ user_id: 1, name: 'นักเรียนทดลอง', role_id: 3 }); // demo
  return (
    <div style={{fontFamily: 'Inter, Prompt, sans-serif', background:'#F8FAFC', minHeight:'100vh', padding:20}}>
      <div style={{maxWidth:1100, margin:'0 auto'}}>
        <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
          <h1 style={{fontSize:22}}>RegHub School</h1>
          <div>{user.name}</div>
        </header>
        <Dashboard user={user} />
      </div>
    </div>
  )
}
