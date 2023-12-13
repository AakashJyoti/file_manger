// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { NextRequest, NextResponse } from "next/server";
import File from "@/models/file.model";
import { connect } from "@/db/dbConfig";
import { Document } from "mongoose";

connect();

interface IFile extends Document {
  fileName: string;
  isFolder: boolean;
  parentFolder?: string | null;
}

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { fileName, _id } = reqBody;
    const isFileExists: IFile[] = await File.find({ _id });

    if (!isFileExists.length) {
      return NextResponse.json(
        { success: false, message: "File not exists" },
        { status: 400 }
      );
    }

    isFileExists[0].fileName = fileName;

    const savedFile = await isFileExists[0].save();

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
