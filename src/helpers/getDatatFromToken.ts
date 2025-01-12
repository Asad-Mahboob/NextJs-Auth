import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Define the expected structure of the decoded token
interface DecodedToken {
  id: string;
  // Add other fields that you expect from the token if needed
}

export const getDataFromToken = (request: NextRequest): string => {
  try {
    const token = request.cookies.get("token")?.value || "";
    // Type the decodedToken based on the structure defined above
    const decodedToken: DecodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as DecodedToken;
    return decodedToken.id;
  } catch (error: unknown) {
    // Handle error properly with the type `unknown`
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};
