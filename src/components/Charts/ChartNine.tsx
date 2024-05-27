import { Select } from 'antd';
import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options: ApexOptions = {
    legend: {
        show: false,
        position: 'top',
        horizontalAlign: 'left',
    },
    colors: ['#D9D9D9', '#000000'],
    chart: {
        fontFamily: 'Satoshi, sans-serif',
        height: 335,
        type: 'area',
        dropShadow: {
            enabled: false,
            color: '#623CEA14',
            top: 10,
            blur: 4,
            left: 0,
            opacity: 0.1,
        },

        toolbar: {
            show: false,
        },
    },
    responsive: [
        {
            breakpoint: 1024,
            options: {
                chart: {
                    height: 300,
                },
            },
        },
        {
            breakpoint: 1366,
            options: {
                chart: {
                    height: 350,
                },
            },
        },
    ],
    stroke: {
        width: [2, 2],
        curve: 'straight',
    },
    grid: {
        xaxis: {
            lines: {
                show: true,
            },
        },
        yaxis: {
            lines: {
                show: true,
            },
        },
    },
    dataLabels: {
        enabled: false,
    },
    markers: {
        size: 4,
        colors: '#fff',
        strokeColors: ['#3056D3', '#80CAEE', '#D9D9D9'],
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        hover: {
            size: undefined,
            sizeOffset: 5,
        },
    },
    xaxis: {
        type: 'category',
        categories: [
            'Sep',
            'Oct',
            'Nov',
            'Dec',
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
        ],
        axisBorder: {
            show: false,
        },
        axisTicks: {
            show: false,
        },
    },
    yaxis: {
        title: {
            style: {
                fontSize: '0px',
            },
        },
        min: 0,
        max: 100,
    },
};

interface ChartOneState {
    series: {
        name: string;
        data: number[];
    }[];
}

const ChartNine: React.FC = () => {
    const [state, setState] = useState<ChartOneState>({
        series: [
            {
                name: 'Product One',
                data: [23, 11, 22, 27, 13, 22],
            },

            {
                name: 'Product Two',
                data: [30, 25, 36, 30, 45, 35],
            },
        ],
    });

    const handleReset = () => {
        setState((prevState) => ({
            ...prevState,
        }));
    };
    handleReset;

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
            <div className='flex justify-between flex-wrap'>
                <h1 className='font-semibold text-black text-xl dark:text-white'>Total income</h1>
                <div className='flex gap-3'>
                    <Select
                        className='mb-3'
                        defaultValue="2024"
                        style={{ width: 120 }}
                        options={[
                            { value: '2024', label: '2024' },
                            { value: '2025', label: '2025' },
                            { value: '2026', label: '2026' },
                        ]}
                    />
                    <Select
                        className='mb-3'
                        defaultValue="2024"
                        style={{ width: 120 }}
                        options={[
                            { value: '2024', label: '2024' },
                            { value: '2025', label: '2025' },
                            { value: '2026', label: '2026' },
                        ]}
                    />
                </div>
            </div>
            <div>
                <div id="chartOne" className="-ml-5">
                    <ReactApexChart
                        options={options}
                        series={state.series}
                        type="bar"
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
};

export default ChartNine;