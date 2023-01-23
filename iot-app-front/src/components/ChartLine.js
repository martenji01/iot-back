import React, { useEffect, useState } from 'react'
import { Grid} from "@mui/material"
import { getDataChartLine } from '../api/request.js'
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

  
const ChartLine = ({list, title, property}) => {
    const [datasetList, setDatasetList] = useState([])
    const convertTimestamp = (unix_timestamp)=>{
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(unix_timestamp * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        console.log(formattedTime);
        return formattedTime
      }
    const labels = list ? list.map((log)=>convertTimestamp(log[datalog_properties.timestamp])) : [];
    const data = {
        labels,
        datasets: datasetList
      };
      const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: title,
          },
        },
      };
      
      
      const loadDataset= ()=>{
        const listData = property.map((p)=>{
            return {
                label: p,
                data: list ? list.map((log)=>log[datalog_properties[p]]) : [],
                borderColor: p===datalog_properties.value? 'rgb(255, 99, 132)': 'rgb(53, 162, 235)',
                backgroundColor: p===datalog_properties.value? 'rgba(255, 99, 132, 0.5)': 'rgba(53, 162, 235, 0.5)'
              }
        })
        setDatasetList(listData)
      }
    useEffect(()=>{
        console.log({list})
        loadDataset()
    }, [list])

  return (
    <Line options={options} data={data} />

  )
}











export default ChartLine