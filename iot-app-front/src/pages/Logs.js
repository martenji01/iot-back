import React, { useEffect, useState } from 'react'
import { getDataLogs } from '../api/request.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const datalog_properties = {
    timestamp: 'timestamp',
    value: 'value',
    hum: 'hum'
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'DataLog Cherry',
      },
    },
  };
  
const Logs = () => {
    const [list, setList] = useState(null)
    const labels = list ? list.map((log)=>log[datalog_properties.timestamp]) : [];
    const data = {
        labels,
        datasets: [
          {
            label: 'Values',
            data: list ? list.map((log)=>log[datalog_properties.value]) : [],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Hum',
            data: list ? list.map((log)=>log[datalog_properties.hum]) : [],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

    const setLogsData = async ()=>{
        const list = await getDataLogs()
        setList(list)
    }

    useEffect(()=>{
        setLogsData()
    }, [])

    useEffect(()=>{
        console.log({list})
    }, [list])

    
  return (
    <div>
        {list? 'ok' : 'empty'}
        <Line options={options} data={data} />
    </div>
  )
}










export default Logs