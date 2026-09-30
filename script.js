let gO='',u='',bC=40000,bN=28800,pend='',hist=[],st=null;
let LIVE_RATE = 2.30;

async function fetchLiveRate(){
  try{
    document.getElementById('liveRate').innerText='Updating...';
    let res = await fetch('https://api.exchangerate-api.com/v4/latest/XOF');
    let data = await res.json();
    if(data && data.rates && data.rates.NGN){
      LIVE_RATE = data.rates.NGN;
    } else {
      let r2 = await fetch('https://open.er-api.com/v6/latest/XOF');
      let d2 = await r2.json();
      if(d2 && d2.rates && d2.rates.NGN) LIVE_RATE = d2.rates.NGN;
    }
  }catch(e){ LIVE_RATE = 2.30; }
  document.getElementById('liveRate').innerText='1 XOF = '+LIVE_RATE.toFixed(4)+' NGN (LIVE)';
  document.getElementById('rateBox').innerText='1 XOF = '+LIVE_RATE.toFixed(4)+' NGN';
  document.getElementById('lastUpdate').innerText='Last: '+new Date().toLocaleTimeString()+' - Auto 60s';
  calcC(); calcN();
}
fetchLiveRate();
setInterval(fetchLiveRate, 60000);

function sO(){u=document.getElementById('ph').value;gO=Math.floor(100000+Math.random()*900000).toString();document.getElementById('s1').classList.add('hidden');document.getElementById('s2').classList.remove('hidden');document.getElementById('oD').innerText=gO;}
function vO(){if(document.getElementById('oI').value!==gO)return alert('OTP ba daidai ba! Daidai: '+gO);document.getElementById('s2').classList.add('hidden');document.getElementById('s3').classList.remove('hidden');}
async function oC(){try{st=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user'}});document.getElementById('vd').srcObject=st;document.getElementById('b1').classList.add('hidden');document.getElementById('b2').classList.remove('hidden');}catch(e){document.getElementById('b3').classList.remove('hidden');}}
function cP(){let v=document.getElementById('vd'),c=document.getElementById('cn');c.width=v.videoWidth;c.height=v.videoHeight;c.getContext('2d').drawImage(v,0,0);document.getElementById('b2').classList.add('hidden');document.getElementById('b3').classList.remove('hidden');document.getElementById('fS').innerText='✅ Face OK';if(st)st.getTracks().forEach(t=>t.stop());}
function gP(){document.getElementById('s3').classList.add('hidden');document.getElementById('s4').classList.remove('hidden');}
function fin(){let p=document.getElementById('pS').value;if(p.length<4)return alert('Saka PIN 4');localStorage.setItem('pin_'+u,p);document.getElementById('login').classList.add('hidden');document.getElementById('app').classList.remove('hidden');document.getElementById('uP').innerText=u+' | KeenatPay LIVE';calcC();calcN();upd();}
function tab(id,el){['convert','airtime','data','ng','ne'].forEach(x=>document.getElementById(x).classList.add('hidden'));document.getElementById(id).classList.remove('hidden');document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));el.classList.add('active');}
function calcC(){let c=parseFloat(document.getElementById('fromC').value)||0;let n=(c*LIVE_RATE)*0.95;document.getElementById('toN').value=n?n.toFixed(2):'';document.getElementById('rateInfo').innerText=c.toLocaleString()+' XOF = ₦'+(n?n.toFixed(2):0)+' (LIVE '+LIVE_RATE.toFixed(4)+')';}
function calcN(){let n=parseFloat(document.getElementById('fromN').value)||0;let c=(n/LIVE_RATE)*0.95;document.getElementById('toC').value=c?c.toFixed(0):'';}
function doPay(t){pend=t;let s=localStorage.getItem('pin_'+u)||'1234';document.getElementById('pinM').classList.remove('hidden');document.getElementById('pV').value='';document.getElementById('pE').style.display='none';document.getElementById('pS2').innerText='PIN dinka: '+s;}
function closeM(){document.getElementById('pinM').classList.add('hidden');}
function cP2(){let p=document.getElementById('pV').value,s=localStorage.getItem('pin_'+u)||'1234';if(p!==s){document.getElementById('pE').style.display='block';document.getElementById('pE').innerText='Ba daidai ba! Daidai: '+s;return;}closeM();let cAmt=parseFloat(document.getElementById('fromC').value)||0;let nAmt=parseFloat(document.getElementById('toN').value)||0;if(pend.includes('Convert')){if(cAmt>bC)return alert('CFA bai isa ba!');bC-=cAmt;bN+=nAmt;}else if(pend.includes('NG')||pend=='Airtime'||pend.includes('Data')){let am=parseFloat(document.getElementById('amNG').value)||parseFloat(document.getElementById('amtA').value)||500;if(am>bN)return alert('₦ bai isa ba!');bN-=am;}else{let am=parseFloat(document.getElementById('amNE').value)||1000;if(am>bC)return alert('CFA bai isa ba!');bC-=am;}let msg='✅ '+pend+' LIVE '+LIVE_RATE.toFixed(4)+' SUCCESS '+new Date().toLocaleTimeString();hist.unshift(msg);document.getElementById('hist').innerHTML=hist.join('<br>');upd();alert(msg);}
function upd(){document.getElementById('bC').innerText='CFA '+bC.toLocaleString();document.getElementById('bN').innerText='₦'+bN.toLocaleString();document.getElementById('balT').innerText='CFA '+bC.toLocaleString()+' | ₦'+bN.toLocaleString();}
