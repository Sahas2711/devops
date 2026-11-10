'use strict';
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const PORT=Number(process.env.PORT||3000),HOST=process.env.HOST||'0.0.0.0';
const students=[];let nextId=1;
function json(res,status,data){const body=JSON.stringify(data);res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Content-Length':Buffer.byteLength(body),'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(body);}
function readBody(req){return new Promise((resolve,reject)=>{let body='';req.on('data',c=>{body+=c;if(body.length>1048576){reject(Object.assign(new Error('Request body too large'),{statusCode:413}));req.destroy();}});req.on('end',()=>{if(!body)return resolve({});try{resolve(JSON.parse(body));}catch{reject(Object.assign(new Error('Request body must be valid JSON'),{statusCode:400}));}});req.on('error',reject);});}
const assets={'/':['index.html','text/html; charset=utf-8'],'/index.html':['index.html','text/html; charset=utf-8'],'/styles.css':['styles.css','text/css; charset=utf-8'],'/app.js':['app.js','text/javascript; charset=utf-8']};
const server=http.createServer(async(req,res)=>{
 const url=new URL(req.url,`http://${req.headers.host||'localhost'}`);
 if(req.method==='GET'&&url.pathname==='/health')return json(res,200,{status:'healthy',service:'student-management-portal'});
 if(req.method==='GET'&&url.pathname==='/api/students')return json(res,200,{count:students.length,students});
 if(req.method==='POST'&&url.pathname==='/api/students'){
  try{const x=await readBody(req),name=typeof x.name==='string'?x.name.trim():'',email=typeof x.email==='string'?x.email.trim().toLowerCase():'',course=typeof x.course==='string'?x.course.trim():'';
   if(!name||!email||!course)return json(res,400,{error:'name, email and course are required'});
   if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return json(res,400,{error:'email address is invalid'});
   if(students.some(s=>s.email===email))return json(res,409,{error:'a student with this email already exists'});
   const student={id:nextId++,name,email,course};students.push(student);return json(res,201,{message:'student registered',student});
  }catch(e){return json(res,e.statusCode||400,{error:e.message||'invalid request'});}
 }
 if(req.method==='GET'&&assets[url.pathname]){const [file,type]=assets[url.pathname];return fs.readFile(path.join(__dirname,'public',file),(e,data)=>{if(e)return json(res,500,{error:'Unable to read application asset'});res.writeHead(200,{'Content-Type':type,'Content-Length':data.length,'X-Content-Type-Options':'nosniff'});res.end(data);});}
 return json(res,404,{error:'route not found'});
});
server.listen(PORT,HOST,()=>process.stdout.write(`Student Management Portal listening on ${HOST}:${PORT}\n`));
function stop(signal){process.stdout.write(`${signal} received; closing HTTP server\n`);server.close(()=>process.exit(0));setTimeout(()=>process.exit(1),5000).unref();}
process.on('SIGTERM',()=>stop('SIGTERM'));process.on('SIGINT',()=>stop('SIGINT'));
