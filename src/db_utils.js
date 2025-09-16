import { database } from "@/firebase.js";
import { ref, set } from "firebase/database";

export const writecolorSchemeData = (userId, colorSchemeObj) => {
  set(ref(database, `color-schemes/${userId}`), colorSchemeObj);
}