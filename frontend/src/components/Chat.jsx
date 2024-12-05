import { useState } from "react";
import "./Chat.css"
import Survey from "./Survey";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Message = ({ text, isUserMessage = false }) => (
  <div className={`mb-4 ${isUserMessage ? 'self-end' : ''}`}>
    <p
      className={`${
        isUserMessage ? 'bg-blue-500 text-white' : 'bg-gray-100'
      } text-sm lg:text-base p-3 rounded-md w-fit max-w-[70%] ${isUserMessage ? 'ml-auto' : ''}`}
    >
      {text}
    </p>
  </div>
);

const Loader = () => (
  <div className="flex justify-center items-center space-x-2 mt-2">
    <div className="pulse bg-gray-400"></div>
    <div className="pulse bg-gray-400"></div>
    <div className="pulse bg-gray-400"></div>
  </div>
);

const Chat = () => {
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [survey, setSurvey] = useState(false);
  const [message, setMessage] = useState("");

  const handleEndSubmit = async () => {
    setIsLoading(true); 
    setSurvey(false)

    await sleep(1000);
  
    setResponses(prevResponses => [
      ...prevResponses,
      { text: "Estamos analizando tus respuestas", isUserMessage: false },
    ]);

    setIsLoading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true); 
    
    if (message === "") {
      return
    }

    setMessage("");
    setResponses(prevResponses => [
      ...prevResponses,
      { text: message, isUserMessage: true },
    ]);

    await sleep(1000);
    
    if (message === "start") {
      setResponses(prevResponses => [
        ...prevResponses,
        { text: "Contesta la siguiente encuesta", isUserMessage: false },
      ]);
      setSurvey(prevState => !prevState)
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: 'POST',
        body: JSON.stringify({ message: message }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      setResponses(prevResponses => [
        ...prevResponses,
        { text: data.answer, isUserMessage: false },
      ]);
    } catch (error) {
      console.log(error);
      setResponses(prevResponses => [
        ...prevResponses,
        { text: "Estoy teniendo problemas. Intente más tarde", isUserMessage: false },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 border-b-[6px] lg:border-b-[10px] border-b-primary rounded-t-xl">
        <div>
          <ul>
            {responses.map((response, index) => (
              <Message key={index} text={response.text} isUserMessage={response.isUserMessage} />
            ))}

            {isLoading && (
              <div
                className="bg-gray-100 text-sm lg:text-bae p-3 rounded-full w-fit max-w-[70%]"
              >
                <Loader />
              </div>
            )}
          </ul>
        </div>
        {survey && <Survey onFinish={handleEndSubmit}/>}
      </div>
      <div className="p-4 bg-gray-50 rounded-b-xl">
        <form 
          className="flex items-center gap-3"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 p-3 rounded-md border border-gray-300 text-sm lg:text-base"
          />
          <button 
            type="submit"
            disabled={isLoading}
            className="bg-primary text-white p-3 rounded-md hover:bg-primary-dark"
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  );
};

export default Chat;
