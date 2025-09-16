import { database } from "@/firebase.js";
import { ref, set } from "firebase/database";

export const saveColorScheme = (userId, colorSchemeObj) => {
  set(ref(database, `color-schemes/${userId}`), colorSchemeObj);
}