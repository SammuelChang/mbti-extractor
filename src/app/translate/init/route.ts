import { NextResponse } from "next/server";
import { initTranslator } from "../translator";

export async function GET() {
  try {
    const initResult = await initTranslator();
    return NextResponse.json(initResult);
  } catch (error) {
    const errorMessage = (error as Error).message;
    return NextResponse.json(
      { error: "Failed to load model", details: errorMessage },
      { status: 500 }
    );
  }
}
