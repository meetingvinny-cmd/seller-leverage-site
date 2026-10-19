(function(){
  var f=document.getElementById('intake');
  var fit=document.getElementById('fit');
  if(fit && /[?&]fit=1/.test(location.search)) fit.hidden=false;
  if(!f) return;
  var cfg=window.SL_CONFIG||{};
  var B=cfg.BASE||''; var err=document.getElementById('err'), btn=document.getElementById('send');
  function val(n){var e=f.elements[n]; return e ? (e.value||'').trim() : '';}
  f.addEventListener('submit',function(ev){
    ev.preventDefault(); err.hidden=true;
    var names=['first_name','email','q1_us_store','q2_products','q3_ads','q4_hours','q5_sales','q6_computer','q7_help'];
    var d={}; for(var i=0;i<names.length;i++){d[names[i]]=val(names[i]);}
    var missing=names.filter(function(n){return !d[n];});
    if(missing.length || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(d.email)){
      err.textContent='Please answer every question and check your email address.'; err.hidden=false; return;
    }
    if(val('website')){ location.href=B+'/thanks/'; return; }
    var isFit = d.q1_us_store==='Yes' && d.q2_products==='1 to 10' && d.q3_ads==='Me' && d.q7_help==='Yes, show me';
    d.fit = isFit ? 'yes' : 'no';
    d.route = d.q1_us_store==='No' ? 'not-yet' : 'thanks';
    d.token = cfg.FORM_TOKEN||''; d.page = location.href; d.sent_at = new Date().toISOString();
    var next = B + (d.route==='not-yet' ? '/thanks-not-yet/' : (isFit ? '/thanks/?fit=1' : '/thanks/'));
    if(!cfg.FORM_URL){ location.href = next; return; }  /* stub until his script URL exists */
    btn.disabled=true; btn.textContent='Sending...';
    fetch(cfg.FORM_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(d)})
      .then(function(){ location.href = next; })
      .catch(function(){ btn.disabled=false; btn.textContent='Send my answers';
        err.textContent='That did not go through. Please try again, or email hello@sellerleverage.co.'; err.hidden=false; });
  });
})();
