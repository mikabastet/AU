const SITE_CONFIG=Object.freeze({
  legalNif:"[COMPLETAR: NIF/NIE de la titular]",
  legalAddress:"[COMPLETAR: calle y número, 28019 Madrid]",
  legalEmail:"[COMPLETAR: correo legal]",
  retentionPeriod:"[COMPLETAR: plazo de conservación de los mensajes]",
  vpsLocation:"[COMPLETAR: ubicación del VPS Contabo]",
  emailProvider:"[COMPLETAR: proveedor de correo]",
  emailFlow:"[COMPLETAR: confirmar si se envía correo automático y aviso interno]",
  assistantProvider:"[COMPLETAR: proveedor de IA del asistente]",
  emailRateLimit:"[COMPLETAR: límite de envíos por email y retención en n8n]",
  transferSafeguards:"[COMPLETAR: garantías para transferencias a EE. UU.]",
  vatStatus:"[COMPLETAR: indicar si los precios incluyen IVA]",
  turnstileCookies:"[COMPLETAR: comprobar si Turnstile instala cookies]"
});
const COOKIES_ANALITICA=false;

(function(){if(matchMedia("(max-width:339px)").matches){var widget=document.querySelector(".cf-turnstile");if(widget)widget.setAttribute("data-size","compact")}})();

