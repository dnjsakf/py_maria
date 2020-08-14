async function request(uri, _options){
  const options = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8;",
      "Authorization": localStorage.access_token ? "Bearer "+localStorage.access_token : "",
    }),
  }
  
  if( _options ){
    Object.assign(options, _options);
  }
  
  return await fetch(uri, options);
}

function handleLogin(event, form){
  event.preventDefault();
  
  const uri = form.action;
  const body = new URLSearchParams(new FormData(form));

  request( uri, {
    method: form.method,
    body: body
  }).then( resp => resp.json() )
  .then( json => {
    console.log( json );
    
    localStorage.setItem("access_token", json.access_token);
  }).catch(( error )=>{
    console.log( error );
  });
}

function handleRegister(event, form){
  event.preventDefault();
  
  const uri = form.action;
  const body = new URLSearchParams(new FormData(form));

  request( uri, {
    method: form.method,
    body: body
  }).then( resp => resp.json() )
  .then( json => {
    console.log(json);
  }).catch(( error )=>{
    console.log( error );
  });
}

function handleLogout(event, form){
  event.preventDefault();
  
  const uri = form.action;
  const body = new URLSearchParams(new FormData(form));

  request( uri, {
    method: form.method,
    body: body
  }).then( resp => resp.json() )
  .then( json => {
    console.log(json);
    
    localStorage.access_token = null;
    
  }).catch(( error )=>{
    console.log( error );
  });
}


function handleCheck(event, form){
  event.preventDefault();
  
  const uri = form.action;
  const body = new URLSearchParams(new FormData(form));

  request( uri, {
    method: form.method,
    body: body
  }).then( resp => resp.json() )
  .then( json => {
    console.log(json);
  }).catch(( error )=>{
    console.log( error );
  });
}