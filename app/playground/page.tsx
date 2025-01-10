'use client';
import InvestTest from "@/components/InvestTest";
import UploadHistory from "@/components/UploadHistory";

export default function Playground() {
	return (
		<div className="grid grid-cols-9 items-center h-full px-5">
			<div className="col-span-4">
				<UploadHistory />
			</div>
			<div className="col-span-1 text-8xl text-center">OR</div>
			<div className="col-span-4">
				<InvestTest />
			</div>
		</div>
	);
}