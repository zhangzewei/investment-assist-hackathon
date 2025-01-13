import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function UploadHistory({
  onSubmit,
}: {
  onSubmit?: () => void;
}) {
  const handleSubmit = () => {
    onSubmit && onSubmit();
  }
  return <Card>
    <CardHeader>
      <CardTitle>Update Your Investment History</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="history">Upload History</Label>
        <Input id="history" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
      </div>
    </CardContent>
    <CardFooter>
      <Button onClick={handleSubmit}>Upload</Button>
    </CardFooter>
  </Card>
}