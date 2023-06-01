export default function toDateString(date: any) {
	const mydate = new Date(date)
	return (
		mydate.getFullYear() +
		"-" +
		("0" + (mydate.getMonth() + 1)).slice(-2) +
		"-" +
		("0" + mydate.getDate()).slice(-2)
	).toString()
}