(function(){
  var WEBHOOK="https://vmi3162910.contaboserver.net/webhook/contacto";
  var CHAT_WEBHOOK="https://chat-proxy.trescuatenta.workers.dev";
  var year=document.getElementById("y");
  if(year)year.textContent=new Date().getFullYear();
  document.querySelectorAll("[data-config]").forEach(function(node){
    var key=node.getAttribute("data-config");
    var value=Object.prototype.hasOwnProperty.call(SITE_CONFIG,key)?SITE_CONFIG[key]:"";
    var block=node.closest("[data-legal-block]");
    if(!value||value.indexOf("[COMPLETAR")===0){
      if(block)block.hidden=true;
      else node.textContent="";
      return;
    }
    node.textContent=value;
    if(block)block.hidden=false;
    if(node.tagName==="A")node.href="mailto:"+value;
  });
  if(COOKIES_ANALITICA){
    var cookieBanner=document.getElementById("cookieBanner");
    var cookieSettingsLink=document.getElementById("cookieSettingsLink");
    var cookiePreferences=document.getElementById("cookiePreferences");
    var analyticsConsent=document.getElementById("analyticsConsent");
    var storedCookieChoice=window.localStorage.getItem("340-cookie-consent");
    cookieSettingsLink.hidden=false;
    if(!storedCookieChoice)cookieBanner.hidden=false;
    else analyticsConsent.checked=JSON.parse(storedCookieChoice).analytics===true;
    function storeCookieChoice(analytics){
      window.localStorage.setItem("340-cookie-consent",JSON.stringify({necessary:true,analytics:analytics}));
      cookieBanner.hidden=true;
      cookiePreferences.hidden=true;
      document.getElementById("configureCookies").setAttribute("aria-expanded","false");
    }
    document.getElementById("acceptCookies").addEventListener("click",function(){storeCookieChoice(true)});
    document.getElementById("rejectCookies").addEventListener("click",function(){storeCookieChoice(false)});
    document.getElementById("configureCookies").addEventListener("click",function(){
      cookiePreferences.hidden=!cookiePreferences.hidden;
      this.setAttribute("aria-expanded",String(!cookiePreferences.hidden));
    });
    document.getElementById("saveCookiePreferences").addEventListener("click",function(){storeCookieChoice(analyticsConsent.checked)});
    cookieSettingsLink.addEventListener("click",function(){cookieBanner.hidden=false;cookiePreferences.hidden=false;document.getElementById("configureCookies").setAttribute("aria-expanded","true")});
  }
  var themeToggle=document.getElementById("themeToggle");
  if(themeToggle)themeToggle.addEventListener("click",function(){
    var light=document.documentElement.dataset.theme!=="light";
    document.documentElement.dataset.theme=light?"light":"dark";
    document.querySelector('meta[name="theme-color"]').content=light?"#f4efe9":"#171516";
    themeToggle.textContent=light?"☾":"☼";
    themeToggle.setAttribute("aria-label",light?"Cambiar a tema oscuro":"Cambiar a tema claro");
    themeToggle.setAttribute("aria-pressed",String(light));
    themeToggle.title=light?"Cambiar a tema oscuro":"Cambiar a tema claro";
  });
  var menu=document.getElementById("menu-principal"),menuToggle=document.querySelector(".nav-toggle"),menuBackdrop=document.querySelector(".menu-backdrop");
  if(menu&&menuToggle&&menuBackdrop){
  function setMenuOpen(open,restoreFocus){
    menu.classList.toggle("is-open",open);
    menuToggle.setAttribute("aria-expanded",String(open));
    menuToggle.setAttribute("aria-label",open?"Cerrar menú":"Abrir menú");
    document.body.classList.toggle("menu-open",open);
    menuBackdrop.hidden=!open;
    if(open)menu.querySelector("a").focus();
    else if(restoreFocus)menuToggle.focus();
  }
  menuToggle.addEventListener("click",function(){setMenuOpen(menuToggle.getAttribute("aria-expanded")!=="true",false)});
  menu.addEventListener("click",function(event){if(event.target.closest("a"))setMenuOpen(false,false)});
  menuBackdrop.addEventListener("click",function(){setMenuOpen(false,false)});
  document.addEventListener("click",function(event){
    if(menuToggle.getAttribute("aria-expanded")==="true"&&!menu.contains(event.target)&&!menuToggle.contains(event.target))setMenuOpen(false,false);
  });
  document.addEventListener("keydown",function(event){
    if(event.key==="Escape"&&menuToggle.getAttribute("aria-expanded")==="true"){setMenuOpen(false,true)}
  });
  window.addEventListener("resize",function(){if(window.innerWidth>=860&&menuToggle.getAttribute("aria-expanded")==="true")setMenuOpen(false,false)});
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener("click",function(){
      var hash=a.getAttribute("href");
      if(hash.length<2)return;
      var d=document.getElementById(hash.slice(1));
      if(d&&d.tagName==="DETAILS")d.open=true;
    });
  });
  }
  var f=document.getElementById("f"),s=document.getElementById("s"),ts=document.getElementById("ts");
  if(f){
  var submitButton=f.querySelector('button[type="submit"]'),submitLabel=document.getElementById("submitLabel");
  var defaultSubmitLabel=submitLabel.textContent;
  ts.value=Date.now();
  f.addEventListener("focusin",function(event){
    if(event.target.matches("input:not([type=hidden]):not([type=checkbox]), textarea, select"))document.body.classList.add("form-field-focused");
  });
  f.addEventListener("focusout",function(){
    window.setTimeout(function(){
      if(!f.contains(document.activeElement)||!document.activeElement.matches("input:not([type=hidden]):not([type=checkbox]), textarea, select"))document.body.classList.remove("form-field-focused");
    },0);
  });
  function say(t,e){s.textContent=t;s.className=e?"err":"";if(t)s.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"nearest"})}
  function resetTurnstile(){if(window.turnstile)window.turnstile.reset()}
  f.addEventListener("submit",function(ev){
    ev.preventDefault();
    submitButton.disabled=true;
    submitLabel.textContent="Enviando...";
    say("",false);
    var datos=Object.fromEntries(new FormData(f));
    fetch(WEBHOOK,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(datos)
    })
      .then(function(res){
        return res.text().then(function(text){
          if(res.status!==200)throw new Error("Unexpected response status");
          return JSON.parse(text);
        });
      })
      .then(function(data){
        if(!data||data.ok!==true)throw new Error("Unexpected response body");
        f.reset();
        ts.value=Date.now();
        resetTurnstile();
        say("Mensaje enviado. Te responderé en 24-48 horas laborables. Revisa tu correo, te acabo de escribir.",false);
      })
      .catch(function(){
        resetTurnstile();
        say("No se pudo enviar. Revisa los datos e inténtalo de nuevo.",true);
      })
      .then(function(){
        submitButton.disabled=false;
        submitLabel.textContent=defaultSubmitLabel;
      });
  });
  }
  var toggle=document.getElementById("chatToggle"),panel=document.getElementById("chatPanel"),close=document.getElementById("chatClose");
  var chatForm=document.getElementById("chatForm"),chatInput=document.getElementById("chatInput"),messages=document.getElementById("chatMessages");
  if(toggle&&panel&&close&&chatForm&&chatInput&&messages){
  var whatsappLink=document.querySelector(".whatsapp-link");
  if(whatsappLink&&"IntersectionObserver" in window){
    new IntersectionObserver(function(entries){
      document.body.classList.toggle("whatsapp-visible",entries[0].isIntersecting);
    },{threshold:.1}).observe(whatsappLink);
  }
  var chatSession="web-"+(window.crypto&&crypto.randomUUID?crypto.randomUUID():Date.now()+"-"+Math.random().toString(36).slice(2));
  function setChatOpen(open,restoreFocus){
    panel.classList.toggle("open",open);
    panel.setAttribute("aria-hidden",String(!open));
    toggle.setAttribute("aria-expanded",String(open));
    if(open){
      if(window.matchMedia("(max-width:760px)").matches)close.focus();
      else chatInput.focus();
      adjustChatViewport();
      window.requestAnimationFrame(function(){messages.scrollTop=messages.scrollHeight});
    }else{
      chatInput.blur();
      if(restoreFocus!==false)toggle.focus();
    }
  }
  function adjustChatViewport(){
    if(!panel.classList.contains("open"))return;
    var viewport=window.visualViewport;
    if(viewport&&window.matchMedia("(max-width:859px)").matches){
      panel.style.setProperty("--chat-vv-top",Math.max(0,viewport.offsetTop)+"px");
      panel.style.setProperty("--chat-vv-height",Math.max(0,viewport.height)+"px");
    }else{
      panel.style.removeProperty("--chat-vv-top");
      panel.style.removeProperty("--chat-vv-height");
    }
    window.requestAnimationFrame(function(){messages.scrollTop=messages.scrollHeight});
  }
  if(window.visualViewport){
    window.visualViewport.addEventListener("resize",adjustChatViewport);
    window.visualViewport.addEventListener("scroll",adjustChatViewport);
  }
  window.addEventListener("resize",adjustChatViewport);
  function addMessage(text,kind){
    var item=document.createElement("div");
    item.className="chat-message"+(kind?" "+kind:"");
    item.textContent=text;
    messages.appendChild(item);
    messages.scrollTop=messages.scrollHeight;
    return item;
  }
  toggle.addEventListener("click",function(){setChatOpen(!panel.classList.contains("open"))});
  close.addEventListener("click",function(){setChatOpen(false)});
  document.addEventListener("pointerdown",function(event){
    if(panel.classList.contains("open")&&!panel.contains(event.target)&&!toggle.contains(event.target))setChatOpen(false,false);
  });
  chatInput.addEventListener("focus",function(){window.setTimeout(adjustChatViewport,80)});
  chatForm.addEventListener("submit",function(ev){
    ev.preventDefault();
    var question=chatInput.value.trim();
    if(!question)return;
    addMessage(question,"user");
    chatInput.value="";
    if(!CHAT_WEBHOOK){
      addMessage("El asistente todavía no está conectado. Configura la URL del Webhook de n8n para activar las respuestas.", "error");
      return;
    }
    var send=chatForm.querySelector("button");
    send.disabled=true;
    var pending=addMessage("Estoy revisándolo...");
    fetch(CHAT_WEBHOOK,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:question,sessionId:chatSession})})
      .then(function(response){
        if(!response.ok)throw new Error("HTTP "+response.status);
        var type=response.headers.get("content-type")||"";
        return type.indexOf("application/json")!==-1?response.json():response.text();
      })
      .then(function(data){
        var answer=typeof data==="string"?data:(data&&(data.output||data.answer||data.response||data.text));
        if(typeof answer!=="string"||!answer.trim())throw new Error("La respuesta del webhook no contiene output, answer, response o text.");
        pending.textContent=answer.trim();
        messages.scrollTop=messages.scrollHeight;
      })
      .catch(function(error){
        pending.classList.add("error");
        pending.textContent="No he podido conectar con el asistente. Inténtalo más tarde.";
        if(window.console)console.error("Error del asistente n8n:",error);
      })
      .then(function(){send.disabled=false;chatInput.focus()});
  });
  }
})();

