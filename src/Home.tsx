import "./Home.css";
import React, {useEffect, useState} from "react";
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

type Views = "summary" | "detail";
const mockSummary = [{symbol:"APL", hatlOrdersCnt:100}];
type SummaryItem = {symbol: string; haltedOrdersCnt: number};

type DetailItem = {
    creTs: string;
    creUidCD: string;
    ejOrdNo: string;
    fillExecTs: string;
    fillPrc: string;
    fillQty: string;
    haltStatCD: string;
    ordID: string;
    relFillID: string;
    revPgmNa: string;
    revTS: string;
    revUidCD: string;
    symbol: string;
    vndrAcctID: string;
    crePgmNa: string;
    brNo: string;
    tif: string;

}

export const tifConverter = (value: string) => {
    switch (value) {
        case '000':
             return 'DAY';
        case '001':
            return 'GTC';
        case '006':
            return 'GTD';
        case '011':
            return 'CASH';
        case '012':
            return 'ND';
        default: 
            return 'DAY';
    }
}

export const haltStatusConverter = (value: string) => {
    switch (value) {
        case 'O':
             return 'Open';
        case 'F':
            return 'Filled';
        case 'C':
            return 'Canc';
        case 'V':
            return 'Void';
        case 'A':
            return 'AutoCanc';
        default: 
            return 'Open';
    }
}

