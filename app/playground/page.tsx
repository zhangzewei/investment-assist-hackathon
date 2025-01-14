'use client';
import Dashboard from "@/components/Dashboard";
import InvestTest from "@/components/InvestTest";
import Loading from "@/components/Loading";
import UploadHistory from "@/components/UploadHistory";
import { useRiskPreferenceStore } from "@/providers/RiskPreferenceProvider";
import { useState } from "react";

export interface AIResponse {
	choices: {
		message: {
			content: string
		}
	}[]
}

export default function Playground() {
	const {
		riskPreference,
		updateRiskPreference
	} = useRiskPreferenceStore((state) => state,);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (value: Object) => {
		setLoading(true);
		try {
			const data = JSON.stringify(value);
			const res: AIResponse = await fetch('/api/chat', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					messages: [{
						role: 'user',
						content: data
					}]
				})
			}).then(res => res.json())
			setIsSubmitted(true);
			updateRiskPreference(res.choices[0].message.content)
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false);
		}
	}

	const handleSubmitFile = async (file: File) => {
		setLoading(true);
		try {
			const formData = new FormData();
			formData.append('file', file);
			const res: AIResponse = await fetch('/api/upload', {
				method: 'POST',
				body: formData
			}).then(res => res.json())
			updateRiskPreference(res.choices[0].message.content)
			setIsSubmitted(true);
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false);
		}
	}

	if (loading) {
		return <div className='h-full flex items-center'><Loading /></div>
	}

	if (isSubmitted) {
		return <Dashboard
			riskPreference={riskPreference}
			back={() => {
				setIsSubmitted(false)
				updateRiskPreference('')
			}}
		/>
	}
	return (
		<div className="p-5 space-y-5">
			<div className="space-y-5">
				<h2 className="text-3xl font-bold">1. Update your investment history for analysis</h2>
				<UploadHistory onSubmit={handleSubmitFile} />
				<h2 className="text-3xl font-bold">2. Testing for analysis</h2>
				<InvestTest onSubmit={handleSubmit} />
			</div>
		</div>
	);
}