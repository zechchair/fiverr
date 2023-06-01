import Image from "next/image"
import formatDate from "@/variables/formatDate"
export default function (props) {
	const today = new Date()
	return (
		<div className="hidden print:block">
			<div className="px-8 flex justify-between items-center">
				<div>
					<div className="text-2xl">Facture </div>
					<div className="text-sm italic">{formatDate(today)}</div>
				</div>
				<Image src="/logo.svg" width={105} height={65} priority alt="FMBD" />
			</div>
			<div className="px-8">
				<div className=" p-4 ">{props.children}</div>
			</div>
		</div>
	)
}
