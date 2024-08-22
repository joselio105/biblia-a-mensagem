"use server";
import { Readable } from "stream";
import { ReportFormSchema } from "@/lib/types";
import { initializeGoogleApis } from "@/lib/google";

function formDataToObject<T>(formData: FormData): T {
  const object: any = {};
  formData.forEach((value, key) => {
    if (value instanceof File) {
      object[key] = value;
    } else {
      object[key] = value;
    }
  });
  return object as T;
}

export async function submitReportDialogData(formData: FormData) {
  try {
    const data = formDataToObject<typeof ReportFormSchema._type>(formData);
    let screenshotUrl = "";
    const validatedData = ReportFormSchema.parse(data);

    const { sheets, drive } = await initializeGoogleApis();

    if (validatedData.screenshot) {
      const driveResponse = await drive.files.create({
        requestBody: {
          name: `file.name-${Date.now()}`,
          parents: ["1e4r-RLtk9Guc-wUsN5Jo8NO72gEnvnKa"],
          mimeType: "image/jpeg",
        },
        media: {
          mimeType: "image/jpeg",
          body: Readable.from(
            Buffer.from(await validatedData.screenshot.arrayBuffer())
          ),
        },
        fields: "id",
      });

      const fileId = driveResponse.data.id;
      screenshotUrl = `https://drive.google.com/file/d/${fileId}/view`;
    }

    const sheetsResponse = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A1:B8",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            validatedData.category,
            validatedData.description,
            validatedData.url,
            validatedData.book,
            validatedData.chapter,
            validatedData.verse,
            validatedData.email,
            screenshotUrl,
          ],
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
}
