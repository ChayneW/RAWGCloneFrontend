import {NextResponse} from "next/server";


export async function GET(request: Request) {
	console.log("tapping into route.ts:");
	
	const {searchParams} = new URL(request.url);
	const page = searchParams.get("page") || "1";

	const RAILWAY_API = process.env.RAILWAY_API_URL;
	const RAWG_API_KEY = process.env.RAWG_API_KEY;
	const backupURL = process.env.BACKUP_URL;

	let data;
	// let games: any[] = [];


	try {
		const railwayRes = await fetch(`${RAILWAY_API}?page=${page}`, {
			cache: "no-store",
		});


		if(!railwayRes.ok) throw new Error("Railway not responding");


		data = await railwayRes.json();
		if(data) console.log("railway endpoint /GET success");

		// games = data;

	} catch (err) {
		// console.warn("railway failed, falling back to secondary:", err);
		console.warn("railway failed, falling back to secondary:");

		const rawgRes = await fetch(
			`${backupURL}?key=${RAWG_API_KEY}&page=${page}&page_size=50`
		);

		if(!rawgRes.ok) {
			return NextResponse.json(
				{error: "Both Railway and Backup failed."},
				{status: 500});
		}

		data = await rawgRes.json();
		if(data) console.log("RAWG backup GET/ success");

		// games = data.results;
	}

	return NextResponse.json(data);
	// return NextResponse.json({results : games});

}