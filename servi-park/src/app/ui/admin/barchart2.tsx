"use client";

import { BarChart } from "@/components/barchart"

const chartdata = [
    {
        date: "Enero 23",
        Total: 2890000,
        Valor_Base: 2340900,
        Iva: 549100,
    },
    {
        date: "Feb 23",
        Total: 2756000,
        Valor_Base: 2232360,
        Iva: 523640,
    },
    {
        date: "Mar 23",
        Total: 3322000,
        Valor_Base: 2690820,
        Iva: 631180,
    },
    {
        date: "Abr 23",
        Total: 3470000,
        Valor_Base: 2810700,
        Iva: 659300,
    },
    {
        date: "May 23",
        Total: 3475000,
        Valor_Base: 2814750,
        Iva: 660250,
    },
    {
        date: "Jun 23",
        Total: 3129000,
        Valor_Base: 2534490,
        Iva: 594510,
    },
    {
        date: "Jul 23",
        Total: 3490000,
        Valor_Base: 2826900,
        Iva: 663100,
    },
    {
        date: "Ago 23",
        Total: 2903000,
        Valor_Base: 2351430,
        Iva: 551570,
    },
    {
        date: "Sep 23",
        Total: 2643000,
        Valor_Base: 2140830,
        Iva: 502170,
    },
    {
        date: "Oct 23",
        Total: 2837000,
        Valor_Base: 2297970,
        Iva: 539030,
    },
    {
        date: "Nov 23",
        Total: 2954000,
        Valor_Base: 2392740,
        Iva: 561260,
    },
    {
        date: "Dic 23",
        Total: 3239000,
        Valor_Base: 2623590,
        Iva: 615410,
    },
]

export default function BarChartAxisLabels2() {

    return (
        <BarChart
            className="h-80 w-[79%]"
            data={chartdata}
            index="date"
            categories={["Total", "Valor_Base", "Iva"]}
            type="stacked"
            valueFormatter={(number: number) =>
                `$${Intl.NumberFormat("us").format(number).toString()}`
            }
            onValueChange={(v) => console.log(v)}
            yAxisLabel="$ COP"
            showYAxis={false}
            colors={["blue", "emerald","violet"]}
        />
    );
}