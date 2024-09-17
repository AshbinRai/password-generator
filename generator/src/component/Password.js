import { useEffect, useState } from "react";


export default function Password(){
    const [password,setPassword] = useState('12345678');
    const [capital,setCapital] = useState(true);
    const [small,setSmall] = useState(true);
    const [digit,setDigit] = useState(true);
    const [special,setSpecial] = useState(true);
    const [similar,setSimilar] = useState(true);
    const [length,setLength] = useState(8);
    // const [mode,setMode] = useState('light');

    const changeLength = (event) =>{
        setLength(event.target.value);
    };

    const changeCapital = (event) =>{
        setCapital(!capital);
    };

    const changeSmall = (event) =>{
        setSmall(!small);
    };

    const changeDigit = (event) =>{
        setDigit(!digit);
    };
    const changeSpecial = (event) =>{
        setSpecial(!special);
    };
    const changeSimilar = (event) =>{
        setSimilar(!similar);
    };
    const copyPassword = () =>{
        navigator.clipboard.writeText(password);
    };

    const generatePassword = () =>{
        let chars = '';
        let pass = '';

        if(capital){
            chars = chars+'ABCDEFGIHJKLMNOPQRSTUVWXYZ';
        }
        if(small){
            chars = chars+'abcdefghijkmnopqrstuvwxyz';
        }
        if(digit){
            chars = chars + '123456789';
        }
        if(special){
            chars += '~!@#$%^&*()_+';
        }
        if(similar){
            chars += 'l0';
        }

        for(let i=1;i<=length;i++){
            let random_index = Math.floor(Math.random() * chars.length);
            pass = pass+chars[random_index];
        }
        setPassword(pass);
    };

    useEffect(()=>{
        generatePassword();
    },[length,capital,small,digit,special,similar]);
    const switchMode = () => {
        let currentMode = document.getElementsByTagName('html')[0].getAttribute('data-bs-theme');
        if(currentMode==='dark'){
            document.getElementsByTagName('html')[0].setAttribute('data-bs-theme','dark');
        }else{
            document.getElementsByTagName('html')[0].setAttribute('data-bs-theme','light');
        }
    };

    return (
        <>
            <h1 className="my-5 text-center">Generate Random Password</h1>
            <div className="box container p-4">
                <div className="row">
                    <div className="col-9">
                        <h2>{password}</h2>
                    </div>
                    <div className="col-3">
                        <button className="float-end btn btn-success" onClick={copyPassword}>Copy Password</button>
                    </div>
                </div>
                <hr />
                <div className="row mt-5">
                    <div className="col-12">
                        <label>Length ({length})</label>
                        <input type="range" min="6" max="32" value={length} className="w-100" onChange={changeLength} />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col">
                        <input type="checkbox" checked={capital} id="capital" onChange={changeCapital}/>
                        <label for="capital">[A-Z]</label>
                    </div>
                    <div className="col">
                        <input type="checkbox" checked={small} id="small" onChange={changeSmall}/>
                        <label for="small">[a-z]</label>
                    </div>
                    <div className="col">
                        <input type="checkbox" checked={digit} id="digit" onChange={changeDigit}/>
                        <label for="digit">[0-9]</label>
                    </div>
                    <div className="col">
                        <input type="checkbox" checked={special} id="special" onChange={changeSpecial}/>
                        <label for="special">[!@#$%^&]</label>
                    </div>
                    <div className="col">
                        <input type="checkbox" checked={similar} id="similar" onChange={changeSimilar}/>
                        <label for="similar">[IL,0O]</label>
                    </div>
                </div>
            </div>
    <div className="btn-mode" onClick={switchMode}>
    <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onclick={switchMode} />
        <label class="form-check-label" for="flexSwitchCheckChecked">Change Mode</label>
      </div>
  </div>
        </>
    )
}