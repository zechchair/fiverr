export async function fetcher(url: any, data: any, setPopUp: any = undefined) {
	if (setPopUp) {
		setPopUp({
			typeButton: false,
			loader: true,
			show: true,
		})
	}

	const r = await fetch(window.location.origin + url, {
		method: data ? "POST" : "GET",
		// credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
		// body: JSON.parse(data),
	})
	if (setPopUp) {
		setPopUp({
			typeButton: false,
			loader: false,
			type: "info",
			show: false,
		})
	}

	return r.json()
}


export const formatDate = (date) => {
	const newDate = new Date(date)
  
	return newDate.toLocaleDateString("en-GB")
  }
  
  export const dateValue = (date) => {
	const newDate = new Date(date)
  
	return 	(newDate.getFullYear() +
			  "-" +
			  ("0" + (newDate.getMonth() + 1)).slice(-2) +
			  "-" +
			  ("0" + newDate.getDate()).slice(-2)
		  ).toString()
  }
  export const compareDates = (d1, d2) => {
	let date1 = new Date(d1).getTime();
	let date2 = new Date(d2).getTime();
	const diff = date1 - date2
	return -diff
  };