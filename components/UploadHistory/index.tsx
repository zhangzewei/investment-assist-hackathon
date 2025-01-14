import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function UploadHistory({
  onSubmit,
}: {
  onSubmit?: (file: File) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const handleSubmit = () => {
    if (onSubmit && file) {
      onSubmit(file);
    }
  }
  return <Card>
    <CardHeader>
      <CardTitle>Update Your Investment History</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="history">Upload History</Label>
        <Input
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              setFile(files[0]);
            }
          }}
          id="history"
          type="file"
        />
      </div>
    </CardContent>
    <CardFooter>
      <Button disabled={!file} onClick={handleSubmit}>Upload</Button>
    </CardFooter>
  </Card>
}