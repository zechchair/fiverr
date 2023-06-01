import { useState, useEffect } from "react"

export default function AttachementsMail(props) {
	let fileTypes = { pdf: "application/pdf" }
	let [statusEnvoi, setStatusEnvoi] = useState("")



	function delete_attachment(path) {
		props?.setAttachments(props?.attachments.filter(attachment => attachment.path != path))
	}

	function find_attachment(path) {
		if (props?.attachments.filter(attachment => attachment.path == path).length > 0) {
			return true
		}
		return false
	}

	function add_attachment(event) {
		let file = event.target.files[0]
		let reader = new FileReader()
		let base64 = "" as any
		reader.readAsDataURL(file)
		reader.onload = function () {
			base64 = reader.result
			if (!find_attachment(base64)) {
				if (props.fileType) {
					if (base64.includes(fileTypes[props.fileType])) {
						setStatusEnvoi("")
						props?.setAttachments([...props?.attachments, { filename: file.name, path: base64 }])
					} else {
						// file is not of desired filetype
						setStatusEnvoi(`Seul les fichiers ${props.fileType} sont acceptés.`)
					}
				} else {
					setStatusEnvoi("")
					props?.setAttachments([...props?.attachments, { filename: file.name, path: base64 }])
				}
			} else {
				// file already exists
				setStatusEnvoi("Le fichier est déjà prêt à être envoyé.")
			}
		}
	}

	return (
		<div className="w-full flex flex-col items-center bg-gray-100 rounded-lg p-3">
			{/* {statusEnvoi} <br /> */}
			{/* <input type={"file"} onChange={event => add_attachment(event)} /> */}
			<label
				className={
					" bg-blue-500 inline-flex items-center my-auto  hover:bg-blue-600 text-white p-1.5 md:p-2 rounded-md"
				}
			>
				<input
					type={"file"}
					style={{ display: "none" }}
					onChange={event => add_attachment(event)}
				/>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-4 w-4 mr-2"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
					/>
				</svg>

				<span className="text-xs md:text-sm lg:text-base">Ajouter un fichier</span>
			</label>
			{props?.attachments.length ? <div className="flex flex-wrap w-full gap-3 mt-3 py-3 text-2xs md:text-xs lg:text-sm bg-white px-2 rounded-lg">
				{props?.attachments?.map((attachment, index) =>
				{
					return (
						<div key={index} className="relative flex-shrink ">
							<div className="bg-purple-500 text-white rounded-md px-4  py-0.5">
								{attachment.filename}
							</div>
							<button
								type={"button"}
								onClick={() => delete_attachment(attachment.path)}
								className="absolute -top-2 -right-2 bg-white rounded-full"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="h-4 w-4 text-red-600"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
						</div>
					)
				})}
			</div> : null}
		</div>
	)
}
