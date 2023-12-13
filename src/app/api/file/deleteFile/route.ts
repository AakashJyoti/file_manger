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
  isFolder: string;
  parentFolder?: string | null;
}

const handleDeleteRecursion = async (parentId: string) => {
  const files = await File.find({ parentFolder: parentId });
  if (files.length <= 0) return;
  files.forEach(async (file) => {
    if (file.isFolder) {
      handleDeleteRecursion(file._id);
    }
    await File.findByIdAndDelete(file._id);
  });
};

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("id");

    const isFileExists: IFile | null = await File.findById(_id);

    if (!isFileExists) {
      return NextResponse.json(
        { success: false, message: "File not exists" },
        { status: 400 }
      );
    }

    if (isFileExists.isFolder) {
      handleDeleteRecursion(_id!);
    }
    await File.findByIdAndDelete(_id);

    return NextResponse.json(
      { success: true, message: "Deletion successful" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
