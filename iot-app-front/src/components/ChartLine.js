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
import {datalog_properties, fromTimestampToDate} from '../utils/const.js'

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
    
    const labels = list ? list.map((log)=>fromTimestampToDate(log[datalog_properties.timestamp])) : [];
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
        console.log(property + ' updated')
        loadDataset()
    }, [list])

  return (
    <Line options={options} data={data} />
  )
}











export default ChartLine