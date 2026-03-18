import { useState, useEffect } from "react";

const SearchPage = () => {
    const MAX_LINES = 10;        

    const [entity, setEntity] = useState<string>("");
    const [ pinNotice, setPinNotice] = useState<string>("");
    const [fullText, setFullText] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const [currentStep, setCurrentStep] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [stepDescription, setStepDescription] = useState<string>("");
    const [isRunning, setIsRunning] = useState<boolean>(false);

    const handleSearch = async (entity: string) => {
        var request = {
            searchEntity: entity,
            searchPinNotice: "testPIN",
            searchFullText: "testFullText"
        }

        setOutput("");

        console.debug('Search initiated for request: ' + JSON.stringify(request));
        const response = await fetch(`${import.meta.env.VITE_TEDSSE_URL}/search`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
            });

        const reader = response.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';
            
            for (const line of lines) {
                console.debug('Received line: ' + line);
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') continue;
                    
                    const chunk = JSON.parse(data);

                    popMessage(chunk.Message);
                    setCurrentStep(chunk.CurrentStep);
                    setStatus(chunk.EngineStatus);
                    setStepDescription(chunk.CurrentStep + " - " + chunk.CurrentStepDescription);  
                    setIsRunning(chunk.IsRunning);
                }
            }
        }
    }
    const l = output.length;   
            
    const popMessage = (message: string) => {
        // Append the new message and limit the total lines to MAX_LINES
        setOutput(prev => 
            (prev.split("\n").length < MAX_LINES) ? 
                [...prev.split("\n"), message]
                .join("\n")
            : [...prev.split("\n"), message]
                .splice(1)
                .join("\n"));
    }

    
    return ( <>
    <div className="flex justify-center p-4">
        <div className="form object-right bg-gray-100 p-4 w-200 rounded-2xl">
            <div className="container p-2.5 grid grid-flow-col grid-rows-2 gap-4">
                <label htmlFor="inputEntity" className="text-right row-start-1 p-2 col-start-1">Entity</label>
                <input 
                    className="inputValue row-start-1  col-start-2"
                    name="inputEntity"
                    type="text" 
                    placeholder="Search for an entity..."
                    value={entity}
                    onChange={(e) => setEntity(e.target.value)}
                />
                {/* <label htmlFor="inputPinNotice" className="text-right row-start-2 p-2 col-start-1">Pin Notice</label>
                <input 
                    className="inputValue row-start-2 col-start-2"
                    name="inputPinNotice"
                    type="text" 
                    placeholder="Search for a pin notice..."
                    value={pinNotice}
                    onChange={(e) => setPinNotice(e.target.value)}
                /> */}
                {/* <label htmlFor="inputFullText" className="text-right row-start-3 p-2 col-start-1">Full Text</label>
                <input 
                    className="inputValue row-start-3 col-start-2"
                    name="inputFullText"
                    type="text" 
                    placeholder="Search for full text..."
                    value={fullText}
                    onChange={(e) => setFullText(e.target.value)}
                /> */}
                <button className="button row-start-4 col-start-2 max-w-1/4 dev"  onClick={ () => handleSearch(entity) }>Search</button>                           
            </div>
            <div className=" bg-gray-50 text-gray-800 font-mono text-sm p-10 m-5 grid grid-flow-col grid-rows-2 gap-4 border border-gray-300 rounded-3xl">
                <div className="row-start-1 col-start-1">Current step:</div>
                <div className="row-start-1 col-start-2">{ stepDescription}</div>
                <div className="row-start-2 col-start-1">Status:</div>
                <div className="row-start-2 col-start-2">{ status }</div>
            </div>

            </div>
        </div>    
        <div className="display-linebreak bg-gray-50 text-gray-800 font-mono text-sm p-10 m-5 border border-gray-300 rounded-3xl">{ output}</div>
    </> );
}
 
export default SearchPage;