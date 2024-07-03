import { createContext, useState } from "react";
import run from '../config/Gemini'

export const Context = createContext();

const ContextProvider = (props) =>{

    const [input, setInput] = useState("")
    const [recentPrompt, setRecentPrompt] = useState("")
    const [prevePrompt, setPrevePrompt] = useState([])
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("")

    const delayPara = (index, nextWord) =>{
    
        setTimeout(function(){
            setResultData(prev => prev+nextWord)

        },75*index)
    }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async(prompt) => {
       setResultData(""),
       setLoading(true),
       setShowResult(true) 
       let response;
       if(prompt !== undefined){
          response = await run(prompt)
          setRecentPrompt(prompt)

       }
       else{
        setPrevePrompt(prev => [...prev, input])
        setRecentPrompt(input)
        response = await run(input)
       }
      
       let responseArray = response.split("**");
       let newResponce = "";
       for(let i=0 ; i<responseArray.length;i++){
        if(i === 0 || i%2 !== 1){
            newResponce += responseArray[i];
        }
        else{
            newResponce += "<b>" + responseArray[i] + "<b/>";
        }
       }
       let newResponce01 = newResponce.split('*').join('<br/>')
       let newResponceArray = newResponce01.split(" ")
       for(let i=0;i<newResponceArray.length;i++){
        const nextWord = newResponceArray[i];
         delayPara(i,nextWord+" ")
       }
       setLoading(false)
       setInput("")
    }

    //onSent("hello gpt")

    const contextValue = {
       
        prevePrompt,
        setPrevePrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }

    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>

    )
}


export default ContextProvider
