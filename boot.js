(function(){
  var root=document.documentElement;
  root.classList.add("js");

  var legacyRoutes={"#aviso":"/aviso-legal/","#privacidad":"/privacidad/","#cookies":"/cookies/"};
  if((location.pathname==="/"||location.pathname==="/index.html")&&legacyRoutes[location.hash]){
    root.classList.add("no-intro");
    location.replace(legacyRoutes[location.hash]);
    return;
  }

  if(matchMedia("(prefers-reduced-motion: reduce)").matches||location.hash||/[?&]intro=0/.test(location.search)){
    root.classList.add("no-intro");
  }
})();
