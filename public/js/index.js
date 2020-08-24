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
            case 'onKeypress': // value: Function
              if( value instanceof Function ){
                element.addEventListener('keypress', value, false);
              }
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
    this.props = props;
    
    this.setState = (k,v)=>{ this.state[k] = v; }
  }

  function Dochi(config){
    return function( props ){
      const module = new DochiModule(Object.assign({
        parent: null,
        id: null,
        className: null,
      }, props));
      
      module.__proto__ = (function(_config){
        let el = null;
        
        const funcs = {
          renderEl: (_opt)=>{
            el = _createElement(_opt);
            
            return el;
          },
          ref: ()=>(el)
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
  
  
  
  /**
   * Common Components
   */
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
        className,
        label,
        onClick,
        fullWidth,
        ...rest
      } = this.props;
      
      const clsx = [
        fullWidth && "w12"
      ].concat(
        className,
      ).filter( item => !!item );
      
      return this.renderEl({
        tag: "h3",
        classList: clsx,
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
        className,
        onChange,
        fullWidth,
        ...rest
      } = this.props;
      
      const clsx = [
        fullWidth && "w12"
      ].concat(
        className,
      ).filter( item => !!item );
      
      return this.renderEl({
        tag: "input",
        classList: clsx,
        onChange: this.handleChange,
        value: this.state.value,
        ...rest
      });
    }
  });
  
  const Button = Dochi({
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
        className,
        onSubmit,
        fullWidth,
        ...rest
      } = this.props;
      
      const clsx = [
        fullWidth && "w12"
      ].concat(
        className,
      ).filter( item => !!item );
      
      return this.renderEl({
        tag: "button",
        classList: clsx,
        onSubmit: this.handleSubmit,
        ...rest
      });
    }
  });
  
  const GridItem = Dochi({
    render(){
      const {
        className,
        ...rest
      } = this.props;
      
      const clsx = [
        "col",
        className
      ].filter( item => !!item );
      
      return this.renderEl({
        tag: "div",
        classList: clsx,
        ...rest
      });      
    }
  });
  
  const GridRow = Dochi({
    render(){
      const {
        className,
        cols,
        ...rest
      } = this.props;
      
      const clsx = [
        "row",
        className
      ].filter( item => !!item );
      
      return this.renderEl({
        tag: "div",
        classList: clsx,
        children: [].concat( cols ).map( col => GridItem({ children: col }) ),
        ...rest
      });
    }
  });
  /**
   * Common Components
   */
  
  
  /**
   * Custom Components
   */
  const SignInForm = Dochi({
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
      event.preventDefault();
      
      const formData = {}
      const inputs = this.ref().querySelectorAll("input[name], select[name]");
      inputs.forEach(( input )=>{
        const name = input.name;
        const value = input.value;
        
        formData[name] = value;
      });
      
      request( this.props.action, {
        method: this.props.method,
        body: new URLSearchParams(formData)
      }).then( resp => resp.json() )
      .then( json => {
        localStorage.setItem("access_token", json.access_token);
        
        console.log( json );
      }).catch(( error )=>{
        console.log( error );
      });
    },
    render(){
      const {
        className,
        fullWidth,
        ...rest
      } = this.props;
      
      const clsx = [
        className,
        fullWidth && "w12",
      ].filter( item => !!item );
      
      const InputUserId = GridRow({
        children: (
          InputText({
            name: "user_id",
            type: "text",
            fullWidth: true,
            placeholder: "id",
            onChange: this.handleChange
          })
        )
      });
      
      const InputUserPwd = GridRow({
        children: (
          InputText({
            name: "user_pwd",
            type: "password",
            fullWidth: true,
            placeholder: "password",
            onChange: this.handleChange
          })
        )
      });
      
      const ButtonRow = GridRow({
        classList: "center",
        children: (
          GridItem({
            className: "w4",
            children: (
              Button({
                type: "submit",
                label: "SignIn",
                fullWidth: true,
                onClick: this.handleSubmit
              })
            )
          })
        )
      });
      
      return this.renderEl({
        tag: "form",
        classList: clsx,
        children: [
          InputUserId,
          InputUserPwd,
          ButtonRow
        ],
        ...rest
      });
    }
  });
  
  
  const SignUpForm = Dochi({
    init( props ){
      this.state = {
        user_id: "",
        user_pwd: "",
        user_pwd_chk: "",
        user_name: "",
        user_nick: "",
        email: "",
        cell_phone: ""
      }
      this.handleChange.bind(this);
      this.handleSubmit.bind(this);
      this.handleDuplCheck.bind(this);
      this.handlePasswordMaching.bind(this);
    },
    handleChange(event, value){
      this.setState(event.target.name, value);
    },
    handleSubmit(event){
      event.preventDefault();
      
      const formData = {}
      const inputs = this.ref().querySelectorAll("input[name], select[name]");
      inputs.forEach(( input )=>{
        const name = input.name;
        const value = input.value;
        
        formData[name] = value;
      });
      
      request( this.props.action, {
        method: this.props.method,
        body: new URLSearchParams(formData)
      }).then( resp => resp.json() )
      .then( json => {
        localStorage.setItem("access_token", json.access_token);
        
        console.log( json );
      }).catch(( error )=>{
        console.log( error );
      });
    },
    
    handleDuplCheck(event){
      event.preventDefault();

      const uri = "/security/duplcheck";
      const body = new URLSearchParams({
        user_id: this.state.user_id
      });
      
      request( uri, {
        method: "POST",
        body: body
      }).then( resp => resp.json() )
      .then( json => {
        console.log(json);
      }).catch(( error )=>{
        console.log( error );
      });
    },
    handlePasswordMaching(event, value){
      event.preventDefault();
      
      this.setState(event.target.name, value);
      
      console.log({
        "pwd": this.state.user_pwd,
        "pwd_chk":  this.state.user_pwd_chk
      });
    },
    render(){
      const {
        className,
        fullWidth,
        ...rest
      } = this.props;
      
      const clsx = [
        className,
        fullWidth && "w12",
      ].filter( item => !!item );
      
      const InputUserId = GridRow({
        children: [
          GridItem({
            className: "w8",
            children: (
              InputText({
                name: "user_id",
                type: "text",
                fullWidth: true,
                placeholder: "id",
                onChange: this.handleChange
              })
            )
          }),
          GridItem({
            className: "w4",
            children: (
              Button({
                name: "btn_dupl_chk",
                label: "중복확인",
                fullWidth: true,
                onClick: this.handleDuplCheck
              })
            )
          })
        ]
      });
      
      const InputUserPwd = GridRow({
        children: [
          GridItem({
            className: "w6",
            children: (
              InputText({
                name: "user_pwd",
                type: "password",
                fullWidth: true,
                placeholder: "password",
                onChange: this.handlePasswordMaching,
                
              })
            )
          }),
          GridItem({
            className: "w6",
            children: (
              InputText({
                name: "user_pwd_chk",
                type: "password",
                fullWidth: true,
                placeholder: "password check",
                onChange: this.handlePasswordMaching
              })
            )
          })
        ]
      });
      
      const InputUserName = GridRow({
        children: [
          GridItem({
            className: "w6",
            children: (
              InputText({
                name: "user_name",
                type: "text",
                fullWidth: true,
                placeholder: "username",
                onChange: this.handleChange
              })
            )
          }),
          GridItem({
            className: "w6",
            children: (
              InputText({
                name: "user_name",
                type: "text",
                fullWidth: true,
                placeholder: "nickname",
                onChange: this.handleChange
              })
            )
          })
        ]
      });
      
      const InputEmail = GridRow({
        className: "center",
        children: [
          GridItem({
            className: "w10",
            children: (
              InputText({
                name: "email",
                type: "text",
                fullWidth: true,
                placeholder: "email",
                onChange: this.handleChange
              })
            )
          })
        ]
      });
      
      const InputCellPhone = GridRow({
        className: "center",
        children: [
          GridItem({
            className: "w10",
            children: (
              InputText({
                name: "cell_phone",
                type: "text",
                fullWidth: true,
                placeholder: "cell phone",
                onChange: this.handleChange
              })
            )
          })
        ]
      });
      
      const ButtonRow = GridRow({
        classList: "center",
        children: (
          GridItem({
            className: "w4",
            children: (
              Button({
                type: "submit",
                label: "SignUp",
                fullWidth: true,
                onClick: this.handleSubmit
              })
            )
          })
        )
      });
      
      return this.renderEl({
        tag: "form",
        classList: clsx,
        children: [
          InputUserId,
          InputUserPwd,
          InputUserName,
          InputEmail,
          InputCellPhone,
          ButtonRow
        ],
        ...rest
      });
    }
  });
  
  
  const SignOutForm = Dochi({
    init( props ){
      this.state = {
      }
      this.handleSubmit.bind(this);
    },
    handleSubmit(event){
      event.preventDefault();
      
      request( this.props.action, {
        method: this.props.method,
      }).then( resp => resp.json() )
      .then( json => {
        console.log( json );
        localStorage.removeItem("access_token");
      }).catch(( error )=>{
        console.log( error );
      });
    },
    render(){
      const {
        className,
        fullWidth,
        ...rest
      } = this.props;
      
      const clsx = [
        className,
        fullWidth && "w12",
      ].filter( item => !!item );
      
      const ButtonRow = GridRow({
        classList: "center",
        children: (
          GridItem({
            className: "w4",
            children: (
              Button({
                type: "submit",
                label: "SignOut",
                fullWidth: true,
                onClick: this.handleSubmit
              })
            )
          })
        )
      });
      
      return this.renderEl({
        tag: "form",
        classList: clsx,
        children: [
          ButtonRow
        ],
        ...rest
      });
    }
  });
  
  const ResignForm = Dochi({
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
      event.preventDefault();
      
      const formData = {}
      const inputs = this.ref().querySelectorAll("input[name], select[name]");
      inputs.forEach(( input )=>{
        const name = input.name;
        const value = input.value;
        
        formData[name] = value;
      });
      
      request( this.props.action, {
        method: this.props.method,
        body: new URLSearchParams(formData)
      }).then( resp => resp.json() )
      .then( json => {
        localStorage.setItem("access_token", json.access_token);
        
        console.log( json );
      }).catch(( error )=>{
        console.log( error );
      });
    },
    render(){
      const {
        className,
        fullWidth,
        ...rest
      } = this.props;
      
      const clsx = [
        className,
        fullWidth && "w12",
      ].filter( item => !!item );
      
      const InputUserId = GridRow({
        children: (
          InputText({
            name: "user_id",
            type: "text",
            fullWidth: true,
            placeholder: "id",
            onChange: this.handleChange
          })
        )
      });
      
      const InputUserPwd = GridRow({
        children: (
          InputText({
            name: "user_pwd",
            type: "password",
            fullWidth: true,
            placeholder: "password",
            onChange: this.handleChange
          })
        )
      });
      
      const ButtonRow = GridRow({
        classList: "center",
        children: (
          GridItem({
            className: "w4",
            children: (
              Button({
                type: "submit",
                label: "Resign",
                fullWidth: true,
                onClick: this.handleSubmit
              })
            )
          })
        )
      });
      
      return this.renderEl({
        tag: "form",
        classList: clsx,
        children: [
          InputUserId,
          InputUserPwd,
          ButtonRow
        ],
        ...rest
      });
    }
  });
  
  const CheckTokenForm = Dochi({
    init( props ){
      this.state = {
      }
      this.handleSubmit.bind(this);
    },
    handleSubmit(event){
      event.preventDefault();
      
      request( this.props.action, {
        method: this.props.method,
      }).then( resp => resp.json() )
      .then( json => {
        console.log( json );
        localStorage.removeItem("access_token");
      }).catch(( error )=>{
        console.log( error );
      });
    },
    render(){
      const {
        className,
        fullWidth,
        ...rest
      } = this.props;
      
      const clsx = [
        className,
        fullWidth && "w12",
      ].filter( item => !!item );
      
      const ButtonRow = GridRow({
        classList: "center",
        children: (
          GridItem({
            className: "w4",
            children: (
              Button({
                type: "submit",
                label: "SignOut",
                fullWidth: true,
                onClick: this.handleSubmit
              })
            )
          })
        )
      });
      
      return this.renderEl({
        tag: "form",
        classList: clsx,
        children: [
          ButtonRow
        ],
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
      const SignIn = SignInForm({
        id: "signin_form",
        action: "/security/signin",
        method: "POST",
        className: "w2",
      });
      
      const SignUp = SignUpForm({
        id: "signup_form",
        action: "/security/signup",
        method: "POST",
        className: "w2",
      });
      
      const SignOut = SignOutForm({
        id: "signout_form",
        action: "/security/signout",
        method: "POST",
        className: "w2",
      });
      
      const Resign = ResignForm({
        id: "resign_form",
        action: "/security/resign",
        method: "POST",
        className: "w2",
      });
      
      const SignCheck = CheckTokenForm({
        id: "signcheck_form",
        action: "/security/signcheck",
        method: "POST",
        className: "w2",
      });
      
      return this.renderEl({
        tag: this.props.root,
        children: [
          SignIn,
          SignUp,
          SignOut,
          Resign,
          SignCheck,
        ]
      });;
    }
  });
  
  App({ root: document.getElementById("templates") });
  
})();

