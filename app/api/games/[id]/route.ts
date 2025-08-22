import {NextResponse} from "next/server";


export async function GET(req: Request, {params}: {params:{id: string}}) {
	const {id} = params;

	const RAILWAY_API = process.env.RAILWAY_API_URL;
	const RAWG_API_KEY = process.env.RAWG_API_KEY;
	const backupURL = process.env.BACKUP_URL;

	try {
		const railwayRes = await fetch(`${RAILWAY_API}?page=${id}`, {
			cache: "no-store",
		});

		if(railwayRes.ok) {
			const data = await railwayRes.json();
			return NextResponse.json(data);
		}
	}catch (err) {
		// console.error("Railway backend failed:", err);
		console.error("Railway backend failed:");
	}

	try {
		const rawgRes = await fetch(
			`${backupURL}/${id}?key=${RAWG_API_KEY}`,
			{ cache: "no-store" }
		);

		if (rawgRes.ok) {
			const data = await rawgRes.json();
			console.log("GET FETCH id good, data below:");
			// console.log(data);
			return NextResponse.json(data);
		}
		
	} catch (err) {
		console.error("RAWG API failed:", err);
	}

	return NextResponse.json(
		{error: "Unable to fetch game details"},
		{status:500}
	);

}
