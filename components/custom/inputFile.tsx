export default function InputFile(Props) {
	const uploadToClientPdf = async (event: any) => {
		if (event.target.files && event.target.files[0]) {
			const i = event.target.files[0]
			Props.setUploadedPdf(i)
		}
	}
	return (
		<div
			className={
				!Props.hide
					? "w-full h-full shadow bg-gray-50 flex flex-col justify-center items-center rounded"
					: null
			}
		>
			{!Props.hide ? (
				<>
					<div className="relative mt-6 flex items-center justify-center h-14 w-14">
						{!Props.uploadedPdf ? (
							<>
								<div className="absolute border border-gray-300 rounded-full h-14 w-14 top-0 left-0 animate-ping">
									<span></span>
								</div>
								<div className="border-2 p-5 border-gray-300 rounded-full">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 text-blue-700"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
										/>
									</svg>
								</div>
							</>
						) : (
							<div className="border-2 p-5 border-gray-300 rounded-full">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-6 w-6 text-green-700"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
							</div>
						)}
					</div>
					<div className="px-2">
						<div className="text-xs text-center mb-1 mt-4">
							{Props.uploadedPdf ? (
								Props.uploadedPdf.name
							) : Props.pdf ? (
								<div
									onClick={() => {
										window.open(process.env.NEXT_PUBLIC_SERVER + Props.pdf)
									}}
								>
									Déjà téléchargé
								</div>
							) : (
								<div>Aucun fichier</div>
							)}
						</div>
					</div>
				</>
			) : null}
			<label
				className={
					!Props.hide
						? "mb-4 bg-blue-500 inline-flex items-center uppercase hover:bg-blue-600 text-white py-1 px-2 rounded-full"
						: null
				}
			>
				<input
					type="file"
					style={{ display: "none" }}
					accept="application/pdf"
					onChange={uploadToClientPdf}
				/>
				{!Props.hide ? (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4 mr-2"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fillRule="evenodd"
							d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					</svg>
				) : null}
				<span className="text-sm">{Props.children}</span>
			</label>
		</div>
	)
}
