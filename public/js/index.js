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



(function(){
  /**
   * DochiFramework
   **/
  function _createElement( props ){
    if( props instanceof Array ){
      return props.map(function(_props){
        return _createElement( _props );
      });
    } else if( props instanceof Object ) {
      
      var element = null;
      if( props.tag instanceof Element ){
        element = props.tag
      } else {
        element = document.createElement( props.tag );
      }
      
      var keys = Object.keys(props);
      for(let i = 0; i < keys.length; i++){
        var key = keys[i];
        var value = props[key];
        
        if( value instanceof Function ){
          switch( key ){
            case 'onClick': // value: Function
              if( value instanceof Function ){
                element.addEventListener('click', value, false);
              }
              break;
            case 'onChange': // value: Function
              if( value instanceof Function ){
                element.addEventListener('change', value, false);
              }
              break;
          }
          continue;
        }
        
        switch( key ){
          case 'tag':
          case 'format':
            break;
          case 'visible': 
            if( value === false ) return null;
          case 'className':
          case 'classList':
            [].concat(value).forEach(function(className){
              className && element.classList.add( className );
            })
            break;
          case 'style':
            Object.keys(value).forEach(function(styleName){
              element[key][styleName] = value[styleName];
            });
            break;
          case 'label':
            element.appendChild( document.createTextNode( value||"" ) );
            break;
          case 'children': // value: Object, Array
            console.log( value );
            if( value instanceof Element ){
              element.appendChild( value );
            } else {
              [].concat( value ).map(function( children ){
                if( children instanceof Element ){
                  return children;
                } else {
                  return _createElement( children ); 
                }
              }).forEach(function( children ){
                if( children ){
                  if( children instanceof Element ){
                    element.appendChild( children );
                  } else {
                    // Object or Array
                    [].concat( children ).forEach(function( _children ){
                      _children && element.appendChild( _children );
                    });
                  }
                }
              });
            }        
            break;
          default:
            if( value ){
              element.setAttribute(key, value);
            }
        }
      }
      return element;
    }
    return null;
  }
   
  function DochiModule(props){
    const state = {}
    
    this.props = props;
    
    this.setState = (k,v)=>{ state[k] = v; }
    this.getState = (k)=>( state[k] );
  }

  function Dochi(config){
    return function( props ){
      const module = new DochiModule(Object.assign({
        parent: null,
        id: null,
        className: null,
      }, props));
      
      module.__proto__ = (function(_config){
        const funcs = {
          renderEl: _createElement
        }
        
        Object.keys(config).forEach(( key )=>{
          if( _config[key] instanceof Function ){
            funcs[key] = _config[key].bind(module);
          }
        });
        
        return funcs;
      })(config);
      
      if( module.init ){
        module.init(Object.assign({}, props));
      }
      return module.render();
    }
    return Renderer
  }

  
  const Title = Dochi({
    init( props ){
      this.handleClick.bind(this);
    },
    handleClick( event ){
      if( this.props.onClick ){
        this.props.onClick( event, this );
      }
    },
    render(){
      const {
        label,
        onClick,
        ...rest
      } = this.props;
      
      return this.renderEl({
        tag: "h3",
        label,
        onClick: this.handleClick,
      });
    }
  });
  
  const InputText = Dochi({
    init( props ){
      this.state = {
        value: ""
      }
      
      this.handleChange.bind(this);
    },
    handleChange(event){
      this.setState("value", event.target.value);
      
      if( this.props.onChange ){
        this.props.onChange(event, this.state.value);
      }
    },
    render(){
      const {
        onChange,
        ...rest
      } = this.props;
      
      return this.renderEl({
        tag: "input",
        onChange: this.handleChange,
        ...rest
      });
    }
  });
  
  const SubmitButton = Dochi({
    init( props ){
      this.handleSubmit.bind(this);
    },
    handleSubmit( event ){
      if( this.props.onSubmit ){
        this.props.onSubmit( event );
      }
    },
    render(){
      const {
        onSubmit,
        ...rest
      } = this.props;
      
      return this.renderEl({
        tag: "button",
        onSubmit: this.handleSubmit,
        ...rest
      });
    }
  })
  
  const ListItem = Dochi({
    render(){
      return this.renderEl({
        tag: "li",
        ...this.props
      });
    }
  });
  
  const List = Dochi({
    render(){
      const {
        items,
        ...rest
      } = this.props;
      
      const children = items.map( item => ListItem(item) );
      
      return this.renderEl({
        tag: "ul",
        children,
        ...rest
      });
    }
  });
  
  const SignUpForm = Dochi({
    init( props ){
      this.state = {
        user_id: "",
        user_pwd: "",
      }
      this.handleChange.bind(this);
      this.handleSubmit.bind(this);
    },
    handleChange(event, value){
      this.setState(event.target.name, value);
    },
    handleSubmit(event){
      console.log(this.state);
    },
    render(){
      const {
        ...rest
      } = this.props;
      
      const FormList = List({
        items: [
          InputText({
            name: "user_id",
            type: "text",
            placeholder: "Write your ID.",
            onChange: this.handleChange
          }),
          InputText({
            name: "user_pwd",
            type: "password",
            placeholder: "Write your Password.",
            onChange: this.handleChange
          }),
          SubmitButton({
            type: "submit",    
            label: "submit",
            onSubmit: this.handleSubmit
          }),
        ]
      });
      
      return this.renderEl({
        tag: "form",
        children: FormList,
        ...rest
      });
    }
  });
  
  const App = Dochi({
    init( props ){
      
    },
    handleClick( event, self ){
      console.log( event, self );
    },
    render(){
      return this.renderEl({
        tag: this.props.root,
        children: [
          SignUpForm({
            id: "login_form",
            action: "/security/signup",
            method: "POST",
          }),
        ]
      });;
    }
  });
  
  App({ root: document.getElementById("templates") });
  
})();