(function(){var i=document.getElementById('intro340');if(!i)return;
function skip(){i.classList.add('i-done')}
document.getElementById('introSkip').addEventListener('click',skip);
addEventListener('keydown',function(e){if(e.key==='Escape')skip()});
i.addEventListener('animationend',function(e){if(e.target===i)i.remove()});})();

(function(){
  var SECTORES=["Turismo y alquileres","Hostelería","Comercio","Servicios profesionales"];
  var PRECIOS=["",""];
  var sectorList=document.querySelector("[data-sectors]");
  var priceCards=document.querySelectorAll("[data-price-index]");
  var heroChat=document.getElementById("heroChatOpen");
  var chatToggle=document.getElementById("chatToggle");
  var actionBar=document.querySelector(".mobile-action-bar");
  var reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if(sectorList){
    sectorList.replaceChildren();
    SECTORES.forEach(function(sector){
      var item=document.createElement("li");
      item.textContent=sector;
      sectorList.appendChild(item);
    });
  }
  priceCards.forEach(function(card){
    var index=Number(card.getAttribute("data-price-index"));
    var value=card.querySelector(".price-value");
    if(value)value.textContent=PRECIOS[index]||"A medida";
  });
  if(heroChat&&chatToggle)heroChat.addEventListener("click",function(){chatToggle.click()});

  document.querySelectorAll(".project-shot,.avatar-photo").forEach(function(image){
    function showImage(){
      image.classList.add("is-loaded");
      if(image.classList.contains("avatar-photo")){
        image.parentElement.classList.add("has-photo");
        image.parentElement.setAttribute("aria-label","Retrato de Mika");
      }
    }
    if(image.complete&&image.naturalWidth>0)showImage();
    else image.addEventListener("load",showImage,{once:true});
  });

  if("IntersectionObserver" in window){
    var revealItems=document.querySelectorAll(".reveal");
    if(revealItems.length&&!reduceMotion){
      var revealObserver=new IntersectionObserver(function(entries,observer){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },{threshold:.12});
      document.documentElement.classList.add("reveal-enabled");
      revealItems.forEach(function(item){revealObserver.observe(item)});
    }

    if(actionBar){
      var contactVisible=false,whatsappVisible=false;
      var contactObserver=new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.target.matches(".contact-form"))contactVisible=entry.isIntersecting;
          if(entry.target.matches(".whatsapp-link"))whatsappVisible=entry.isIntersecting;
        });
        actionBar.classList.toggle("is-hidden",contactVisible||whatsappVisible);
      },{threshold:.08});
      var form=document.querySelector(".contact-form");
      var whatsapp=document.querySelector(".whatsapp-link");
      if(form)contactObserver.observe(form);
      if(whatsapp)contactObserver.observe(whatsapp);
    }
  }
})();

