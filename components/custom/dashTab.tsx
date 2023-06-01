export default function DashTab(props) {
	return (
		<div className="w-full h-full mx-auto shadow bg-white rounded hover:shadow-lg overflow-y-auto">
			<div className="flex justify-between md:pt-8 pt-4 md:px-8 px-4">
				<div className="font-semibold text-gray-800 ">{props.title}</div>
				<div>{props.children}</div>
			</div>

			<div className="p-3">
				<div className="overflow-x-auto">
					{props?.data?.length ? (
						<table className="table-auto w-full">
							<thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
								<tr>
									{props?.label.slice(0, props.label.length - 1).map((elem, id) => (
										<th key={id} className="p-2 whitespace-nowrap">
											<div className="font-semibold text-left">{elem}</div>
										</th>
									))}
									{props?.label[props.label.length - 1] == "attachment" ? (
										<th className="p-2 whitespace-nowrap">
											<div className="font-semibold text-left invisible">walo</div>
										</th>
									) : (
										<th className="p-2 whitespace-nowrap">
											<div className="font-semibold text-left">
												{props?.label[props.label.length - 1]}
											</div>
										</th>
									)}
								</tr>
							</thead>
							<tbody className="text-sm divide-y divide-gray-100 w-full">
								{props?.data?.map((elem, index) => (
									<tr key={index}>
										<td className="p-2 whitespace-nowrap">
											<div className="flex items-center">
												<div className="text-green-600 font-medium font-mono">
													{elem[props?.target[0]].substr(0, 10)}
												</div>
											</div>
										</td>
										{props?.target.slice(1, props?.target?.length - 1).map((e, i) => (
											<td key={i} className="p-2 whitespace-nowrap">
												<div className="flex items-center">
													<div className="text-gray-800">{elem[e]}</div>
												</div>
											</td>
										))}
										<td className="p-2 text-right">
											{props?.label[props?.label?.length - 1][0] == "attachment" &&
											elem[props?.target[props?.target?.length - 1]] ? (
												<button
													type="button"
													className="bg-gray-100 p-1 rounded hover:shadow"
													onClick={() => {
														if (props?.label[props?.label?.length - 1][1] == "list") {
															for (let i of elem[props.target[props.target.length - 1]]) {
																window.open(process.env.NEXT_PUBLIC_SERVER + i.link)
															}
														} else {
															window.open(
																process.env.NEXT_PUBLIC_SERVER +
																	elem[props?.target[props.target.length - 1]],
															)
														}
													}}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5 text-gray-500"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path
															fillRule="evenodd"
															d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
															clipRule="evenodd"
														/>
													</svg>
												</button>
											) : (
												<td className="p-2 whitespace-nowrap">
													<div className="flex items-center">
														<div className="text-gray-800">
															{elem[props?.target[props.target.length - 1]]}
														</div>
													</div>
												</td>
											)}
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
