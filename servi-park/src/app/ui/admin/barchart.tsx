"use client";

import { BarChart } from "@/components/barchart"

const chartdata = [
    {
        date: "Enero 23",
        Ingresos: 2890000,
        Gastos: 2338000,
    },
    {
        date: "Feb 23",
        Ingresos: 2756000,
        Gastos: 2103000,
    },
    {
        date: "Mar 23",
        Ingresos: 3322000,
        Gastos: 2194000,
    },
    {
        date: "Abr 23",
        Ingresos: 3470000,
        Gastos: 2108000,
    },
    {
        date: "May 23",
        Ingresos: 3475000,
        Gastos: 1812000,
    },
    {
        date: "Jun 23",
        Ingresos: 3129000,
        Gastos: 1726000,
    },
    {
        date: "Jul 23",
        Ingresos: 3490000,
        Gastos: 1982000,
    },
    {
        date: "Ago 23",
        Ingresos: 2903000,
        Gastos: 2012000,
    },
    {
        date: "Sep 23",
        Ingresos: 2643000,
        Gastos: 2342000,
    },
    {
        date: "Oct 23",
        Ingresos: 2837000,
        Gastos: 2473000,
    },
    {
        date: "Nov 23",
        Ingresos: 2954000,
        Gastos: 3848000,
    },
    {
        date: "Dic 23",
        Ingresos: 3239000,
        Gastos: 3736000,
    },
]

export default function BarChartAxisLabels() {

    return (
        <BarChart
            className="h-80 w-11/12"
            data={chartdata}
            index="date"
            categories={["Ingresos", "Gastos"]}
            valueFormatter={(number: number) =>
                `$${Intl.NumberFormat("us").format(number).toString()}`
            }
            onValueChange={(v) => console.log(v)}
            yAxisLabel="$ COP"
            showYAxis={false}
            colors={["emerald", "amber"]}
        />
    );
}