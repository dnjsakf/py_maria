async function request(uri, options){
  const headers = new Headers({
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8;",
  });

  if( localStorage.access_token ){
    headers.append("Authorization", "Bearer "+localStorage.access_token)
  }

  const _options = Object.assign({
    method: "GET",
    headers: headers,
  }, options);
  
  return await fetch(uri, _options);
}

function handleSignIn(event, form){
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

function handleSignUp(event, form){
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

function handleSignOut(event, form){
  event.preventDefault();
  
  const uri = form.action;
  const body = new URLSearchParams(new FormData(form));

  request( uri, {
    method: form.method,
    body: body
  }).then( resp => resp.json() )
  .then( json => {
    console.log(json);
    localStorage.removeItem("access_token");
  }).catch(( error )=>{
    console.log( error );
  });
}


function handleSignCheck(event, form){
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


function handleResign(event, form){
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