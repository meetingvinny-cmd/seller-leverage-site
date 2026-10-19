(function(){
  var cfg=window.SL_CONFIG||{}, box=document.getElementById('cal');
  var tabs=document.querySelectorAll('.tab');
  function show(key){
    for(var i=0;i<tabs.length;i++) tabs[i].classList.toggle('on', tabs[i].getAttribute('data-cal')===key);
    var url=cfg[key];
    if(!url || !/^https:\/\/(app\.)?cal\.com\//.test(url)){ box.innerHTML='<div class="ph">Booking link lands tonight.</div>'; return; }
    var u = url + (url.indexOf('?')<0 ? '?' : '&') + 'embed=true';
    box.innerHTML=''; var fr=document.createElement('iframe');
    fr.src=u; fr.title='Pick a time'; fr.loading='lazy'; box.appendChild(fr);
  }
  for(var i=0;i<tabs.length;i++) tabs[i].addEventListener('click',function(){show(this.getAttribute('data-cal'));});
  show('CAL_45');
})();
