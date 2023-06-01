import { useState } from "react"
import "react-html5-camera-photo/build/css/index.css"
import { jsPDF } from "jspdf"
import Modal from "./modal"

export default function CamBin(props) {
	const [cameraState, setCameraState] = useState(false)
	const [images, setImages] = useState([])

	function handleTakePhoto(dataUri) {
		// Do stuff with the photo...
		setImages([...images, { path: dataUri }])
	}

	function delete_image(path) {
		setImages(images.filter(image => image.path != path))
	}

	function save_pdf() {
		const doc = new jsPDF()
		images.forEach((image, index) => {
			const imgProps = doc.getImageProperties(image.path)
			const width = doc.internal.pageSize.getWidth() - 20
			const height = (imgProps.height * (doc.internal.pageSize.getWidth() - 20)) / imgProps.width
			doc.addImage(image.path, "JPEG", 10, 10, width, height)
			if (index < images.length - 1) doc.addPage()
		})

		props.setUploadedPdf(
			new File([doc.output("blob")], props.name + ".pdf", {
				type: "application/pdf",
			}),
		)
	}
	return (
		<>
			<Modal
				show={cameraState}
				size="sm"
				onClose={() => {
					setCameraState(false)
				}}
			>
				<div className="px-4 pt-4">
					<div className="grid grid-flow-col bg-gray-100 rounded shadow-inner overflow-x-auto p-2 space-x-1">
						{images.map((image, index) => (
							<div key={index} className="relative h-24 w-24">
								<img className="rounded hover:shadow" src={image.path} />
								<button
									type="button"
									className="absolute top-2 left-2 bg-red-500 bg-opacity-70 hover:bg-red-600 text-white p-0.5 text-sm rounded-full"
									onClick={() => delete_image(image.path)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-3 w-3"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<path
											fillRule="evenodd"
											d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
											clipRule="evenodd"
										/>
									</svg>
								</button>
							</div>
						))}
					</div>
				</div>
				<div className="p-4 flex  gap-5 justify-between text-sm text-white">
					{/* add image to list of images for the pdf  */}
					<label>
						<input
							style={{ display: "none" }}
							type="file"
							accept="image/*"
							capture="environment"
							onChange={event => {
								handleTakePhoto(URL.createObjectURL(event.target.files[0]))
							}}
						/>
						<span className="cursor-pointer  bg-gradient-to-r from-blue-400 to-blue-500 rounded-full text-center py-1 px-3 align-middle">
							Ajouter
						</span>
					</label>
					{/* add image to list of images for the pdf  */}

					{/* Save the chosen images as pdf  */}
					<button
						type="button"
						onClick={() => {
							setCameraState(false)
							save_pdf()
						}}
					>
						<span className="cursor-pointer bg-gradient-to-r from-purple-400 to-purple-500  rounded-full text-center py-1 px-3 align-middle">
							Enregistrer
						</span>
					</button>
					{/* Save the chosen images as pdf  */}
				</div>
			</Modal>
			<div className="row-start-2 col-span-2 text-center p-2 ">
				<button
					type="button"
					className="text-blue-600 animate-pulse"
					onClick={() => {
						setCameraState(true)
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-10 w-10"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
				</button>
				<div className="text-xs text-center my-1">
					{props.uploadedPdf ? (
						props.uploadedPdf.name
					) : props.loaded ? (
						<div
							onClick={() => {
								window.open(process.env.NEXT_PUBLIC_SERVER + props.loaded)
							}}
						>
							Déjà téléchargé
						</div>
					) : (
						<div>Aucun fichier</div>
					)}
				</div>
				{images?.length ? (
					<div className="grid grid-flow-col bg-gray-100 rounded shadow-inner mt-3 p-3 space-x-2 overflow-x-auto">
						{images.map((image, index) => (
							<div className="h-24 w-24 ">
								<img src={image.path} className="rounded hover:shadow" key={index} />
							</div>
						))}
					</div>
				) : null}
			</div>
		</>
	)
}
