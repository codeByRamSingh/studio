
"use client"

import { PageHeader } from "@/components/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
import { students } from "@/lib/data";
import { format } from "date-fns";
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

type CourseData = {
    name: string;
    value: number;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF195E'];

function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
}

export function TrustDashboard() {

  const totalCourseFee = students.reduce((acc, student) => acc + student.courseFee, 0);
  const totalSubmittedFee = students.reduce((acc, student) => acc + student.feeHistory.reduce((feeAcc, fee) => feeAcc + fee.amount, 0), 0);
  const totalDue = totalCourseFee - totalSubmittedFee;

  const courseCounts = students.reduce((acc, student) => {
    if(student.course) {
        acc[student.course] = (acc[student.course] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  const chartData: CourseData[] = Object.keys(courseCounts).map(courseName => ({
    name: courseName,
    value: courseCounts[courseName]
  }));

  const recentTransactions = students.flatMap(student => 
    student.feeHistory.map(fee => ({
        studentName: student.studentName,
        amount: fee.amount,
        date: fee.date
    }))
  ).sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);


  return (
    <div className="space-y-8">
      <PageHeader
        title="Trust Dashboard"
        description="High-level reports and analytics for the governing trust."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader>
                <CardTitle>Total Course Fees</CardTitle>
                <CardDescription>The total fees for all enrolled students.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{formatCurrency(totalCourseFee)}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Total Submitted Fees</CardTitle>
                <CardDescription>The total amount of fees collected so far.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">{formatCurrency(totalSubmittedFee)}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Total Dues</CardTitle>
                <CardDescription>The total outstanding balance to be collected.</CardDescription>
            </CardHeader>
            <CardContent>
                 <p className="text-3xl font-bold text-destructive">{formatCurrency(totalDue)}</p>
            </CardContent>
        </Card>
      </div>

       <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Course-wise Student Distribution</CardTitle>
                <CardDescription>Number of students in each course.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} className="min-h-[200px] w-full">
                    <PieChart>
                        <Tooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label={(entry) => `${entry.name} (${entry.value})`}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
        <Card className="lg:col-span-3">
            <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>The last 5 fee payments received.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                       {recentTransactions.map((tx, index) => (
                         <TableRow key={index}>
                            <TableCell>{tx.studentName}</TableCell>
                            <TableCell>{format(tx.date, "PPP")}</TableCell>
                            <TableCell className="text-right">{formatCurrency(tx.amount)}</TableCell>
                         </TableRow>
                       ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
       </div>
    </div>
  );
}