(function(){
  var track=document.getElementById("contenido");
  if(!track)return;
  var slides=Array.prototype.slice.call(track.querySelectorAll(".slide"));
  var progress=Array.prototype.slice.call(document.querySelectorAll(".carousel-progress button"));
  var count=document.querySelector(".carousel-count");
  var previous=document.querySelector(".carousel-prev");
  var next=document.querySelector(".carousel-next");
  var targets=["inicio","quien-soy","servicios","precios","proyectos","metodo","preguntas","contacto"];
  var active=0,locked=false,startPoint=null;
  var reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function slideForHash(hash){
    var element=hash&&document.getElementById(hash.replace(/^#/,""));
    return element?slides.indexOf(element.closest(".slide")):-1;
  }
  function showSlide(index,writeHistory){
    active=Math.max(0,Math.min(slides.length-1,index));
    track.style.transform="translate3d(-"+(active*100)+"vw,0,0)";
    slides.forEach(function(slide,i){
      var selected=i===active;
      slide.classList.toggle("is-active",selected);
      slide.setAttribute("aria-hidden",String(!selected));
      slide.inert=!selected;
    });
    progress.forEach(function(button,i){
      if(i===active)button.setAttribute("aria-current","true");
      else button.removeAttribute("aria-current");
    });
    if(count)count.textContent=String(active+1).padStart(2,"0")+" / "+String(slides.length).padStart(2,"0");
    if(writeHistory&&window.history&&window.history.replaceState){
      window.history.replaceState(null,"","#"+targets[active]);
    }
    window.dispatchEvent(new CustomEvent("carouselchange",{detail:{index:active}}));
  }
  var initial=slideForHash(window.location.hash);
  showSlide(initial>=0?initial:0,false);
  document.querySelectorAll('a[href^="#"]').forEach(function(link){
    link.addEventListener("click",function(event){
      var hash=link.getAttribute("href");
      if(hash==="#contenido"){
        event.preventDefault();
        showSlide(0,true);
        document.getElementById("hero-title").focus();
        return;
      }
      var targetIndex=slideForHash(hash);
      if(targetIndex<0)return;
      event.preventDefault();
      showSlide(targetIndex,true);
      var target=document.getElementById(hash.slice(1));
      if(target&&target.tagName==="DETAILS")target.open=true;
    });
  });
  progress.forEach(function(button,index){button.addEventListener("click",function(){showSlide(index,true)})});
  if(previous)previous.addEventListener("click",function(){showSlide(active-1,true)});
  if(next)next.addEventListener("click",function(){showSlide(active+1,true)});
  window.addEventListener("popstate",function(){
    var index=slideForHash(window.location.hash);
    if(index>=0)showSlide(index,false);
  });
  document.addEventListener("keydown",function(event){
    var target=event.target;
    if(target&&(/INPUT|TEXTAREA|SELECT/.test(target.tagName)||target.isContentEditable))return;
    if(document.getElementById("chatPanel").classList.contains("open")||document.body.classList.contains("menu-open"))return;
    if(event.key==="ArrowRight"){event.preventDefault();showSlide(active+1,true)}
    if(event.key==="ArrowLeft"){event.preventDefault();showSlide(active-1,true)}
  });
  function scrollRow(row,delta){
    var max=row.scrollWidth-row.clientWidth;
    if(max<2)return false;
    var before=row.scrollLeft;
    var destination=Math.max(0,Math.min(max,before+delta));
    if(Math.abs(destination-before)<1)return false;
    row.scrollLeft=destination;
    return true;
  }
  document.addEventListener("wheel",function(event){
    if(document.getElementById("chatPanel").classList.contains("open")||document.body.classList.contains("menu-open"))return;
    if(event.target.closest(".topbar"))return;
    var row=event.target.closest(".service-grid,.price-grid,.project-grid,.method-grid");
    var delta=Math.abs(event.deltaX)>Math.abs(event.deltaY)?event.deltaX:event.deltaY;
    if(row&&scrollRow(row,delta)){event.preventDefault();return}
    if(Math.abs(delta)<25||locked)return;
    event.preventDefault();
    showSlide(active+(delta>0?1:-1),true);
    locked=true;
    window.setTimeout(function(){locked=false},650);
  },{passive:false});
  document.addEventListener("pointerdown",function(event){
    if(event.pointerType==="mouse"||document.getElementById("chatPanel").classList.contains("open")||document.body.classList.contains("menu-open"))return;
    if(event.target.closest(".topbar,.carousel-controls,.chat-toggle"))return;
    startPoint={x:event.clientX,y:event.clientY,target:event.target};
  },{passive:true});
  document.addEventListener("pointerup",function(event){
    if(!startPoint)return;
    var dx=event.clientX-startPoint.x,dy=event.clientY-startPoint.y;
    var row=startPoint.target.closest(".service-grid,.price-grid,.project-grid,.method-grid");
    startPoint=null;
    if(Math.abs(dx)<60||Math.abs(dx)<Math.abs(dy)*1.25)return;
    if(row){
      var max=row.scrollWidth-row.clientWidth;
      var canContinue=dx<0?row.scrollLeft<max-2:row.scrollLeft>2;
      if(canContinue)return;
    }
    showSlide(active+(dx<0?1:-1),true);
  },{passive:true});

  var canvas=document.getElementById("networkBg");
  var context=canvas&&canvas.getContext("2d");
  if(!canvas||!context)return;
  var width=0,height=0,ratio=1,points=[],mouseX=0,mouseY=0,smoothX=0,smoothY=0,turn=0,frame=0;
  function makePoints(){
    var amount=window.innerWidth<700?70:128;
    points=[];
    for(var i=0;i<amount;i++)points.push({x:(Math.random()*2.5-1.25)*width,y:(Math.random()*2.2-1.1)*height,z:Math.random()*420-130});
  }
  function resize(){
    ratio=Math.min(window.devicePixelRatio||1,1.5);
    width=window.innerWidth;height=window.innerHeight;
    canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
    context.setTransform(ratio,0,0,ratio,0,0);
    makePoints();
    draw(0);
  }
  function draw(time){
    if(!width||!height)return;
    smoothX+=(mouseX-smoothX)*.025;smoothY+=(mouseY-smoothY)*.025;
    context.clearRect(0,0,width,height);
    var angle=turn+time*.000025+smoothX*.000035;
    var sin=Math.sin(angle),cos=Math.cos(angle),camera=520;
    var projected=points.map(function(point){
      var x=point.x*cos-point.z*sin;
      var z=point.x*sin+point.z*cos;
      var perspective=camera/(camera+z);
      return{x:width/2+x*perspective+smoothX*.018,y:height/2+(point.y+smoothY*.018)*perspective,z:z};
    });
    context.lineWidth=.7;
    for(var a=0;a<projected.length;a++){
      var nearest=[];
      for(var b=a+1;b<projected.length;b++){
        var dx=projected[a].x-projected[b].x,dy=projected[a].y-projected[b].y,distance=dx*dx+dy*dy;
        if(distance<130*130)nearest.push({index:b,distance:distance});
      }
      nearest.sort(function(one,two){return one.distance-two.distance});
      nearest.slice(0,3).forEach(function(edge){
        var alpha=Math.max(0,.18*(1-Math.sqrt(edge.distance)/130));
        context.strokeStyle="rgba(169,169,178,"+alpha+")";
        context.beginPath();context.moveTo(projected[a].x,projected[a].y);context.lineTo(projected[edge.index].x,projected[edge.index].y);context.stroke();
      });
    }
    projected.forEach(function(point){
      context.fillStyle="rgba(177,177,185,"+(point.z<0?.46:.25)+")";
      context.beginPath();context.arc(point.x,point.y,point.z<0?1.35:1,0,Math.PI*2);context.fill();
    });
    var vignette=context.createRadialGradient(width*.5,height*.48,Math.min(width,height)*.2,width*.5,height*.48,Math.max(width,height)*.75);
    vignette.addColorStop(0,"rgba(5,5,6,0)");vignette.addColorStop(1,"rgba(5,5,6,.83)");
    context.fillStyle=vignette;context.fillRect(0,0,width,height);
    if(!reduceMotion)frame=window.requestAnimationFrame(draw);
  }
  window.addEventListener("resize",resize);
  window.addEventListener("pointermove",function(event){
    if(event.pointerType==="touch")return;
    mouseX=event.clientX-width/2;mouseY=event.clientY-height/2;
  },{passive:true});
  window.addEventListener("carouselchange",function(){if(!reduceMotion)turn+=.09});
  resize();
  if(!reduceMotion)frame=window.requestAnimationFrame(draw);
})();