const Home = ()=>{

const fetchSummary = ()=>{
    const URL_SUMMARY = 'http://localhost:8080/halt-controller/halted-records/summary';
    const axiosOptions = {
        headers: {
            Accept: 'application/json',
        },
        withCredentials: true,
    } ;
    axios.get(URL_SUMMARY, axiosOptions).then((res) => {
        setSummaryResults(res.data);
    });
};
useEffect(fetchSummary, []);

const [orderNumber, setOrderNumber] = useState('');
const [orderFromDate, setOrderFromDate] = useState('');
const [orderToDate, setOrderToDate] = useState('');
const [ orderFromTime, setOrderFromTime] = useState('');
const [ haltStatus, setHaltStatus] = useState('');
const [ symbol, setSymbol] = useState('');
const [accountNumber, setAccountNumber] = useState('');
const [branchNumnber, setBranchNumber] = useState('');
const [orderToTime,  setOrderToTime] = useState('');

const [results, setResults] = useState(<DetailItem[]>([]);

const [ summaryResults, setSummaryResult] = useState<SummaryItem[]>([]);
const [selectedView, setSelectedView] = useState<Views>('summary');
const handleChangeView = (newView:Views ) => () => setSelectedView(newView)
const clearForm = () => {
    setResults([]);
    setOrderNumber('');
    setOrderFromDate('');
    setOrderToDate('');
    setOrderFromTime('');
    // setTimeInForce('');
    setHaltStatus('');
    setSymbol('');
    setAccountNumber('');
    setBranchNumber('');
    setOrderToTime('');
};
useEffect(()=>{
    if (selectedView === 'summary'){
        clearForm();
    }
}, [selectedView]);

const fetchData = (selectedSymbol?: string) => {
    const payLoad = {
        ejOrdNo: orderNumber,
        orderFromDate,
        orderToDate,
        orderFromTime,
        orderToTime,
        haltStatCD: haltStatus,
        symbol: selectedSymbol || symbol,
        accNo: accountNumber,
        brNo: branchNumber,
        tif: timeInForce,
    };
    const axiosOptions = {
        headers: {
            Accept: 'application/json',
        },
        withCredentials: true,
    };

    const URL_RECORDS = 'http://localhost:8080/halt-controller/halted-records-summary';
    axios.post(URL_RECORDS, payLoad, axiosOptions).then((res)=>{
        if(Array.isArray(res.data)){
            setResults(res.data);
        }else{
            setResults([]);
        }
    });
    console.log('Payload', payLoad)
};
const submitForm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fetchData();
};

const handleSelectSymbol = (selectedSymbol: string) => (e:React.MouseEvent) => {
    setSymbol(selectedSymbol);
    fetchData(selectedSymbol);
    setSelectedView('detail');
};

return(
    <div>
        <form>
            <legend>
                Order Halt {selectedView === "summary" ? "Summary" : "Query"}
            </legend>
            <div className = "inputRow">
                <button className = "primary" type = "button" onClick = {()=>{console.log("refresh")}}> Refresh</button>
               
                    View State: <label><input onChange={handleChangeView("summary" )} type = "radio" checked = {selectedView === "summary"}/> Summary </label>
                    <label><input onChange={handleChangeView("detail" )} type = "radio" checked = {selectedView === "detail"}/> Detail </label>
              

            </div>
            {selectedView === "detail" && <>
            <div className = "inputRow">
                <div className = "element">
                    <label>EJ Order#</label>
                    <input/>
                </div>
                <div className = "element">
                    <label>Order From</label>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />

                </div>
                <div className = "element">
                    <label>Order To</label>
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />

                </div>
                <div className = "element">
                    <label>Time in Force</label>
                    <select>
                        <option>
                            option1
                        </option>
                        <option>
                            option2
                        </option>
                    </select>
                </div>
            </div>

            <div className = "inputRow">
                <div className = "element">
                    <label>Halt Status</label>
                    <select>
                        <option>
                            option1
                        </option>
                        <option>
                            option2
                        </option>
                    </select>
                </div>
                <div className = "element">
                    <label>Symbol</label>
                    <input/>
                </div>
                <div className = "element">
                    <label>Account No</label>
                    <input/>
                </div>
                <div className = "element">
                    <label>Branch No</label>
                    <input/>
                </div>
            </div>

            <div className = "buttonRow">
                <button className= "primary"> Search </button>
                <button >Clear</button>
            </div>
            </>}
        </form>
        {selectedView === "summary" && 
          <table className = "halfwidth" cellSpacing={0} cellPadding={0}>
          <thead>
              <tr>
                  <th>
                      EJ Order#
                  </th>
                  
                  <th>
                      # Orders Halted
                  </th>
                 </tr>
            </thead>
            <tbody>
                {mockSummary.map(item => (
                        <tr key = {item.symbol}>
                        <td>
                            {item.symbol}
                        </td>
                        <td>
                            {item.quantity}
                        </td>
                     </tr >
                ))}
               
                </tbody>
             </table>
                  }
                 

        {selectedView === "detail" && 
        <table cellSpacing={0} cellPadding={0}>
            <thead>
                <tr>
                    <th>
                        EJ Order#
                    </th>
                    
                    <th>
                        Order Entered TS
                    </th>

                    <th>
                        Symbol
                    </th>
                    <th>
                        Account
                    </th>
                    
                    <th>
                        Branch No
                    </th>

                    <th>
                        TIF
                    </th> 
                    <th>
                        Halt Status
                    </th>
                    
                    <th>
                        Quantity
                    </th>

                    <th>
                        Related Fill Price
                    </th>
                    <th>
                        Related Fill Qty
                    </th>
                    
                    <th>
                        Related Fill Exec Ts
                    </th>

                    <th>
                        Creation User ID
                    </th>
                    <th>
                        Creation TS
                    </th>
                    
                    <th>
                        Revision User ID
                    </th>

                    <th>
                        Revision TS
                    </th>
                    
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        450004735
                    </td>
                    <td>
                        2022-02-01 09:00:01 04375
                    </td>
                    <td>
                        BRK B
                    </td>
                    <td>
                        99191313
                    </td>
                    <td>
                        06425
                    </td>
                    <td>
                        GTC
                    </td>
                    <td>
                        Open
                    </td>
                    <td>
                        4375
                    </td>
                    <td>
                        303.2300
                    </td>
                    <td>
                        700
                    </td>
                    <td>
                    2022-02-01 09:00:01 04375
                    </td>
                    <td>
                        DCarter
                    </td>
                    <td>
                    2022-02-01 09:00:01 04375
                    </td>
                    <td>
                        DCARTER
                    </td>
                    <td>
                    2022-02-01 09:00:01 04375
                    </td>
                   
                </tr>
            </tbody>
        </table> }

    </div>
)

}

export default Home;



// )




//     const [selectedView, setSelectedView] = useState< Views >("detail");
//     const [startDate, setStartDate] = useState<Date | null>(new Date());
//     const [endDate, setEndDate] = useState<Date | null>(new Date());
  

//     // const obtainDB2Data = ()=>{
//     //     const URL_SUMMARY = 'http://localhost:8080/halt-controller/halted-records/summary';
//     //     const URL_RECORDS = 'http://localhost:8080/halt-controller/halted-records-summary';

//     //     axios.get(URL_RECORDS, header:{
//     //         'Acces-Control_Allow-Origin': '*',
//     //         'Content-Type': 'application/json',
//     //     }},)
//     //     .then((rest)=>{
//     //         let records = res.data;
//     //         useState({
//     //             records
//     //         })
//     //         console.log("Records", records)
//     //     })
//     // };

   