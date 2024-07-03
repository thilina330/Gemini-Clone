import React, { useContext, useState } from "react";
import "./sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {

  const[extend, setExtend] = useState(false)

  const {onSent, prevePrompt, setRecentPrompt, newChat} = useContext(Context)
  
 const loadPrompt = async (prompt) => {
  setRecentPrompt(prompt)
  await  onSent(prompt)
 }

  return (
    <div className="sidebar">
      <div className="top">
        <img onClick={()=> setExtend(prev => !prev)} className="menu" src={assets.menu_icon} alt="" />
        <div onClick={() => newChat()} className="new-chat">
          <img src={assets.plus_icon} alt="" />
          {extend?<p>New Chat</p>:null}
        </div>
        {extend 
        ? <div className="recent">
        <p className="recent-title">Recent</p>
        {prevePrompt.map((item,index) => {
            return (
              <div onClick={()=>loadPrompt(item)} className="recent-entry">
                 <img src={assets.message_icon} alt="" />
                 <p>{item.slice(0,18)}...</p>
              </div>
            )
        })}
       
      </div>
       : null
    }
        
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extend? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extend? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extend? <p>Setting</p> : null}
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
