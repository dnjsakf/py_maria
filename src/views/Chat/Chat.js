const { useRef, useState, useEffect } = React;

const Chat = ( props )=>{
  const {
    className,
    ...rest
  } = props;

  const scrollRef = useRef();
  const [ value, setValue ] = useState("");
  const [ messages, setMessages ] = useState([]);  // ToDo: Reducer
  const [ socket, setSocket ] = useState(()=>{
    return io("/chat");
  });

  const user = useSelector(authSelectors.getUser);

  const handleChange = useCallback(( event )=>{
    setValue(event.target.value);
  }, []);

  const handleSendMessage = useCallback(( event )=>{
    event.preventDefault();

    const sendData = {
      name: user.user_nick||user.user_name||"Unknown",
      text: value
    }

    socket.emit("message", {
      name: encodeURIComponent(sendData.name),
      text: encodeURIComponent(sendData.text)
    }, ()=>{
      console.log("sended", sendData);
      setValue("");
    });
  }, [ socket, value, user ]);

  useEffect(()=>{
    socket.on("receive_message", ( data )=>{
      setMessages(( state )=>(
        state.concat({
          name: decodeURIComponent(data.name),
          text: decodeURIComponent(data.text),
        })
      ))
    });

    return ()=>{
      socket.close();
    }
  }, [ socket ]);

  useEffect(()=>{
    return ()=>{
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [ messages ]);

  return (
    <div className="chat-container">
      <GridRow>
        <GridColumn w4
          ref={ scrollRef }
          style={{
            height: "300px",
            overflowY: "scroll",
          }}
        >
          <ul className="chat-msg-list">
            {
              messages && messages.map(( message, idx )=>(
                <li key={ idx }>{ message.name }:{ message.text }</li>
              ))
            }
          </ul>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn w4>
          <form id="message_form" className="w12">
            <GridRow>
              <GridColumn w10>
                <InputText
                  fullWidth
                  type="text"
                  name="message"
                  placeholder="message"
                  value={ value }
                  onChange={ handleChange }
                />
              </GridColumn>
              <GridColumn w2>
                <BaseButton
                  fullWidth
                  type="submit"
                  onClick={ handleSendMessage }>
                    send
                </BaseButton>
              </GridColumn>
            </GridRow>
          </form>
        </GridColumn>
      </GridRow>
    </div>
  );
}