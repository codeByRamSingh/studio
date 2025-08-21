
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
  TableFooter,
} from "@/components/ui/table";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
import { students } from "@/lib/data";
import { format } from "date-fns";
import { PieChart, Pie, Cell, Legend } from 'recharts';

type CourseData = {
    name: string;
    value: number;
    fill: string;
};

const COURSE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF195E'];

function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
}

export function TrustDashboard() {

  const grandTotalCourseFee = students.reduce((acc, student) => acc + (student.courseFee || 0), 0);
  const grandTotalSubmittedFee = students.reduce((acc, student) => acc + student.feeHistory.reduce((feeAcc, fee) => feeAcc + fee.amount, 0), 0);
  const grandTotalDue = grandTotalCourseFee - grandTotalSubmittedFee;

  const courseCounts = students.reduce((acc, student) => {
    if(student.course) {
        acc[student.course] = (acc[student.course] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  const courseChartData: CourseData[] = Object.keys(courseCounts).map((courseName, index) => ({
    name: courseName,
    value: courseCounts[courseName],
    fill: COURSE_COLORS[index % COURSE_COLORS.length]
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
       <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        
        <Card className="lg:col-span-5">
            <CardHeader>
                <CardTitle>Financial Overview</CardTitle>
                <CardDescription>A detailed fee ledger for all students.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student Name</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Session</TableHead>
                            <TableHead className="text-right">Total Course Fee</TableHead>
                            <TableHead className="text-right">Total Submitted</TableHead>
                            <TableHead className="text-right">Total Due</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((student) => {
                            const totalPaid = student.feeHistory.reduce((acc, curr) => acc + curr.amount, 0);
                            const remainingDue = student.courseFee - totalPaid;
                            return (
                                <TableRow key={student.id}>
                                    <TableCell>{student.studentName}</TableCell>
                                    <TableCell>{student.course}</TableCell>
                                    <TableCell>{student.session}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(student.courseFee)}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(totalPaid)}</TableCell>
                                    <TableCell className="text-right">{formatCurrency(remainingDue)}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={3} className="font-bold">Grand Total</TableCell>
                            <TableCell className="text-right font-bold">{formatCurrency(grandTotalCourseFee)}</TableCell>
                            <TableCell className="text-right font-bold">{formatCurrency(grandTotalSubmittedFee)}</TableCell>
                            <TableCell className="text-right font-bold">{formatCurrency(grandTotalDue)}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </CardContent>
        </Card>

        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Course-wise Student Distribution</CardTitle>
                <CardDescription>Number of students in each course.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} className="min-h-[250px] w-full">
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                         <Legend />
                        <Pie
                            data={courseChartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label={(entry) => `${entry.value}`}
                        >
                            {courseChartData.map((entry) => (
                                <Cell key={entry.name} fill={entry.fill} />
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
