import "./Home.css";
import {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Home = ()=>{
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [endDate, setEndDate] = useState<Date | null>(new Date());

    return(
        <div>
            <form>
                <legend>
                    Order Halt Query
                </legend>
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
            </form>

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
            </table>

        </div>
    )
    
}

export default Home;