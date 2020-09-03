/** React **/
import React, { useRef, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

/** Redux **/
import { useSelector } from 'react-redux';

/** Redux: Reducers **/
import { selectors } from '@reducers/authReducer';

/** Socket **/
import io from 'socket.io-client';

/** Custom Components **/
import { GridRow, GridColumn } from '@components/Grid';
import { InputText } from '@components/Input';
import { BaseButton } from '@components/Button';


/** Main Component **/
const Chat = ( props )=>{
  /** Props **/
  const {
    className,
    ...rest
  } = props;

  /** Refs **/
  const scrollRef = useRef();
  
  /** State **/
  const [ value, setValue ] = useState("");
  const [ messages, setMessages ] = useState([]);  // ToDo: Reducer
  const [ socket, setSocket ] = useState(()=>{
    return io("/chat");
  });

  /** Hooks: Redux **/
  const user = useSelector(selectors.getUser);

  /** Handlers: Set input value state, when changed input. **/
  const handleChange = useCallback(( event )=>{
    setValue(event.target.value);
  }, []);

  /** Handlers: Socket Emit Event */
  /** Send message, when clicked button or pressed Enter Key. **/
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

  /** Side Effects: Socket On Event **/
  /** Receive message **/
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

  /** Side Effects: Scroll down, when updated messages. **/
  useEffect(()=>{
    return ()=>{
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [ messages ]);

  /** Render **/
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

/** Prop Types **/
Chat.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
  style: PropTypes.any,
}

/** Default Props **/
Chat.defaultProps = { }

/** Exports **/
export default Chat;
