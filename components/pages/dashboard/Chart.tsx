"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

const DAYS_IN_MONTH = 30
const MAX_PER_DAY = 1000

function generateFakeDayData() {
  const data = []
  for (let i = 1; i <= DAYS_IN_MONTH; i++) {
    const count = Math.floor(Math.random() * 800 + 200) // 200-1000
    const percent = Math.round((count / MAX_PER_DAY) * 100)
    data.push({
      day: i.toString().padStart(2, "0"),
      count,
      percent,
    })
  }
  return data
}

export function ChartDailyMessages() {
  const [data, setData] = useState<{ day: string; count: number; percent: number }[]>([])

  useEffect(() => {
    setData(generateFakeDayData())
  }, [])

  return (
    <Card dir="rtl" className="mb-6">
      <CardHeader className="pb-1">
        <CardTitle className="text-base sm:text-lg">مخطط الرسائل اليومية</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">عدد الرسائل لكل يوم في الشهر</CardDescription>
      </CardHeader>
      <CardContent className="h-[260px] px-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.05} />
            <XAxis dataKey="day" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip />
            {/* الخط البياني للنسبة المئوية */}
            <Line type="monotone" dataKey="percent" stroke="#8884d8" dot={false} strokeWidth={2} />
            {/* الأعمدة */}
            <Bar dataKey="count" fill="#ff964e" radius={[4, 4, 0, 0]} barSize={8}>
              <LabelList dataKey="count" position="top" fontSize={10} fill="#4B5563" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-1 text-sm">
        <div className="flex items-center gap-2 font-medium text-green-600">
          تمثل النسبة المئوية كخط <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-xs text-muted-foreground">كل عمود يمثل عدد الرسائل في يوم معين</div>
      </CardFooter>
    </Card>
  )
}
