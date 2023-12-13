// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextRequest, NextResponse } from "next/server";
import File from "@/models/file.model";
import { connect } from "@/db/dbConfig";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { fileName, isFolder, parentFolder } = reqBody;
    const isFileExists = await File.find({
      fileName,
      isFolder,
      parentFolder,
    });

    if (isFileExists.length > 0) {
      return NextResponse.json(
        { success: false, message: "File already exists" },
        { status: 400 }
      );
    }

    const newFile = new File({
      fileName,
      isFolder,
      parentFolder,
    });
    const savedFile = await newFile.save();

    return NextResponse.json(
      { success: true, data: savedFile },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
