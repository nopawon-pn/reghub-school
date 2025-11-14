# RegHub School (starter)

โครงการตัวอย่างสำหรับระบบลงทะเบียนรายวิชาเพิ่มเติมและชุมนุม

## เนื้อหาในแพ็ก
- `server/` - Node.js + Express + SQLite (API)
- `client/` - React (Vite)

## รันแบบท้องถิ่น (local)
1. ติดตั้ง Node.js (v18+ แนะนำ)
2. เปิดเทอร์มินัลเปิดไดเรกทอรี `server`:
   ```bash
   cd server
   npm install
   npm run migrate   # ต้องมี sqlite3 CLI ในเครื่อง (หรือใช้วิธีอื่นสร้าง db.sqlite3)
   npm start
   ```
   เซิร์ฟเวอร์จะรันที่พอร์ต 4000

3. ในอีกเทอร์มินัล เปิด `client`:
   ```bash
   cd client
   npm install
   npm run dev
   ```
   แล้วเปิดเบราว์เซอร์ที่ http://localhost:5173

## Deploy (เร็ว ๆ)
- Backend: Render / Railway / Fly.io (เพิ่มไฟล์ Procfile / Dockerfile ถ้าต้องการ)
- Frontend: Vercel (ชี้โฟลเดอร์ `client` หรือเชื่อม GitHub และเลือก `client` เป็น root)

## หมายเหตุ
- โค้ดนี้เป็นตัวอย่างเริ่มต้น ใช้สำหรับทดสอบและต่อยอดเท่านั้น (มีการทำงานด้านความปลอดภัยแบบพื้นฐาน demo)
- ถ้าต้องการ ปันช่วยสร้าง repo GitHub และตั้งค่า Deploy ให้ครบขั้นตอนได้เลย
