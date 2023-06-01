export default function DashInfo(props) {
	return (
		<div className="bg-gray-100 flex items-center justify-center  font-sans overflow-hidden">
			<div className="w-full">
				<div className="bg-white shadow-md rounded overflow-x-auto">
					{props?.data?.id ? (
						<table className="w-full table-auto">
							<tbody className="text-gray-600 text-sm font-light">
								{props.target.map((elem, index) => (
									<tr key={index} className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100">
										<td className="capitalize py-3 px-2 text-left">
											<div className="flex items-center">
												<span className="font-medium">{props.label[index]}</span>
											</div>
										</td>
										<td className="py-3 px-2 ">
											<div className="flex items-center float-right">
												<span>
													{props.data[elem] != null ? (
														props.label[index].indexOf("date") !== -1 ? (
															props.data[elem].substr(0, 10).split("-").reverse().join("-")
														) : props.data[elem] == true ? (
															<span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-green-100 bg-green-600 rounded">
																Oui
															</span>
														) : props.data[elem] == false ? (
															<span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-500 rounded">
																Non
															</span>
														) : (
															props.data[elem]
														)
													) : (
														"---"
													)}
												</span>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<div className="w-full text-sm flex justify-center rounded p-1 bg-blue-50">
							pas de données
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
