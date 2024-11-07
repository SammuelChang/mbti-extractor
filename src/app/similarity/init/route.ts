import { NextResponse } from "next/server";
import { initExtractor } from "../extract";

export async function GET() {
  try {
    const initResult = await initExtractor();
    return NextResponse.json(initResult);
  } catch (error) {
    const errorMessage = (error as Error).message;
    return NextResponse.json(
      { error: "Failed to load model", details: errorMessage },
      { status: 500 }
    );
  }
}
