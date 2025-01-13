'use client';
import Dashboard from "@/components/Dashboard";
import InvestTest from "@/components/InvestTest";
import UploadHistory from "@/components/UploadHistory";
import { useState } from "react";

export default function Playground() {
	const [isSubmitted, setIsSubmitted] = useState(false);
	const handleSubmit = () => setIsSubmitted(true);
	if (isSubmitted) {
		return <Dashboard back={() => setIsSubmitted(false)} />
	}
	return (
		<div className="p-5 space-y-5">
			<div className="space-y-5">
				<h2 className="text-3xl font-bold">1. Update your investment history for analysis</h2>
				<UploadHistory onSubmit={handleSubmit} />
				<h2 className="text-3xl font-bold">2. Testing for analysis</h2>
				<InvestTest onSubmit={handleSubmit} />
			</div>
		</div>
	);
}