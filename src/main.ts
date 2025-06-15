import dotenv from "dotenv";
import { web } from "./application/web";

dotenv.config();

web.listen(3000, () => {
  console.log(
    "Listening on port 3000\nSwagger at http://localhost:3000/api-docs"
  );
});
